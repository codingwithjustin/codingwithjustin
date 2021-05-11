import {
  Badge,
  BadgeProps,
  BoxProps,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  useColorModeValue,
  Text,
  Button,
  Box,
  HeadingProps
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { IconType } from 'react-icons'

import { FaCheck } from 'react-icons/fa'
import { TextMuted } from './TextMuted'

const PricingContext = React.createContext({
  isPopular: false,
  colorScheme: 'blue'
})

const Popular: React.FC<BadgeProps> = props => {
  return (
    <Badge
      {...props}
      textTransform="uppercase"
      rounded="lg"
      fontWeight="bold"
      fontSize="sm"
      position="absolute"
    >
      Most Popular
    </Badge>
  )
}

export interface PricingPriceProps {
  price: string | number
  term?: string
  subtitle?: string
}

export const PricingPrice: React.FC<PricingPriceProps> = props => {
  const { price: value, term, subtitle } = props
  return (
    <Box>
      <Flex justify="center" fontWeight="extrabold">
        <Text fontSize="2xl">$</Text>
        <Heading size="4xl" fontWeight="inherit" lineHeight="0.9em">
          {value}
        </Heading>
        {term && (
          <Text fontWeight="inherit" fontSize="2xl" mt="auto" marginLeft={1}>
            / {term}
          </Text>
        )}
      </Flex>
      {subtitle && (
        <TextMuted textAlign="center" mt={2}>
          {subtitle}
        </TextMuted>
      )}
    </Box>
  )
}

export const PricingHeading: React.FC<HeadingProps> = ({
  children,
  ...props
}) => {
  return (
    <Heading
      {...props}
      textAlign="center"
      size="md"
      fontWeight="bold"
      letterSpacing="wide"
    >
      {children}
    </Heading>
  )
}

export interface PricingFeaturesProps {
  features: Array<string | React.ReactElement>
  icon?: IconType
}

export const PricingFeatures: React.FC<PricingFeaturesProps> = props => {
  const { colorScheme } = useContext(PricingContext)
  const { features, icon = FaCheck } = props
  return (
    <List spacing="4" mb="8">
      {features.map((feature, idx) => (
        <ListItem fontWeight="medium" key={idx}>
          <ListIcon
            fontSize="md"
            as={icon}
            marginEnd={2}
            color={`${colorScheme}.500`}
          />
          {feature}
        </ListItem>
      ))}
    </List>
  )
}

export const PricingButton: React.FC = ({ children }) => {
  const { isPopular, colorScheme } = useContext(PricingContext)
  return (
    <Button
      size="lg"
      fontWeight="bold"
      letterSpacing="wide"
      w="full"
      colorScheme={isPopular ? colorScheme : undefined}
    >
      {children}
    </Button>
  )
}

export interface PricingCardProps extends BoxProps {
  isPopular?: boolean
  colorScheme?: string
}

export const PricingCard: React.FC<PricingCardProps> = props => {
  const { children, isPopular = false, colorScheme = 'blue', ...rest } = props

  const bgColor = useColorModeValue('white', 'gray.700')

  return (
    <PricingContext.Provider value={{ colorScheme, isPopular }}>
      <Flex
        {...rest}
        flexDirection="column"
        justifyContent="space-between"
        zIndex="1"
        margin="3"
        rounded="lg"
        px="6"
        pb="6"
        pt="16"
        overflow="hidden"
        shadow="md"
        maxW="sm"
        width="100%"
        minHeight={isPopular ? '32rem' : '30rem'}
        bgColor={bgColor}
        borderColor={isPopular ? `${colorScheme}.500` : 'transparent'}
        borderWidth={2}
      >
        {isPopular && (
          <Popular
            zIndex="20"
            left="50%"
            paddingX={4}
            paddingY={1}
            transform="translateX(-50%)"
            top={-0.5}
            color="white"
            bgColor={`${colorScheme}.500`}
          />
        )}
        {children}
      </Flex>
    </PricingContext.Provider>
  )
}