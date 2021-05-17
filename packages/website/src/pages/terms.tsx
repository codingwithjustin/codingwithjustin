import { LayoutContainer } from '@/components/Layout'
import {
  Heading,
  HeadingProps,
  Link,
  ListItem,
  Text,
  TextProps,
  UnorderedList,
  useColorModeValue
} from '@chakra-ui/react'
import { NextPage } from 'next'

import React from 'react'
import NextLink from 'next/link'

const H1: React.FC<HeadingProps> = props => (
  <Heading
    as="h1"
    fontSize="5xl"
    mb={2}
    letterSpacing="wide"
    mt={5}
    {...props}
  />
)

const H2: React.FC<HeadingProps> = props => (
  <Heading
    as="h2"
    fontSize="3xl"
    letterSpacing="wide"
    mt={6}
    mb={2}
    {...props}
  />
)

const H3: React.FC<HeadingProps> = props => (
  <Heading
    as="h3"
    fontSize="xl"
    mt={4}
    letterSpacing="wide"
    mb={2}
    {...props}
  />
)

const Paragraph: React.FC<TextProps> = props => (
  <Text fontSize="lg" my={2} {...props} />
)

const Terms: NextPage = () => {
  const host = process.browser ? window?.location.host : 'codingwithjustin.com'
  const link = useColorModeValue('blue.500', 'blue.300')
  const settingsLink = (
    <NextLink href="/settings" passHref>
      <Link color={link}>settings</Link>
    </NextLink>
  )
  return (
    <LayoutContainer maxW="4xl">
      <H1>Terms</H1>
      <Paragraph>
        By accessing this web site, you are agreeing to be bound by these web
        site Terms and Conditions of Use, all applicable laws and regulations,
        and agree that you are responsible for compliance with any applicable
        local laws. If you do not agree with any of these terms, you are
        prohibited from using or accessing this site. The materials contained in
        this web site are protected by applicable copyright and trade mark law.
      </Paragraph>

      <H2>Memberships</H2>

      <H3>Billing</H3>
      <Paragraph>
        Subscription fees for the membership are recurring payments (except
        where identified as otherwise, such as the lifetime membership and
        single course purchases). The term may be monthly, quarterly, or annual,
        as described in the invoice of the transaction. Your subscription begins
        upon payment of a first installment of subscription fees. The
        subscription renews at the specified interval as applicable upon the
        payment of automatically recurring subscription fees. Monthly or annual
        fees are charged on the same day of the month that the subscription
        began.
      </Paragraph>

      <Paragraph>
        You can view information about your subscription in your profile{' '}
        {settingsLink}.
      </Paragraph>

      <H3>Cancellation</H3>
      <Paragraph>
        You can cancel your membership at any time. Options for canceling your
        membership can be found in your profile {settingsLink}.
      </Paragraph>

      <Paragraph>
        If you purchase a subscription that automatically renews, you may cancel
        the subscription any time before the end of the current billing period
        and your membership will be revoked at the end of its term. If you
        choose not to reactivate your subscription before the end of the term, a
        renewal will be subjected to current prices.
      </Paragraph>

      <H3>Refunds</H3>
      <Paragraph>
        We want you to be satisfied, so all membership purchases can be refunded
        within 10 days, for whatever reason.
      </Paragraph>
      <Paragraph>
        We reserve the right, in our sole discretion, to limit or deny refund
        requests in cases where we believe there is refund abuse, including but
        not limited to the following:
      </Paragraph>

      <Paragraph>
        <UnorderedList ml={10}>
          <ListItem>
            A significant portion of the membership has been consumed or
            downloaded by a student before the refund was requested.
          </ListItem>
          <ListItem>
            Excessive refunds have been requested by a student.
          </ListItem>
        </UnorderedList>
      </Paragraph>

      <Paragraph>
        These refund restrictions will be enforced to the extent permitted by
        applicable law.
      </Paragraph>

      <H3>Lapsed Payment</H3>
      <Paragraph>
        If payment for a subscription fails, the user account will be downgraded
        and granted a 7-day grace period to update the payment source. If a
        successful payment is not made within 7 days the membership will be
        fully canceled and renewal will be subject to current prices.
      </Paragraph>

      <H2>Disclaimer</H2>
      <Paragraph>
        The materials on the {host} web site are provided “as is”. {host} makes
        no warranties, expressed or implied, and hereby disclaims and negates
        all other warranties, including without limitation, implied warranties
        or conditions of merchantability, fitness for a particular purpose, or
        non-infringement of intellectual property or other violation of rights.
        Further, {host} does not warrant or make any representations concerning
        the accuracy, likely results, or reliability of the use of the materials
        on its Internet web site or otherwise relating to such materials or on
        any sites linked to this site.
      </Paragraph>

      <H2>Intellectual Property Rights</H2>
      <Paragraph>
        Any inquires regarding the reproduction of content on this site must be
        directed to the party holding the proprietary rights to the specified
        content.You shall not distribute, publish, transmit, modify, display or
        create derivative works from material obtained with this service.
      </Paragraph>
    </LayoutContainer>
  )
}

export default Terms
