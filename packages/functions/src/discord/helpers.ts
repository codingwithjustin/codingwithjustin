import * as functions from 'firebase-functions'
import * as nacl from 'tweetnacl'
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

interface DiscordUser {
  id: string
  username: string
  avatar: string
}

export const linkAccount = (_: string, __: DiscordUser) => {}
