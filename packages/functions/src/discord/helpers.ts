import * as functions from 'firebase-functions'
import * as nacl from 'tweetnacl'
import * as Firestore from '../firestore'
import * as admin from 'firebase-admin'

import { discordPublicKey } from './config'

export const verify = (req: functions.https.Request) => {
  const signature = req.get('X-Signature-Ed25519')
  const timestamp = req.get('X-Signature-Timestamp')
  if (signature == null || timestamp == null || discordPublicKey == null)
    return false
  const body = req.rawBody
  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, 'hex'),
    Buffer.from(discordPublicKey, 'hex')
  )
  return isVerified
}

export interface DiscordUser {
  id: string
  username: string
  avatar: string
}

export const linkAccount = async (email: string, discord: DiscordUser) => {
  const user = await Firestore.getUserIdByEmail(email)
  if (user == null)
    throw new Error('Email address is not associated with another account.')
  if (user.discord?.username === discord.username)
    throw new Error('Your account is already linked. Use /unlink to remove it.')
  if (user.discord != null)
    throw new Error(
      'That account already has a discord account associated with it.'
    )
  const { uid } = user
  await Firestore.updateUser(uid, { discord })
}

export const unlinkAccount = async (discordUser: DiscordUser) => {
  const user = await Firestore.getUserByDiscordId(discordUser.id)
  if (user == null) throw new Error('No account has been linked.')
  await Firestore.updateUser(user.uid, {
    discord: admin.firestore.FieldValue.delete() as any
  })
}
