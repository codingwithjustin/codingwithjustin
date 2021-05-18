import { User } from '@shared/firestore'
import * as functions from 'firebase-functions'
import { updateUserRoleChange } from '../discord/helpers'

export const userUpdate = functions.firestore
  .document('users/{userId}')
  .onUpdate(async change => {
    const before = change.before.data() as User
    const after = change.after.data() as User

    await updateUserRoleChange(before, after)
  })
