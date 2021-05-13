import * as functions from 'firebase-functions'
import * as Firestore from '../firestore'
import * as Stripe from '../stripe'

export const userNewSetup = functions.auth.user().onCreate(async user => {
  const { email } = user
  if (email == null) return
  await Firestore.createUser(user)
  await Stripe.createCustomer(user)
})
