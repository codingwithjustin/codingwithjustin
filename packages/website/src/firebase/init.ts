import { getApp, initializeApp } from 'firebase/app'

try {
  getApp()
} catch {
  const isDev = process.env.NODE_ENV === 'development'

  // eslint-disable-next-line no-console
  if (isDev) console.log('Using development firebase environment.')

  initializeApp(
    isDev
      ? {
          apiKey: 'AIzaSyBPLXhVfl2yaBeEdNTOJ9m-HtKTqdn01Io',
          authDomain: 'coding-with-justin-dev.firebaseapp.com',
          projectId: 'coding-with-justin-dev',
          storageBucket: 'coding-with-justin-dev.appspot.com',
          messagingSenderId: '134043093199',
          appId: '1:134043093199:web:55c90d1580aa3439fb0fba'
        }
      : {
          apiKey: 'AIzaSyBvyHxxqma_NAzg7LZqVUuph1eQm_ChHy4',
          authDomain: 'coding-with-justin.firebaseapp.com',
          projectId: 'coding-with-justin',
          storageBucket: 'coding-with-justin.appspot.com',
          messagingSenderId: '265327173477',
          appId: '1:265327173477:web:972eee7da3f1f14a6d4b8c',
          measurementId: 'G-GMFCN91DN1'
        }
  )
}
