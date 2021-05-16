/* eslint-disable camelcase */
import './init'
import { getFunctions, httpsCallable } from 'firebase/functions'

export interface Price {
  id: string
  active: boolean
  product: string
  recurring?: {
    interval: 'year' | 'month'
  }
  type: 'recurring' | 'one_time'
  unit_amount: number
  currency: string
}

export interface PriceResponse {
  prices: {
    data: Price[]
  }
}

export const getProductPrices = httpsCallable<
  { product: string },
  PriceResponse
>(getFunctions(), 'stripeProductPrices')

export const setCustomUserClaims = httpsCallable<unknown, { refetch: boolean }>(
  getFunctions(),
  'userCustomClaims'
)

export const createStripeSubscription = httpsCallable<
  { customerId: string; priceId: string; coupon?: string },
  { subscriptionId: string; clientSecret: string }
>(getFunctions(), 'stripeCreateSubscription')

export interface SubscriptionResponse {
  id: string
  items: {
    data: {
      id: string
      plan: { active: boolean; interval: string }
      price: Price
    }[]
  }
  plan: { active: boolean; interval: string; currency: string; amount: number }
  status: string
  cancel_at_period_end: boolean
  current_period_end: number
  current_period_start: number
  latest_invoice: string
}

export const getUserSubscription = httpsCallable<
  undefined,
  SubscriptionResponse
>(getFunctions(), 'stripeGetUserSubscription')

export const createPaymentIntent = httpsCallable<
  { customerId: string; priceId: string },
  { invoiceId: string; intentId: string; clientSecret: string }
>(getFunctions(), 'stripeCreatePaymentIntent')

export const getCouponCode = httpsCallable<{ code: string }, {}>(
  getFunctions(),
  'stripeGetCoupon'
)
