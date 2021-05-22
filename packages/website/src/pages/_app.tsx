import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { StripeProvider } from '../stripe'
import theme from '../theme'
import { MDXProvider } from '@mdx-js/react'

import { components } from '@/components/mdx'

import { DefaultSeo } from 'next-seo'
import { CodeGroupProvider } from '@/components/mdx/CodeGroup'

const App = ({ Component, pageProps }: AppProps) => {
  if (process.browser) {
    const { hostname, pathname } = window.location
    if (
      hostname == 'coding-with-justin.web.app' ||
      hostname == 'coding-with-justin.firebaseapp.com'
    ) {
      window.location.href = `https://codingwithjustin.com${pathname}`
    }
  }

  return (
    <>
      <Head>
        <link rel="canonical" href="https://codingwithjustin.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        <MDXProvider components={components}>
          <CodeGroupProvider>
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
          </CodeGroupProvider>
        </MDXProvider>
      </ChakraProvider>
    </>
  )
}

export default App
