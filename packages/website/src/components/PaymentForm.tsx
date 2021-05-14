import {
  Box,
  Button,
  Center,
  chakra,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  VStack,
  Input,
  Spinner,
  Text,
  useColorModeValue,
  useToken,
  ModalProps,
  Modal,
  ModalOverlay,
  ModalContent,
  Heading,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { StripeError } from '@stripe/stripe-js'
import React, { FormEventHandler, useState } from 'react'

export const CardInput: React.FC = () => {
  const [
    whiteAlpha900,
    whiteAlpha400,
    blackAlpha400,
    blue400,
    blue500,
    red300,
    red500
  ] = useToken('colors', [
    'whiteAlpha.900',
    'whiteAlpha.400',
    'blackAlpha.500',
    'blue.400',
    'blue.500',
    'red.300',
    'red.500'
  ])

  const [focused, setFocused] = useState(false)

  const stripe = useStripe()
  const elements = useElements()

  const placeholderColor = useColorModeValue(blackAlpha400, whiteAlpha400)
  const invalidColor = useColorModeValue(red500, red300)
  const focusedColor = useColorModeValue(blue500, blue400)
  const inputColor = useColorModeValue('black', 'white')
  const iconColor = useColorModeValue('', whiteAlpha900)

  const fontFamily =
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'

  const [error, setError] = useState<StripeError>()

  const isInvalid = error != null
  const borderColor = focused
    ? focusedColor
    : isInvalid
    ? invalidColor
    : undefined

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel htmlFor="name">Payment method</FormLabel>
      <Box
        rounded="md"
        borderWidth={1}
        p={2}
        borderColor={'inherit'}
        boxShadow={borderColor != null ? `0 0 0 2px ${borderColor}` : undefined}
        h="10"
      >
        {stripe != null && elements != null ? (
          <CardElement
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={e => setError(e.error)}
            options={{
              hidePostalCode: true,
              iconStyle: 'default',
              style: {
                base: {
                  iconColor,
                  color: inputColor,
                  padding: '16px',
                  fontFamily,
                  fontSmoothing: 'antialiased',
                  fontSize: '16px',
                  '::placeholder': { color: placeholderColor }
                },
                invalid: {
                  color: invalidColor
                }
              }
            }}
          />
        ) : (
          <Center w="100%">
            <Spinner />
          </Center>
        )}
      </Box>
      <FormHelperText>
        This is a secure 128-bit SSL encrypted payment handled and processed by
        Stripe.com. CWJ does not receive, process or store any of your payment
        information.
      </FormHelperText>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}

export const PaymentForm: React.FC<{ planId: string }> = () => {
  const stripe = useStripe()
  const elements = useElements()

  const [coupon, setCoupon] = useState('')

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    const card = elements?.getElement(CardElement)
    if (stripe == null || card == null) {
      return
    }

    const { createPaymentMethod } = stripe
    const { error, paymentMethod } = await createPaymentMethod({
      type: 'card',
      card
    })

    if (error) {
      // eslint-disable-next-line no-console
      console.log('[error]', error)
    } else {
      // eslint-disable-next-line no-console
      console.log('[PaymentMethod]', paymentMethod)
    }
  }

  return (
    <chakra.form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Currently logged in as</FormLabel>
          <Input readOnly value="jsbroks@gmail.com" />
        </FormControl>

        <CardInput />

        <FormControl>
          <FormLabel>Coupon</FormLabel>
          <Input
            value={coupon}
            onChange={e => setCoupon(e.target.value)}
            placeholder="Code"
          />
        </FormControl>

        <FormControl>
          <Button type="submit" size="lg" isFullWidth colorScheme="green">
            Start Learning Now
          </Button>
          <FormHelperText fontSize="sm" mb={2}>
            I agree to the Terms of Use and Privacy Policy
          </FormHelperText>
        </FormControl>
      </VStack>
    </chakra.form>
  )
}

export interface PaymentModalProps extends Omit<ModalProps, 'children'> {
  membership: {
    planId: string
    name: string
    price: string
  }
}

export const PaymentModal: React.FC<PaymentModalProps> = props => {
  const {
    membership: { name, price, planId }
  } = props
  return (
    <Modal blockScrollOnMount={true} size="lg" {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody m={5} py={4}>
          <Heading mb={3}>{name}</Heading>
          <Text my={3} fontWeight="semibold">
            Bill Today <chakra.span float="right">{price}</chakra.span>
          </Text>
          <PaymentForm planId={planId} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
