import * as functions from 'firebase-functions'

import * as Stripe from '../../stripe'

export const stripeWebhook = functions.https.onRequest((request, response) => {
  let event
  try {
    event = Stripe.verifyRequest(request)
  } catch (e) {
    functions.logger.error(e)
    response.status(400).send(`Webhook Error: ${e.message}`)
    return
  }

  functions.logger.log(event.type)

  response.send({ received: true })
})
