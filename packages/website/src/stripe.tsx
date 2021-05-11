import React from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (STRIPE_KEY == null) return null
  if (stripePromise == null) stripePromise = loadStripe(STRIPE_KEY)
  return stripePromise
}

export const StripeProvider: React.FC = ({ children }) => {
  return <Elements stripe={getStripe()}>{children}</Elements>
}
