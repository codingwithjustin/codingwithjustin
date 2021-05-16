import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import Stripe from 'stripe'
import * as StripeHelper from '../../stripe'
import * as Firestore from '../../firestore'

const eventHandler: Record<string, (e: Stripe.Event) => Promise<void>> = {
  'invoice.paid': async event => {
    const invoice = event.data.object as Stripe.Invoice
    const subscriptionId = invoice.subscription as string | undefined
    const customerId = invoice.customer as string

    const customer = (await StripeHelper.getCustomer(
      customerId
    )) as Stripe.Customer
    const { uid } = customer?.metadata

    if (uid == null || uid.length === 0) {
      const message = 'Invoice paid with a customer user ID.'
      functions.logger.error(message, customer)
      throw new Error(message)
    }

    const isMembershipInvoice = invoice.lines.data.find(l =>
      StripeHelper.isMembershipProductId((l.price?.product as string) ?? '')
    )
    if (isMembershipInvoice != null) {
      if (subscriptionId != null) {
        const { id, status } = await StripeHelper.getSubscription(
          subscriptionId
        )
        Firestore.setUserMembershipSubscription(uid, id, status)
      } else {
        Firestore.setUserMembershipLifetime(uid)
      }
    }
  },
  'customer.subscription.deleted': async event => {
    const subscription = event.data.object as Stripe.Subscription
    const customerId = subscription.customer as string
    const customer = (await StripeHelper.getCustomer(
      customerId
    )) as Stripe.Customer
    const { uid } = customer?.metadata

    if (uid == null || uid.length === 0) {
      const message = 'Subscription deleted for a non firebase user.'
      functions.logger.error(message, customer)
      throw new Error(message)
    }

    const isMembershipSubscription = subscription.items.data.find(l =>
      StripeHelper.isMembershipProductId((l.price?.product as string) ?? '')
    )
    if (isMembershipSubscription != null) {
      Firestore.updateUser(uid, {
        membership: admin.firestore.FieldValue.delete() as any
      })
    }
  }
}

export const stripeWebhook = functions.https.onRequest(
  async (request, response) => {
    let event: Stripe.Event
    try {
      event = StripeHelper.verifyRequest(request)
    } catch (e) {
      functions.logger.error(e)
      response.status(400).send(`Webhook Error: ${e.message}`)
      return
    }

    functions.logger.log(`New stripe event ${event.type}`)
    if (event.type in eventHandler) {
      try {
        await eventHandler[event.type](event)
      } catch (ex) {
        functions.logger.error(ex.message)
        response.status(400).send({ message: ex.message })
        return
      }
    }

    response.send({ received: true })
  }
)
