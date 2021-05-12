import * as admin from 'firebase-admin'
import { UserRecord } from 'firebase-functions/lib/providers/auth'

export const db = admin.firestore()

export const createUser = async (user: UserRecord) => {
  const { uid, displayName, email, photoURL } = user
  if (email == null) return
  const ref = db.collection('users').doc(uid)
  await ref.set(
    {
      uid,
      displayName,
      photoURL,
      email,
      discord: {},
      joined: Date.now()
    },
    { merge: true }
  )
}

export const updateUser = (uid: string, data: Object) =>
  db.collection('users').doc(uid).set(data, { merge: true })

export const getUser = (uid: string) =>
  db
    .collection('users')
    .doc(uid)
    .get()
    .then(doc => doc.data())

export const getUserIdByEmail = async (email: string) => {
  return db
    .collection('users')
    .where('email', '==', email)
    .limit(1)
    .get()
    .then(d => d.docs?.[0].data())
    .catch(() => undefined)
}

export const getUserByDiscordId = async (discordId: string) => {
  return db
    .collection('users')
    .where('discord.id', '==', discordId)
    .limit(1)
    .get()
    .then(d => d.docs?.[0].data())
    .catch(() => undefined)
}
