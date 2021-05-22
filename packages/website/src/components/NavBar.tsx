import { url } from '@/content'
import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonProps,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
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
import { useAuthState, useUserData } from '../firebase'
import { SignInButton } from './Auth'
import { useCourseContent } from './Courses'
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

const NavDrawer: React.FC<Omit<DrawerProps, 'isOpen' | 'onClose'>> = ({
  children,
  ...drawerProps
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <IconButton
        icon={<FaBars />}
        color={useColorModeValue('gra.600', 'gray.500')}
        variant="ghost"
        fontSize="xl"
        onClick={onOpen}
        aria-label="Navbar menu"
      />
      <Drawer
        placement="right"
        size="lg"
        {...drawerProps}
        onClose={onClose}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    </>
  )
}

const NavBarContainer: React.FC<FlexProps> = props => (
  <Flex
    alignItems="center"
    px={{ base: 5 }}
    bgColor={useColorModeValue('white', 'gray.700')}
    shadow="sm"
    height={16}
    {...props}
  />
)

const Brand: React.FC = () => {
  const isMd = useBreakpointValue({ base: true, lg: false })
  return (
    <Heading fontSize="xl" mr={5}>
      <NextLink href="/">{isMd ? 'CWJ' : 'Coding With Justin'}</NextLink>
    </Heading>
  )
}

export const NavBar: React.FC<FlexProps> = props => {
  const { isLoggedIn, isAdmin } = useAuthState()
  const { hasMembership } = useUserData()

  const isSmall = useBreakpointValue({ base: true, md: false })
  const isBase = useBreakpointValue({ base: true, sm: false })
  const isMd = useBreakpointValue({ base: true, lg: false })
  return (
    <NavBarContainer {...props}>
      <Brand />

      {!isSmall && (
        <Box>
          <NavButton href="/videos">Videos</NavButton>
          <NavButton href="/courses">Courses</NavButton>
          {hasMembership ? (
            <NavButton href="/settings">Settings</NavButton>
          ) : (
            <NavButton href="/pricing">Pricing</NavButton>
          )}
          {isAdmin && (
            <NavButton href="/admin" colorScheme="red">
              Admin
            </NavButton>
          )}
        </Box>
      )}

      <Spacer />
      {!isBase && (
        <Box w={{ base: undefined, lg: '20rem' }} mr={5}>
          <SearchInput />
        </Box>
      )}
      <Box flexShrink={0} mr={2}>
        {!isMd && <DarkModeSwitch mr={2} />}
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <SignInButton mr={2} variant="outline" colorScheme="green" />
        )}
      </Box>
      {isSmall && (
        <NavDrawer>
          <DrawerCloseButton />
          <DrawerHeader fontSize="2xl">CWJ</DrawerHeader>

          <DrawerBody>
            <VStack textAlign="left">
              {isBase && <SearchInput />}
              <NavButton href="/" isFullWidth>
                Home
              </NavButton>
              <NavButton href="/videos" isFullWidth>
                Videos
              </NavButton>
              <NavButton href="/courses" isFullWidth>
                Courses
              </NavButton>
              {hasMembership ? (
                <NavButton href="/settings">Settings</NavButton>
              ) : (
                <NavButton href="/pricing" isFullWidth>
                  Pricing
                </NavButton>
              )}
              {isAdmin && (
                <NavButton href="/pricing" isFullWidth colorScheme="red">
                  Admin
                </NavButton>
              )}
              <Divider />
              <DarkModeSwitch />
            </VStack>
          </DrawerBody>
        </NavDrawer>
      )}
    </NavBarContainer>
  )
}

export const NavbarCourses: React.FC = ({ children }) => {
  const { isLoggedIn } = useAuthState()
  const isMd = useBreakpointValue({ base: true, lg: false })
  const { course, section, content } = useCourseContent()
  return (
    <NavBarContainer>
      <Brand />
      <Breadcrumb ml={3}>
        <BreadcrumbItem>
          <NextLink href={url(course)} passHref>
            <BreadcrumbLink>{course.title}</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>{section.name}</BreadcrumbLink>
        </BreadcrumbItem>
        {!isMd && (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{content.title}</BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>
      <Spacer />
      <Box flexShrink={0} mr={2}>
        {!isMd && <DarkModeSwitch mr={2} />}
        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <SignInButton mr={2} variant="outline" colorScheme="green" />
        )}
      </Box>
      {children && (
        <NavDrawer size="sm">
          <DrawerCloseButton />
          {children}
        </NavDrawer>
      )}
    </NavBarContainer>
  )
}
