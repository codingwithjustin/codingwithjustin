import * as functions from 'firebase-functions'
import { UserRecord } from 'firebase-functions/lib/providers/auth'

import Stripe from 'stripe'
import * as Firestore from './firestore'

export const stripeLiveSecret = functions.config().stripe.live.secret
export const stripeTestSecret = functions.config().stripe.test.secret
export const stripeEndpointSecret = functions.config().stripe.endpoint
export const stripe = new Stripe(stripeTestSecret, { apiVersion: '2020-08-27' })

export const createCustomer = async (user: UserRecord) => {
  const { uid, email } = user
  const customer = await stripe.customers.create({
    email,
    metadata: { uid }
  })
  await Firestore.updateUser(uid, { stripeCustomerId: customer.id })
}

export const getCustomer = async (uid: string) => {
  const user = await Firestore.getUser(uid)
  const customerId = user?.stripeCustomerId
  if (customerId === null) return undefined
  return stripe.customers.retrieve(customerId)
}

export const getCoupon = (couponId: string) => {
  return stripe.coupons.retrieve(couponId)
}

export const getSubscription = (subId: string) => {
  return stripe.subscriptions.retrieve(subId)
}

export const verifyRequest = (request: functions.Request) => {
  const sig = request.headers['stripe-signature']
  if (typeof sig != 'string') throw new Error('Invalid stripe signature.')
  return stripe.webhooks.constructEvent(request.body, sig, stripeEndpointSecret)
}
