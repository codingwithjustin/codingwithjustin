import {
  Avatar,
  Box,
  Button,
  ButtonProps,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FlexProps,
  Heading,
  IconButton,
  LinkBox,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuProps,
  Spacer,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { FaBars } from 'react-icons/fa'
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

const NavDrawer: React.FC = () => {
  const { isAdmin } = useAuthState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <IconButton
        icon={<FaBars />}
        color="gray.400"
        variant="ghost"
        onClick={onOpen}
        aria-label="Navbar menu"
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize="2xl">CWJ</DrawerHeader>

          <DrawerBody>
            <VStack textAlign="left">
              <NavButton href="/" isFullWidth>
                Home
              </NavButton>
              <NavButton href="/videos" isFullWidth>
                Videos
              </NavButton>
              <NavButton href="/courses" isFullWidth>
                Courses
              </NavButton>
              <NavButton href="/pricing" isFullWidth>
                Pricing
              </NavButton>
              {isAdmin && (
                <NavButton href="/pricing" isFullWidth colorScheme="red">
                  Admin
                </NavButton>
              )}
            </VStack>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const NavBar: React.FC<FlexProps> = props => {
  const { isLoggedIn, isAdmin } = useAuthState()

  const isSmall = useBreakpointValue({ base: true, md: false })
  const showSmallTitle = useBreakpointValue({ base: true, lg: false })
  return (
    <Flex
      {...props}
      alignItems="center"
      px={{ base: 5 }}
      bgColor={useColorModeValue('white', 'gray.700')}
      shadow="sm"
      height={16}
    >
      <Heading fontSize="xl" mr={5}>
        <NextLink href="/">
          {showSmallTitle ? 'CWJ' : 'Coding With Justin'}
        </NextLink>
      </Heading>

      {!isSmall && (
        <Box>
          <NavButton href="/videos">Videos</NavButton>
          <NavButton href="/courses">Courses</NavButton>
          <NavButton href="/pricing">Pricing</NavButton>
          {isAdmin && (
            <NavButton href="/admin" colorScheme="red">
              Admin
            </NavButton>
          )}
        </Box>
      )}

      <Spacer />
      <Box w={{ base: undefined, lg: '20rem' }} mr={5}>
        <SearchInput />
      </Box>
      <Box flexShrink={0} mr={2}>
        {!isSmall && <DarkModeSwitch mr={2} />}
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <SignInButton mr={2} variant="outline" colorScheme="green" />
        )}
      </Box>
      {isSmall && <NavDrawer />}
    </Flex>
  )
}
