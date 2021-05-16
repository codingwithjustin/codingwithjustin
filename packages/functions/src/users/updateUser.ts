import { User } from '@shared/firestore'
import * as functions from 'firebase-functions'

export const userNewSetup = functions.firestore
  .document('users/{userId}')
  .onUpdate(async change => {
    const before = change.before.data() as User
    const after = change.after.data() as User

    const changedDiscordAccount = before.discord?.id === after.discord?.id
    const changedMembership =
      before.membership?.status === after.membership?.status

    functions.logger.info(changedDiscordAccount, changedMembership)
  })
