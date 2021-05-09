import {
  Box,
  Flex,
  Icon,
  Text,
  Spacer,
  Button,
  FlexProps
} from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { FaUserFriends } from 'react-icons/fa'

export const Membership: React.FC<FlexProps> = props => {
  return (
    <Flex
      alignItems="center"
      rounded="md"
      marginX={2}
      marginY={5}
      paddingY={5}
      paddingX={10}
      bgColor="green.800"
      {...props}
    >
      <Icon as={FaUserFriends} fontSize="6xl" mr={4} />
      <Box>
        <Text fontWeight="bold" fontSize="2xl">
          Become a Member!
        </Text>
        <Text>Gain access to premium content.</Text>
      </Box>
      <Spacer />
      <NextLink href="/pricing">
        <Button variant="outline" size="lg">
          Get Started
        </Button>
      </NextLink>
    </Flex>
  )
}
