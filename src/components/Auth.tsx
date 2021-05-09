import {
  useColorModeValue,
  Text,
  HeadingProps,
  Heading,
  TextProps,
  ButtonProps,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  VStack
} from '@chakra-ui/react'
import React from 'react'
import { FaApple, FaGithub, FaGoogle } from 'react-icons/fa'
import { TextMuted } from './TextMuted'

export const AuthHeader: React.FC<HeadingProps> = props => (
  <Heading textAlign="center" size="xl" fontWeight="extrabold" {...props} />
)

export const AuthText: React.FC<TextProps> = props => (
  <Text
    mt="4"
    mb="8"
    align="center"
    maxW="md"
    fontWeight="medium"
    {...props}
  ></Text>
)

export const GoogleAuthButton: React.FC<ButtonProps> = props => (
  <Button
    bgColor={useColorModeValue('red.500', 'red.600')}
    color="white"
    _hover={{ bgColor: useColorModeValue('red.600', 'red.500') }}
    leftIcon={<FaGoogle />}
    size="lg"
    isFullWidth
    {...props}
  >
    Google
  </Button>
)

export const GithubAuthButton: React.FC<ButtonProps> = props => (
  <Button
    bgColor={useColorModeValue('gray.700', 'whiteAlpha.100')}
    _hover={{
      bgColor: useColorModeValue('gray.800', 'whiteAlpha.300')
    }}
    color="white"
    leftIcon={<FaGithub />}
    size="lg"
    isFullWidth
    {...props}
  >
    Github
  </Button>
)

export const AppleAuthButton: React.FC<ButtonProps> = props => (
  <Button
    bgColor={useColorModeValue('white', 'gray.200')}
    _hover={{
      bgColor: useColorModeValue('gray.100', 'white')
    }}
    variant={useColorModeValue('outline', 'solid')}
    color="blackAlpha.900"
    leftIcon={<FaApple />}
    size="lg"
    isFullWidth
    {...props}
  >
    Apple
  </Button>
)

export const SignInButton: React.FC<ButtonProps> = props => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button children={'Sign In'} {...props} onClick={onOpen} />

      <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton /> */}
          <ModalBody m={5} py={8}>
            <AuthHeader>Welcome back!</AuthHeader>
            <AuthText>Sign in to continue</AuthText>
            <VStack>
              <GoogleAuthButton />
              <GithubAuthButton />
              <AppleAuthButton />
            </VStack>
            <TextMuted mt={10} fontSize="sm">
              By signing in you agree to our Terms of Service and Privacy
              Policy. We'll send you account-related emails on rare occasions.
            </TextMuted>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
