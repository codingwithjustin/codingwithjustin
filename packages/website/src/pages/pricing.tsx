import React, { useEffect, useState } from 'react'
import {
  Flex,
  Heading,
  useColorModeValue,
  chakra,
  Box,
  Button,
  Icon,
  Center
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
          <Flex alignItems="center" position="relative" mb={5}>
            <PricingMonthly />
            <PricingAnnually />
            <PricingLifetime />
          </Flex>
          <Center mb={16}>
            <TextMuted fontSize="xs">
              * Price above is in USD. Click &quot;Start Learning&quot; to view
              prices in other currencies.
            </TextMuted>
          </Center>
        </CheckoutContext.Provider>

        <Box as="section" marginY={24}>
          <Flex alignItems="center">
            <SteamingGraphic w={400} flexShrink={0} />
            <Box m={12}>
              <Heading as="h3" fontSize="6xl" mb={2} lineHeight={1} m={2}>
                Unlimited access to all{' '}
                <chakra.span
                  color={useColorModeValue('green.600', 'green.300')}
                >
                  courses
                </chakra.span>
                .
              </Heading>
              <TextMuted fontSize="lg" fontWeight="bold" m={2}>
                Whether you’re a beginner or experienced developer, ou
                comprehensive courses will help you gain the practical skills
                required as a software developer.
              </TextMuted>

              <NextLink href="/courses">
                <Button size="lg" colorScheme="green" m={2}>
                  View Courses <Icon ml={3} as={FaAngleRight} />
                </Button>
              </NextLink>
            </Box>
          </Flex>
        </Box>

        <Box as="section" marginY={24}>
          <Flex alignItems="center">
            <Box m={12} textAlign="right">
              <Heading as="h3" fontSize="6xl" mb={2} lineHeight={1} m={2}>
                Learn with other{' '}
                <chakra.span
                  color={useColorModeValue('purple.600', 'purple.300')}
                >
                  developers
                </chakra.span>
                .
              </Heading>
              <TextMuted fontSize="lg" fontWeight="bold" m={2}>
                Whether you’re a beginner or experienced developer, ou
                comprehensive courses will help you gain the practical skills
                required as a software developer.
              </TextMuted>

              <NextLink href="/discord">
                <Button size="lg" colorScheme="purple" m={2}>
                  Join Discord <Icon ml={3} as={FaAngleRight} />
                </Button>
              </NextLink>
            </Box>

            <NetworkGraphic w={425} m={5} flexShrink={0} />
          </Flex>
        </Box>

        <Box as="section" marginY={24}>
          <Flex alignItems="center">
            <DownloadGraphic w={400} m={5} flexShrink={0} />
            <Box m={12}>
              <Heading as="h3" fontSize="6xl" mb={2} lineHeight={1} m={2}>
                <chakra.span color={useColorModeValue('blue.600', 'blue.300')}>
                  Download
                </chakra.span>{' '}
                content for offline learning.
              </Heading>
              <TextMuted fontSize="lg" fontWeight="bold" m={2}>
                Whether you’re a beginner or experienced developer, ou
                comprehensive courses will help you gain the practical skills
                required as a software developer.
              </TextMuted>

              <NextLink href="/pricing">
                <Button size="lg" colorScheme="blue" m={2}>
                  Become a member <Icon ml={3} as={FaAngleRight} />
                </Button>
              </NextLink>
            </Box>
          </Flex>

          <Box as="section" marginY={48}>
            <Heading as="h2" size="2xl" textAlign="center" mb={16}>
              Become a member!
            </Heading>
            <Flex alignItems="center" position="relative" mb={16}>
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
