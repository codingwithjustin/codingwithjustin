import * as functions from 'firebase-functions'

import * as Stripe from '../../stripe'

export const stripeProductPrices = functions.https.onCall(async data => {
  const { product } = data
  if (typeof product !== 'string') {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with a product id.'
    )
  }
  try {
    const prices = await Stripe.getProductPrices(product)
    return { prices }
  } catch (e) {
    throw new functions.https.HttpsError('unknown', e.message)
  }
})
