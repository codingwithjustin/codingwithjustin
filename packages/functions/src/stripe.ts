import * as functions from 'firebase-functions'
import { UserRecord } from 'firebase-functions/lib/providers/auth'

import Stripe from 'stripe'
import * as Firestore from './firestore'

export const stripeLiveSecret = functions.config().stripe.live.secret
export const stripeLiveMembershipProductId =
  functions.config().stripe.live.membership.product

export const stripeTestSecret = functions.config().stripe.test.secret
export const stripeTestMembershipProductId =
  functions.config().stripe.test.membership.product

export const stripeWebhookSecret = functions.config().stripe.test.webhook

export const stripe = new Stripe(stripeTestSecret, { apiVersion: '2020-08-27' })

export const createCustomer = async (user: UserRecord) => {
  const { uid, email } = user
  const customer = await stripe.customers.create(
    {
      email,
      metadata: { uid }
    },
    { idempotencyKey: uid }
  )
  await Firestore.updateUser(uid, { stripeCustomerId: customer.id })
}

export const getCustomer = (customerId: string) => {
  return stripe.customers.retrieve(customerId)
}

export const getCoupon = (couponId: string) => {
  return stripe.coupons.retrieve(couponId)
}

export const verifyRequest = (request: functions.Request) => {
  const sig = request.headers['stripe-signature']
  if (typeof sig != 'string') throw new Error('Invalid stripe signature.')
  return stripe.webhooks.constructEvent(
    (request as any).rawBody,
    sig,
    stripeWebhookSecret
  )
}

export const getProductPrices = (product: string) => {
  return stripe.prices.list({ product })
}

export const getSubscription = (subId: string) => {
  return stripe.subscriptions.retrieve(subId)
}

export const createSubscription = (params: Stripe.SubscriptionCreateParams) => {
  return stripe.subscriptions.create(params)
}

export const createPaymentIntent = (
  params: Stripe.PaymentIntentCreateParams
) => {
  return stripe.paymentIntents.create(params)
}

export const createPriceInvoice = async (
  customer: string,
  price: string,
  coupon?: string
) => {
  await stripe.invoiceItems.create({ customer, price })
  const invoice = await stripe.invoices.create({
    customer,
    auto_advance: true,
    coupon
  })
  const paidInvoice = await stripe.invoices.pay(invoice.id, {
    expand: ['payment_intent']
  })
  return paidInvoice
}

export const isMembershipProductId = (productId: string) => {
  return (
    productId === stripeTestMembershipProductId ||
    productId === stripeLiveMembershipProductId
  )
}

// export const cancelSubscription = (subId: string, immediatly) => {
//   return stripe.subscriptions.del(subId)
// }
