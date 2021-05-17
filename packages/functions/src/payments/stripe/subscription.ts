import * as functions from 'firebase-functions'
import Stripe from 'stripe'
import * as StripeHelper from '../../stripe'
import * as Firestore from '../../firestore'

export const stripeCreateSubscription = functions.https.onCall(async data => {
  const { priceId, customerId, coupon } = data

  if (typeof priceId !== 'string')
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with a price id.'
    )

  if (typeof customerId !== 'string')
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with a customer id.'
    )

  try {
    const subscription = await StripeHelper.createSubscription({
      customer: customerId,
      coupon,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent']
    })
    const invoice = subscription.latest_invoice as Stripe.Invoice
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent
    return {
      subscriptionId: subscription.id,
      clientSecret: paymentIntent.client_secret
    }
  } catch (e) {
    throw new functions.https.HttpsError('unknown', e.message)
  }
})

export const stripeGetUserSubscription = functions.https.onCall(
  async (_, { auth }) => {
    if (auth == null)
      throw new functions.https.HttpsError(
        'unauthenticated',
        'No user is logged in.'
      )
    const { uid } = auth
    const user = await Firestore.getUser(uid)
    const subscriptionId = user.membership?.subscriptionId
    if (subscriptionId == null)
      throw new Error('User does not have a subscription.')
    return StripeHelper.getSubscription(subscriptionId)
  }
)

export const stripeCancelSubscription = functions.https.onCall(
  async (data, { auth }) => {
    const { immediately, cancelAtPeriodEnd = true } = data

    if (auth == null)
      throw new functions.https.HttpsError(
        'unauthenticated',
        'No user is logged in.'
      )

    const user = await Firestore.getUser(auth.uid)
    const subscriptionId = user.membership?.subscriptionId

    if (subscriptionId == null)
      throw new functions.https.HttpsError(
        'invalid-argument',
        'User does not have a subscription.'
      )

    return immediately != null
      ? StripeHelper.cancelSubscriptionImmediately(subscriptionId)
      : StripeHelper.cancelSubscriptionAtPeriodEnd(
          subscriptionId,
          cancelAtPeriodEnd
        )
  }
)
