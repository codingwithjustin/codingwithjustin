import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import React from 'react'
import { StripeProvider } from '../stripe'
import theme from '../theme'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <StripeProvider>
        <Component {...pageProps} />
      </StripeProvider>
    </ChakraProvider>
  )
}

export default App
