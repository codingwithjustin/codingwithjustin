import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  Flex,
  FlexProps,
  Heading,
  LinkBox,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuProps,
  Spacer,
  useColorModeValue
} from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { useAuthState } from '../firebase'
import { SignInButton } from './Auth'
import { DarkModeSwitch } from './DarkModeSwitch'
import { SearchInput } from './SearchInput'

const UserMenu: React.FC<Omit<MenuProps, 'children'>> = props => {
  const { user, signOut } = useAuthState()
  return (
    <Menu {...props}>
      <MenuButton
        as={Avatar}
        m={1}
        size="sm"
        cursor="pointer"
        src={user?.photoURL}
        name={user?.displayName ?? ''}
      />
      <MenuList>
        <NextLink href="/membership" passHref>
          <MenuItem as={LinkBox}>Membership</MenuItem>
        </NextLink>
        <NextLink href="/settings" passHref>
          <MenuItem as={LinkBox}>Settings</MenuItem>
        </NextLink>
        <MenuDivider />
        <MenuItem onClick={signOut}>Sign out</MenuItem>
      </MenuList>
    </Menu>
  )
}

const NavButton: React.FC<ButtonProps & { href: string }> = props => {
  const { href, ...buttonProps } = props

  return (
    <NextLink href={href} passHref>
      <Button as="a" variant="ghost" {...buttonProps} />
    </NextLink>
  )
}

export const NavBar: React.FC<FlexProps> = props => {
  const { isLoggedIn, isAdmin } = useAuthState()
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
        <NavButton href="/videos">Videos</NavButton>
        <NavButton href="/courses">Courses</NavButton>
        <NavButton href="/pricing">Pricing</NavButton>
        {isAdmin && (
          <NavButton href="/admin" colorScheme="red">
            Admin
          </NavButton>
        )}
      </Box>
      <Spacer />
      <Box w="25rem" mr={4}>
        <SearchInput />
      </Box>
      <Box>
        <DarkModeSwitch mr={2} />
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <SignInButton mr={2} variant="outline" colorScheme="green" />
        )}
      </Box>
    </Flex>
  )
}
