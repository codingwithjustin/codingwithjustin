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
import { DarkModeSwitch } from './DarkModeSwitch'
import { SearchInput } from './SearchInput'

export const NavBar: React.FC<FlexProps> = props => {
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
        <Button variant="ghost">Videos</Button>
        <Button variant="ghost">Courses</Button>
        <NextLink href="/pricing">
          <Button variant="ghost">Pricing</Button>
        </NextLink>
      </Box>
      <Spacer />
      <Box w="25rem" mr={4}>
        <SearchInput />
      </Box>
      <Box>
        <DarkModeSwitch mr={2} />

        <Button variant="ghost">Sign In</Button>
        <Button variant="ghost">Sign Up</Button>
      </Box>
    </Flex>
  )
}
