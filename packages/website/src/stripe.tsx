import React from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { getFunctions, httpsCallable } from 'firebase/functions'

const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (STRIPE_KEY == null) return null
  if (stripePromise == null) stripePromise = loadStripe(STRIPE_KEY)
  return stripePromise
}

export const StripeProvider: React.FC = ({ children }) => {
  return <Elements stripe={getStripe()}>{children}</Elements>
}

type PriceResponse = {
  id: string
  currency: string
  type: 'recurring' | 'one_time'
  recurring?: { interval: 'month' | 'year' }
  // eslint-disable-next-line camelcase
  unit_amount: number
}

const getProductPrices = httpsCallable<
  { product: string },
  { prices: PriceResponse[] }
>(getFunctions(), 'stripeProductPrices')

let cachedPrices: any = null
export const getMembershipPrices = async () => {
  if (cachedPrices == null)
    cachedPrices = await getProductPrices({ product: 'prod_JUEdNpS41zRTQO' })
  const prices = cachedPrices.data.prices
  const currencies = groupBy(prices?.data ?? [], (i: any) => i.currency)
  const monthly = prices?.find(
    s => s.type === 'recurring' && s.recurring.interval === 'month'
  )
  const yearly = prices?.find(
    s => s.type === 'recurring' && s.recurring.interval === 'year'
  )
  const lifetime = prices?.find(s => s.type === 'one_time')
  return { prices }
}
