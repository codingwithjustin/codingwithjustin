import {
  Box,
  Button,
  Center,
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Spinner,
  useColorModeValue,
  useToken,
} from '@chakra-ui/react';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import {StripeError} from '@stripe/stripe-js';
import React, {FormEventHandler, useState} from 'react';

export const CardInput: React.FC = () => {
  const [
    whiteAlpha900,
    whiteAlpha400,
    blackAlpha400,
    blue400,
    blue500,
    red300,
    red500,
  ] = useToken('colors', [
    'whiteAlpha.900',
    'whiteAlpha.400',
    'blackAlpha.500',
    'blue.400',
    'blue.500',
    'red.300',
    'red.500',
  ]);

  const [focused, setFocused] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const placeholderColor = useColorModeValue(blackAlpha400, whiteAlpha400);
  const invalidColor = useColorModeValue(red500, red300);
  const focusedColor = useColorModeValue(blue500, blue400);
  const inputColor = useColorModeValue('black', 'white');
  const iconColor = useColorModeValue('', whiteAlpha900);

  const fontFamily =
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"';

  const [error, setError] = useState<StripeError>();

  const isInvalid = error != null;
  const borderColor = focused ?
    focusedColor :
    isInvalid ?
    invalidColor :
    undefined;

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel htmlFor="name">Card</FormLabel>
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
            onChange={(e) => setError(e.error)}
            options={{
              hidePostalCode: true,
              iconStyle: 'default',
              style: {
                base: {
                  iconColor,
                  'color': inputColor,
                  'padding': '16px',
                  fontFamily,
                  'fontSmoothing': 'antialiased',
                  'fontSize': '16px',
                  '::placeholder': {color: placeholderColor},
                },
                invalid: {
                  color: invalidColor,
                },
              },
            }}
          />
        ) : (
          <Center w="100%">
            <Spinner />
          </Center>
        )}
      </Box>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const card = elements?.getElement(CardElement);
    if (stripe == null || card == null) {
      return;
    }

    const {createPaymentMethod} = stripe;
    const {error, paymentMethod} = await createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
  };
  return (
    <chakra.form onSubmit={handleSubmit}>
      <CardInput />
      <Button type="submit">Submit</Button>
    </chakra.form>
  );
};
