import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import React from 'react'
import { StripeProvider } from '../stripe'
import theme from '../theme'
import { MDXProvider } from '@mdx-js/react'

import { components } from '@/components/mdx'

import { DefaultSeo } from 'next-seo'
import { CodeGroupProvider } from '@/components/mdx/CodeGroup'

const App = ({ Component, pageProps }: AppProps) => {
  return (
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
  )
}

export default App
