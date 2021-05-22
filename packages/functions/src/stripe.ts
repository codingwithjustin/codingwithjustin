import * as functions from 'firebase-functions'
import { UserRecord } from 'firebase-functions/lib/providers/auth'

import Stripe from 'stripe'
import * as Firestore from './firestore'

const config = functions.config()

export const stripeSecret = config.stripe.secret
export const stripeMembershipProductId = config.stripe.membership.product
export const stripeWebhookSecret = config.stripe.webhook

export const stripe = new Stripe(stripeSecret, { apiVersion: '2020-08-27' })

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
  return stripe.prices.list({ product, limit: 100 })
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
  couponId?: string
) => {
  await stripe.invoiceItems.create({ customer, price })

  const invoice = await stripe.invoices.create({
    customer,
    auto_advance: false,
    discounts: couponId ? [{ coupon: couponId }] : []
  })

  const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id, {
    expand: ['payment_intent']
  })

  return finalizedInvoice
}

export const isMembershipProductId = (productId: string) => {
  return productId === stripeMembershipProductId
}

export const cancelSubscriptionImmediately = (subId: string) => {
  return stripe.subscriptions.del(subId)
}

export const cancelSubscriptionAtPeriodEnd = (
  subId: string,
  cancelAtPeriodEnd: boolean
) => {
  return stripe.subscriptions.update(subId, {
    cancel_at_period_end: cancelAtPeriodEnd
  })
}

export const getPromotionCode = (couponId: string) => {
  return stripe.promotionCodes.retrieve(couponId)
}
