// import * as functions from 'firebase-functions'
// import * as StripeHelper from '../../stripe'

// export const stripeCancelSubscription = functions.https.onCall(async data => {
//   const { subscriptionId } = data

//   if (typeof subscriptionId !== 'string') {
//     throw new functions.https.HttpsError(
//       'invalid-argument',
//       'The function must be called with a subscription id.'
//     )
//   }

//   try {
//     await StripeHelper.cancelSubscription(subscriptionId)
//     return { canceled: true }
//   } catch (e) {
//     throw new functions.https.HttpsError('unknown', e.message)
//   }
// })
