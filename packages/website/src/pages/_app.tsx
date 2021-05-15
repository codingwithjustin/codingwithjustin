import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import React from 'react'
import { StripeProvider } from '../stripe'
import theme from '../theme'
import { getApp, initializeApp } from 'firebase/app'
import { MDXProvider } from '@mdx-js/react'
import { components } from '@/mdx'
import { DefaultSeo } from 'next-seo'

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

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <MDXProvider components={components}>
        <StripeProvider>
          <DefaultSeo
            title="Coding with Justin"
            titleTemplate="%s - Coding with Justin"
            description="Learning to build fullstack applications."
            openGraph={{
              type: 'website',
              url: 'https://codingwithjustin.com',
              site_name: 'Coding With Justin'
            }}
            twitter={{ handle: '@jsbroks' }}
          />
          <Component {...pageProps} />
        </StripeProvider>
      </MDXProvider>
    </ChakraProvider>
  )
}

export default App
