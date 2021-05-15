import { LostGraphic } from '@/components/Graphics'
import { LayoutContainer } from '@/components/Layout'
import { TextMuted } from '@/components/TextMuted'
import {
  Box,
  Center,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Icon
} from '@chakra-ui/react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const Custom404: NextPage = () => {
  const router = useRouter()
  const [search, setSearch] = useState('')
  return (
    <>
      <NextSeo
        title="Page Not found"
        description="Could not find the page you are looking for."
      />
      <LayoutContainer>
        <Center>
          <Box position="relative">
            <Heading
              textAlign="center"
              m={3}
              position={{ base: undefined, sm: 'absolute' }}
              top={12}
            >
              You seem lost...
            </Heading>
            <LostGraphic mb={10} w={{ base: 300, sm: 450, md: 550 }} />
            <TextMuted>Looking for something specific?</TextMuted>
            <InputGroup variant="filled" size="lg">
              <InputLeftElement pointerEvents="none" mt={2}>
                <Icon as={FaSearch} color="gray.300" fontSize="xl" />
              </InputLeftElement>
              <Input
                mt={2}
                placeholder="Search"
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => {
                  if (e.key !== 'Enter') return
                  e.preventDefault()
                  router.push(`/search?string=${search}`)
                }}
              />
            </InputGroup>
          </Box>
        </Center>
      </LayoutContainer>
    </>
  )
}

export default Custom404
