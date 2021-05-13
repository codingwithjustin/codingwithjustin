import {
  Box,
  Button,
  Flex,
  FlexProps,
  Heading,
  Spacer,
  useColorModeValue
} from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { useAuthState } from '../firebase'
import { SignInButton } from './Auth'
import { DarkModeSwitch } from './DarkModeSwitch'
import { SearchInput } from './SearchInput'

export const NavBar: React.FC<FlexProps> = props => {
  const { isLoggedIn, signOut, isAdmin } = useAuthState()
  return (
    <Flex
      {...props}
      alignItems="center"
      px={5}
      bgColor={useColorModeValue('white', 'gray.700')}
      shadow="sm"
      height={16}
    >
      <Heading fontSize="xl">
        <NextLink href="/">Coding With Justin</NextLink>
      </Heading>
      <Box ml={5}>
        <NextLink href="/videos" passHref>
          <Button as="a" variant="ghost">
            Videos
          </Button>
        </NextLink>
        <Button variant="ghost">Courses</Button>
        <NextLink href="/pricing" passHref>
          <Button as="a" variant="ghost">
            Pricing
          </Button>
        </NextLink>
        {isAdmin && (
          <NextLink href="/admin" passHref>
            <Button as="a" colorScheme="red" variant="ghost">
              Admin
            </Button>
          </NextLink>
        )}
      </Box>
      <Spacer />
      <Box w="25rem" mr={4}>
        <SearchInput />
      </Box>
      <Box>
        <DarkModeSwitch mr={2} />
        {isLoggedIn ? (
          <Button mr={2} variant="outline" onClick={signOut}>
            Sign out
          </Button>
        ) : (
          <SignInButton mr={2} variant="outline" colorScheme="green" />
        )}
      </Box>
    </Flex>
  )
}
