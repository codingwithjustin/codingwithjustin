import * as functions from 'firebase-functions'

import { linkAccount, unlinkAccount, verify } from './helpers'
import { Interaction } from './interaction'

export const discordCommands = functions.https.onRequest(
  async (request, response) => {
    if (request.method !== 'POST') {
      response.status(405).end()
      return
    }

    if (!verify(request)) {
      response.status(401).send('Invalid request signature')
      return
    }

    // ACK
    if (request.body?.type === 1) {
      response.status(200).send({ type: 1 })
      return
    }

    const interaction = request.body as Interaction
    const privateMessage = (content: string) =>
      response.send({
        type: 4,
        data: { tts: false, content, flags: 64 }
      })

    const { member, data } = interaction
    const { name: command, options } = data

    const user = member?.user
    if (user == null) {
      functions.logger.warn(`No user account associated with request.`)
      privateMessage('Could not find user information with request.')
      return
    }

    const link = async () => {
      const emailOption = options.find(s => s.name === 'email')
      if (emailOption == null) {
        privateMessage('Please provide an email address as the first argument.')
        return
      }

      try {
        const { value: email } = emailOption
        await linkAccount(email, user)
        functions.logger.info(`${user.username} has been linked with ${email}`)
        privateMessage(
          `Account successfully linked! ${user.username} :link: ${email}`
        )
      } catch (e) {
        privateMessage(e.message)
      }
    }

    const unlink = async () => {
      privateMessage(`Your account is not associated with any account.`)
      try {
        await unlinkAccount(user)
        privateMessage('Successfully unlinked your account.')
      } catch (e) {
        privateMessage(e.message)
      }
      return
    }

    const commands: Record<string, Function> = { link, unlink }

    if (!(command in commands)) {
      privateMessage(
        'Sorry, that command has been removed. Please let Justin Brooks know, so he can remove it.'
      )
      return
    }

    await commands[command]()
  }
)
