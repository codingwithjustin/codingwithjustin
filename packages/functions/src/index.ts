import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

export * from './discord'
export * from './users'

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})
