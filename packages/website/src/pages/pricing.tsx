import React, { useEffect, useState } from 'react'
import {
  Flex,
  Heading,
  useColorModeValue,
  chakra,
  Box,
  Button,
  Icon,
  Center,
  HeadingProps,
  ButtonProps,
  TextProps,
  FlexProps
} from '@chakra-ui/react'

import { GetStaticProps, NextPage } from 'next'
import NextLink from 'next/link'
import { LayoutContainer } from '../components/Layout'
import {
  CheckoutContext,
  PricingButton,
  PricingCard,
  PricingFeatures,
  PricingHeading,
  PricingPrice
} from '../components/Pricing'
import { TextMuted } from '../components/TextMuted'
import { FaAngleRight } from 'react-icons/fa'
import {
  DownloadGraphic,
  NetworkGraphic,
  SteamingGraphic
} from '../components/Graphics'
import { NextSeo } from 'next-seo'
import { Price, useUserData } from '@/firebase'
import { getMembershipPrices } from '@/stripe'
import { useRouter } from 'next/router'

const PricingTitle: React.FC = () => (
  <Box textAlign="center" my={16}>
    <Heading size="4xl">Membership Plans</Heading>
    <TextMuted mt={4} fontSize="2xl">
      Learn to build and scale applications.
    </TextMuted>
  </Box>
)

const PricingMonthly: React.FC = () => (
  <PricingCard>
    <PricingHeading>Monthly Membership</PricingHeading>
    <PricingPrice price={20} term="month" />
    <PricingFeatures
      features={[
        'Premium videos and courses',
        'Private Discord channel',
        'Course completion certificates'
      ]}
    />
    <PricingButton term="monthly">Start learning</PricingButton>
  </PricingCard>
)

const PricingAnnually: React.FC = () => (
  <PricingCard isPopular colorScheme="green">
    <PricingHeading>Annual Membership</PricingHeading>
    <PricingPrice price={168} term="year" subtitle="$14 / month" />
    <PricingFeatures
      features={[
        'Includes all monthly benefits',
        'Download for offline learning',
        <span key="save">
          <chakra.span
            fontSize="lg"
            fontWeight="bold"
            color={useColorModeValue('green.400', 'green.300')}
          >
            Save 30%
          </chakra.span>{' '}
          compared to monthly membership
        </span>
      ]}
    />
    <PricingButton term="yearly">Start learning</PricingButton>
  </PricingCard>
)

const PricingLifetime: React.FC = () => (
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
    <PricingButton term="lifetime">Start learning</PricingButton>
  </PricingCard>
)

const Feature: React.FC<FlexProps> = props => (
  <Flex
    alignItems="center"
    direction={{ base: 'column', lg: 'row' }}
    {...props}
  />
)

const FeatureHeading: React.FC<HeadingProps> = props => (
  <Heading as="h3" fontSize="6xl" mb={2} lineHeight={1} m={2} {...props} />
)

const FeatureText: React.FC<TextProps> = props => (
  <TextMuted fontSize="lg" mx={2} my={5} fontWeight="semibold" {...props} />
)

const FeatureAction: React.FC<
  ButtonProps & { children: string; href: string }
> = ({ href, children, ...buttonProps }) => (
  <NextLink href={href} passHref>
    <Button as="a" size="lg" colorScheme="blue" mx={2} my={1} {...buttonProps}>
      {children} <Icon ml={3} as={FaAngleRight} />
    </Button>
  </NextLink>
)

const Pricing: NextPage<{ prices: Price[] }> = ({ prices }) => {
  const [currency, setCurrency] = useState('usd')
  const [term, setTerm] = useState('monthly')

  const router = useRouter()
  const userData = useUserData()
  useEffect(() => {
    if (userData?.membership) router.push('/settings')
  }, [userData, router])

  return (
    <>
      <NextSeo
        title="Pricing"
        description="Find membership pricing information to access premium content."
      />
      <LayoutContainer>
        <PricingTitle />

        <CheckoutContext.Provider
          value={{ prices, currency, setCurrency, term, setTerm }}
        >
          <Flex
            alignItems="center"
            position="relative"
            direction={{ base: 'column', lg: 'row' }}
            mb={5}
          >
            <PricingMonthly />
            <PricingAnnually />
            <PricingLifetime />
          </Flex>
          <Center mb={16}>
            <TextMuted fontSize="xs">
              * Prices above is in USD. Click &quot;Start Learning&quot; to view
              prices in other currencies.
            </TextMuted>
          </Center>
        </CheckoutContext.Provider>

        <Box as="section" marginY={24}>
          <Feature>
            <SteamingGraphic w={400} flexShrink={0} />
            <Box m={12}>
              <FeatureHeading>
                Unlimited access to all{' '}
                <chakra.span
                  color={useColorModeValue('green.600', 'green.300')}
                >
                  courses
                </chakra.span>
                .
              </FeatureHeading>
              <FeatureText>
                Whether you’re a beginner or experienced developer, you
                comprehensive courses will help you gain the practical skills
                required as a software developer.
              </FeatureText>

              <FeatureAction href="/courses" colorScheme="green">
                View Courses
              </FeatureAction>
            </Box>
          </Feature>
        </Box>

        <Box as="section" marginY={24}>
          <Feature direction={{ base: 'column-reverse', lg: 'row' }}>
            <Box m={12} textAlign="right">
              <FeatureHeading>
                Learn with other{' '}
                <chakra.span
                  color={useColorModeValue('purple.600', 'purple.300')}
                >
                  developers
                </chakra.span>
                .
              </FeatureHeading>
              <FeatureText>
                Whether you’re a beginner or experienced developer, ou
                comprehensive courses will help you gain the practical skills
                required as a software developer.
              </FeatureText>

              <FeatureAction href="/discord" colorScheme="purple">
                Join Discord
              </FeatureAction>
            </Box>
            <NetworkGraphic w={425} m={5} flexShrink={0} />
          </Feature>
        </Box>

        <Box as="section" marginY={24}>
          <Feature>
            <DownloadGraphic w={400} m={5} flexShrink={0} />
            <Box m={12}>
              <FeatureHeading>
                <chakra.span color={useColorModeValue('blue.600', 'blue.300')}>
                  Download
                </chakra.span>{' '}
                content for offline learning.
              </FeatureHeading>
              <FeatureText>
                Whether you’re a beginner or experienced developer, ou
                comprehensive courses will help you gain the practical skills
                required as a software developer.
              </FeatureText>

              <FeatureAction href="/pricing" colorScheme="blue">
                Become a member
              </FeatureAction>
            </Box>
          </Feature>

          <Box as="section" marginY={48}>
            <Heading as="h2" textAlign="center" fontSize="5xl" mb={10}>
              What are you waiting for?
            </Heading>
            <Flex
              alignItems="center"
              position="relative"
              direction={{ base: 'column', lg: 'row' }}
              mb={16}
            >
              <PricingMonthly />
              <PricingAnnually />
              <PricingLifetime />
            </Flex>
          </Box>
        </Box>
      </LayoutContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps<{ prices: Price[] }> = async () => {
  const prices = await getMembershipPrices()
  return { props: { prices } }
}

export default Pricing
