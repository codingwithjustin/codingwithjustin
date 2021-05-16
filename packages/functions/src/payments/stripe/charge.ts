import * as functions from 'firebase-functions'
import Stripe from 'stripe'
import * as StripeHelper from '../../stripe'

export const stripeCreatePaymentIntent = functions.https.onCall(async data => {
  const { priceId, customerId } = data

  if (typeof priceId !== 'string') {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with a price id.'
    )
  }

  if (typeof customerId !== 'string') {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with a customer id.'
    )
  }

  try {
    const invoice = await StripeHelper.createPriceInvoice(customerId, priceId)
    const intent = invoice.payment_intent as Stripe.PaymentIntent
    return {
      invoiceId: invoice.id,
      intentId: intent.id,
      clientSecret: intent.client_secret
    }
  } catch (e) {
    throw new functions.https.HttpsError('unknown', e.message)
  }
})
