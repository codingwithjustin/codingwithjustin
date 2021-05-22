import { LayoutContainer } from '@/components/Layout'
import { Heading, VStack } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { NextPage } from 'next'
import React from 'react'

const DiscordRedirect: NextPage = () => {
  if (process.browser) {
    window.location.href = 'https://discord.gg/8Zr5qgtPBc'
  }

  return (
    <LayoutContainer>
      <VStack textAlign="center" spacing={10}>
        <Spinner size="xl" />
        <Heading>Redirecting to discord invite link...</Heading>
      </VStack>
    </LayoutContainer>
  )
}

export default DiscordRedirect
