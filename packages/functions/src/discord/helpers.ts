import * as functions from 'firebase-functions'
import * as nacl from 'tweetnacl'
import * as Firestore from '../firestore'
import * as admin from 'firebase-admin'

import * as Discord from 'discord.js'

import { discordPublicKey } from './config'
import { User } from '@shared/firestore'

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

let _client: Discord.Client

export const getClient = (): Promise<Discord.Client> => {
  if (_client == null) _client = new Discord.Client()
  return new Promise(resolve => _client.on('ready', () => resolve(_client)))
}

const guidId = '841545159821099008'
const roleId = '841554434772303872'

export const giveMembershipRole = async (
  user: User,
  reason: string = 'Membership purchased'
) => {
  if (user.discord?.id == null) return
  const client = await getClient()
  const guild = await client.guilds.fetch(guidId)
  const member = await guild.members.fetch(user.discord.id)
  await member.roles.add(roleId, reason)
}

export const removeMembershipRole = async (
  user: User,
  reason: string = 'Membership revoked'
) => {
  if (user.discord?.id == null) return
  const client = await getClient()
  const guild = await client.guilds.fetch(guidId)
  const member = await guild.members.fetch(user.discord.id)
  await member.roles.remove(roleId, reason)
}

export const updateUserRole = async (user: User) => {
  return user.membership != null
    ? giveMembershipRole(user)
    : removeMembershipRole(user)
}

export const updateUserRoleChange = async (before: User, after: User) => {
  const give = giveMembershipRole
  const remove = removeMembershipRole
  const purchasedMembership =
    before.membership == null && after.membership != null
  const removedMembership =
    before.membership != null && after.membership == null
  const hasMembershipChanged = removedMembership || purchasedMembership
  const hasMembershipAfter = after.membership != null

  const addedDiscord = before.discord == null && after.discord != null
  const removedDiscord = before.discord != null && after.discord == null
  const changedDiscord =
    before.discord?.id != null && before.discord?.id !== after.discord?.id
  const hasDiscordChanged = addedDiscord || removedDiscord || changedDiscord

  if (!hasMembershipChanged && !hasDiscordChanged) return

  if (purchasedMembership) return give(after)
  if (removedMembership) return remove(before)

  // if (purchasedMembership && changedDiscord) return give(after)
  // if (purchasedMembership && addedDiscord) return give(after)
  // if (purchasedMembership && removedDiscord) return
  // if (purchasedMembership && !hasDiscordChanged) return give(after)

  // if (removedMembership && changedDiscord) return remove(before)
  // if (removedMembership && addedDiscord) return remove(before)
  // if (removedMembership && removedDiscord) return remove(before)
  // if (removedMembership && !hasDiscordChanged) return remove(before)

  if (hasMembershipAfter && addedDiscord) return give(after)
  if (hasMembershipAfter && removedDiscord) return remove(after)
  if (hasMembershipAfter && hasDiscordChanged)
    return Promise.all([remove(before), give(after)])
}
