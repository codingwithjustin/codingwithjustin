import React from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import { Price, getProductPrices } from '@/firebase/functions'

const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
const STRIPE_MEMBERSHIP_PRODUCT_ID = 'prod_JUEdNpS41zRTQO'

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (STRIPE_KEY == null) return null
  if (stripePromise == null) stripePromise = loadStripe(STRIPE_KEY)
  return stripePromise
}

export const StripeProvider: React.FC = ({ children }) => {
  return <Elements stripe={getStripe()}>{children}</Elements>
}

export const formatPrice = (price?: Price) => {
  if (!price) return 'N / A'
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency
  })
  return formatter.format(price.unit_amount / 100)
}

export const getMembershipPrices = async () => {
  const result = await getProductPrices({
    product: STRIPE_MEMBERSHIP_PRODUCT_ID
  })
  const prices = result.data.prices.data
  return prices
}
