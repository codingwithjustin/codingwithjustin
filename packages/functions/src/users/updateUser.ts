import { User } from '@shared/firestore'
import * as functions from 'firebase-functions'

export const userNewSetup = functions.firestore
  .document('users/{userId}')
  .onUpdate(async change => {
    const before = change.before.data() as User
    const after = change.after.data() as User

    const hasMembership = after.membership != null
    const wasMembership = before.membership != null && !hasMembership

    const changedDiscordAccount = before.discord?.id === after.discord?.id
    // if (changedDiscordAccount) {
    // }
    const changedMembership =
      before.membership?.status === after.membership?.status

    functions.logger.info(changedDiscordAccount, changedMembership)
  })
