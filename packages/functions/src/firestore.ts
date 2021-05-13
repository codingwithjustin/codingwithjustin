import * as admin from 'firebase-admin'
import { UserRecord } from 'firebase-functions/lib/providers/auth'
import { User } from '@shared/firestore'

export const db = admin.firestore()

export const createUser = async (user: UserRecord) => {
  const { uid, displayName, email, photoURL } = user
  if (email == null) return
  const ref = db.collection('users').doc(uid)
  const dbUser: User = {
    uid,
    displayName,
    photoURL,
    email,
    joinedAt: new Date()
  }
  await ref.set(dbUser, { merge: true })
}

export const updateUser = (uid: string, data: Partial<User>) =>
  db.collection('users').doc(uid).set(data, { merge: true })

export const getUser = (uid: string) =>
  db
    .collection('users')
    .doc(uid)
    .get()
    .then(doc => doc.data() as User)

export const getUserIdByEmail = async (email: string) => {
  return db
    .collection('users')
    .where('email', '==', email)
    .limit(1)
    .get()
    .then(d => d.docs?.[0].data() as User)
}

export const getUserByDiscordId = async (discordId: string) => {
  return db
    .collection('users')
    .where('discord.id', '==', discordId)
    .limit(1)
    .get()
    .then(d => d.docs?.[0].data() as User)
}
