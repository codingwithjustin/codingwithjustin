/* eslint-disable camelcase */
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const adminUsers = ['jsbroks@gmail.com']

export const userCustomClaims = functions.https.onCall(async (_, context) => {
  if (context.auth == null) return { refetch: false }
  const { uid } = context.auth
  const { email, admin: isAdmin, email_verified } = context.auth.token

  if (isAdmin) return { refetch: false }
  if (email == null || !email_verified) return { refetch: false }

  const isAdminEmail = adminUsers.includes(email)
  if (!isAdminEmail) return { refetch: false }

  await admin.auth().setCustomUserClaims(uid, { admin: true })
  return { refetch: true }
})
