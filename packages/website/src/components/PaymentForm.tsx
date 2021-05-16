import {
  createPaymentIntent,
  createStripeSubscription,
  useAuthState,
  useUserData
} from '@/firebase'
import { formatPrice } from '@/stripe'
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
  ModalCloseButton,
  useRadio,
  Flex,
  useRadioGroup,
  UseRadioProps,
  Spacer,
  Icon,
  Select
} from '@chakra-ui/react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { StripeError } from '@stripe/stripe-js'
import { useRouter } from 'next/router'
import React, { FormEventHandler, useState } from 'react'

import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md'
import { useCheckout, useCheckoutMembership } from './Pricing'

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

const SubscriptionOption: React.FC<
  UseRadioProps & {
    text: string
    amount?: string
  }
> = props => {
  const { state, getInputProps, getCheckboxProps } = useRadio(props)
  const { isChecked } = state
  const { amount, text } = props

  return (
    <Box as="label" w="full" cursor="pointer">
      <input {...getInputProps()} />
      <Flex
        {...getCheckboxProps()}
        rounded="md"
        borderWidth="2px"
        p={3}
        w="full"
        alignItems="center"
        borderColor={isChecked ? 'blue.300' : 'gray.600'}
        bgColor={isChecked ? 'whiteAlpha.100' : undefined}
      >
        {isChecked ? (
          <Icon as={MdRadioButtonChecked} />
        ) : (
          <Icon as={MdRadioButtonUnchecked} />
        )}
        <Text ml={2}> {text} </Text>
        <Spacer />
        <Box ml={2}>
          <chakra.span color="blue.200" fontWeight="bold">
            {amount ?? 'N / A'}
          </chakra.span>
        </Box>
      </Flex>
    </Box>
  )
}

const SubscriptionRadio: React.FC<{
  value?: string
  onChange?: (v: string) => void
  currency?: string
  onCurrencyChange?: (v: string) => void
}> = ({ value, onChange, currency, onCurrencyChange }) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    value,
    name: 'pricing',
    defaultValue: 'react',
    onChange
  })

  const { currencies } = useCheckout()
  const { monthly, yearly, lifetime } = useCheckoutMembership()

  return (
    <Box {...getRootProps()} w="full">
      <Flex alignItems="center" mb={2}>
        <Text fontWeight="semibold">Plan</Text>
        <Spacer />
        <Select
          size="xs"
          w={75}
          value={currency}
          onChange={e => onCurrencyChange?.(e.target.value)}
        >
          {currencies?.map(c => (
            <option key={c} value={c}>
              {c.toUpperCase()}
            </option>
          ))}
        </Select>
      </Flex>

      <VStack spacing={2}>
        <SubscriptionOption
          {...getRadioProps({ value: 'monthly' })}
          text="Monthly Membership"
          amount={formatPrice(monthly)}
        />
        <SubscriptionOption
          {...getRadioProps({ value: 'yearly' })}
          text="Yearly Membership"
          amount={formatPrice(yearly)}
        />
        <SubscriptionOption
          {...getRadioProps({ value: 'lifetime' })}
          text="Lifetime Membership"
          amount={formatPrice(lifetime)}
        />
      </VStack>
    </Box>
  )
}

export const PaymentForm: React.FC = () => {
  const stripe = useStripe()
  const elements = useElements()
  const { user } = useAuthState()
  const userData = useUserData()

  const [processing, setProcessing] = useState('')
  const [coupon, setCoupon] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { term, setTerm, currency, setCurrency } = useCheckout()
  const { selected } = useCheckoutMembership()
  const router = useRouter()

  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    const card = elements?.getElement(CardElement)
    if (stripe == null || card == null) return
    if (selected == null) return
    if (userData?.stripeCustomerId == null) return

    const customerId = userData.stripeCustomerId
    const priceId = selected.id

    let clientSecret: string
    if (selected.type === 'one_time') {
      setProcessing('Creating invoice')
      const { data } = await createPaymentIntent({ customerId, priceId })
      clientSecret = data.clientSecret
    } else {
      setProcessing('Creating subscription')
      const { data } = await createStripeSubscription({ customerId, priceId })
      clientSecret = data.clientSecret
    }

    try {
      setProcessing('Verifying card')
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card }
      })
      router.push('/settings')
    } catch (ex) {
      setErrorMessage(ex.message)
    } finally {
      setProcessing('')
    }
  }

  if (user == null) {
    return <Text>You are not logged in!</Text>
  }

  return (
    <chakra.form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <SubscriptionRadio
          value={term}
          onChange={v => setTerm(v)}
          currency={currency}
          onCurrencyChange={setCurrency}
        />
        <FormControl>
          <FormLabel>Currently logged in as</FormLabel>
          <Input readOnly value={user.email ?? user.uid} />
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

        <FormControl isInvalid={errorMessage.length !== 0}>
          <Button
            type="submit"
            size="lg"
            isFullWidth
            colorScheme="green"
            isLoading={processing.length > 0}
            loadingText={processing}
          >
            Pay
          </Button>
          <FormErrorMessage>{errorMessage}</FormErrorMessage>
          <FormHelperText fontSize="sm" mb={2}>
            I agree to the Terms of Use and Privacy Policy
          </FormHelperText>
        </FormControl>
      </VStack>
    </chakra.form>
  )
}

export interface PaymentModalProps extends Omit<ModalProps, 'children'> {}

export const PaymentModal: React.FC<PaymentModalProps> = props => {
  return (
    <Modal blockScrollOnMount={true} size="lg" {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody m={5} py={4}>
          <Heading mb={3}>Checkout</Heading>
          <PaymentForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
