import React from 'react'
import {
  Flex,
  Heading,
  useColorModeValue,
  Text,
  chakra,
  Box,
  Button,
  Spacer
} from '@chakra-ui/react'

import { NextPage } from 'next'
import { LayoutContainer } from '../components/Layout'
import {
  PricingButton,
  PricingCard,
  PricingFeatures,
  PricingHeading,
  PricingPrice
} from '../components/Pricing'
import { TextMuted } from '../components/TextMuted'

const PricingTitle = () => (
  <Box textAlign="center" my={16}>
    <Heading size="2xl">Membership Plans</Heading>
    <TextMuted mt={4} fontSize="2xl">
      Learn to build and scale applications.
    </TextMuted>
  </Box>
)

const PricingMonthly = () => (
  <PricingCard colorScheme="green">
    <PricingHeading>Monthly Membership</PricingHeading>
    <PricingPrice price={20} term="month" />
    <PricingFeatures
      features={[
        'Premium to videos and courses',
        'Private Discord channel',
        'Course completion certificates'
      ]}
    />
    <PricingButton>Start learning</PricingButton>
  </PricingCard>
)

const PricingAnnually = () => (
  <PricingCard isPopular>
    <PricingHeading>Annual Membership</PricingHeading>
    <PricingPrice price={168} term="year" subtitle="$14 / month" />
    <PricingFeatures
      features={[
        'Includes all monthly benefits',
        'Download for offline learning',
        <span>
          <chakra.span
            fontSize="lg"
            fontWeight="bold"
            color={useColorModeValue('blue.400', 'blue.300')}
          >
            Save 30%
          </chakra.span>{' '}
          compared to monthly membership
        </span>
      ]}
    />
    <PricingButton>Start learning</PricingButton>
  </PricingCard>
)

const PricingLifetime = () => (
  <PricingCard colorScheme="purple">
    <PricingHeading>Lifetime Membership</PricingHeading>
    <PricingPrice price={400} />
    <PricingFeatures
      features={[
        'Includes all yearly benefits',
        'Only pay once, ever',
        'Access to all future courses'
      ]}
    />
    <PricingButton>Start learning</PricingButton>
  </PricingCard>
)

const FreeBanner = () => (
  <Box>
    <TextMuted fontWeight="semibold">Don't want to pay?</TextMuted>
    <Flex>
      <Box>
        <Heading letterSpacing="wide">Start learning for free...</Heading>
        <Text fontWeight="semibold" fontSize="xl">
          over 45 videos available
        </Text>
      </Box>
      <Spacer />
      <Button size="lg" variant="outline" mr="2">
        Videos
      </Button>
      <Button size="lg" colorScheme="green">
        Sign up
      </Button>
    </Flex>
  </Box>
)

const Pricing: NextPage = () => (
  <LayoutContainer>
    <PricingTitle />

    <Flex alignItems="center" position="relative" mb={16}>
      <PricingMonthly />
      <PricingAnnually />
      <PricingLifetime />
    </Flex>

    <FreeBanner />
  </LayoutContainer>
)

export default Pricing
