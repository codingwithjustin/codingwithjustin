import { getApp, initializeApp } from 'firebase/app'

try {
  getApp()
} catch {
  initializeApp({
    apiKey: 'AIzaSyBvyHxxqma_NAzg7LZqVUuph1eQm_ChHy4',
    authDomain: 'coding-with-justin.firebaseapp.com',
    projectId: 'coding-with-justin',
    storageBucket: 'coding-with-justin.appspot.com',
    messagingSenderId: '265327173477',
    appId: '1:265327173477:web:972eee7da3f1f14a6d4b8c',
    measurementId: 'G-GMFCN91DN1'
  })
}
