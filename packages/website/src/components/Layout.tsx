import React from 'react'
import {
  Box,
  Container,
  ContainerProps,
  Flex,
  useBreakpointValue
} from '@chakra-ui/react'
import { Footer } from './Footer'
import { NavBar } from './NavBar'

export const LayoutNavbarFooter: React.FC = ({ children }) => {
  return (
    <Box position="relative" minH="100vh" paddingBottom={24}>
      <NavBar />
      {children}
      <Box bottom={0} h={24} left={0} w="full" position="absolute">
        <Footer />
      </Box>
    </Box>
  )
}

export const LayoutContainer: React.FC<ContainerProps> = props => {
  return (
    <LayoutNavbarFooter>
      <Container
        maxW="7xl"
        mt={12}
        mb={16}
        px={{ base: 4, md: 10 }}
        {...props}
      />
    </LayoutNavbarFooter>
  )
}

export const LayoutRightSidebar: React.FC<{
  sidebar: React.ReactNode
  navbar: React.ElementType
}> = props => {
  const { children, navbar: Navbar, sidebar } = props
  const hideSidebar = useBreakpointValue({ base: true, lg: false })
  return (
    <Flex flexDirection="column" height="100vh">
      <Box flexShrink={0}>
        <Navbar>{hideSidebar && sidebar}</Navbar>
      </Box>
      <Flex overflow="hidden" flexGrow={1}>
        <Flex flexGrow={1} minWidth={0}>
          <Flex flexGrow={1} overflow="hidden">
            <Box flexGrow={1} overflowY="auto">
              {children}
            </Box>
          </Flex>
          {!hideSidebar && (
            <Flex flexShrink={0} overflow="hidden" borderLeftWidth="1px">
              {sidebar}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}
