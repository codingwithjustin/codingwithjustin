import * as functions from 'firebase-functions'
import * as StripeHelper from '../../stripe'

export const stripeGetCoupon = functions.https.onCall(async data => {
  const { code } = data

  if (typeof code !== 'string') {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with a coupon code.'
    )
  }

  return StripeHelper.getPromotionCode(code)
})
