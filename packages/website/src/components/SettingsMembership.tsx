import {
  cancelSubscription,
  getUserSubscription,
  SubscriptionResponse,
  useUserData
} from '@/firebase'
import React, { useEffect, useState } from 'react'
import { SettingsCard, SettingsDivider, SettingsHeading } from './Settings'
import NextLink from 'next/link'
import {
  Box,
  Button,
  Center,
  chakra,
  SimpleGrid,
  Spinner,
  Text
} from '@chakra-ui/react'
import { TextMuted } from './TextMuted'
import { formatMoney, formatTimestamp } from '@/utils'

const useStripeSubscription = () => {
  const userData = useUserData()
  const [subscription, setSubscription] = useState<SubscriptionResponse>()
  const hasSubscription = userData?.membership?.subscriptionId != null
  const [loading, setLoading] = useState(false)

  const loadSubscription = async () => {
    const s = await getUserSubscription()
    setSubscription(s.data)
  }

  useEffect(() => {
    hasSubscription ? loadSubscription() : setSubscription(undefined)
  }, [hasSubscription])

  const deactivate = async () => {
    setLoading(true)
    await cancelSubscription({ cancelAtPeriodEnd: true })
    await loadSubscription()
    setLoading(false)
  }
  const activate = async () => {
    setLoading(true)
    await cancelSubscription({ cancelAtPeriodEnd: false })
    await loadSubscription()
    setLoading(false)
  }
  const cancelImmediately = async () => {
    setLoading(true)
    await cancelSubscription({ immediately: true })
    await loadSubscription()
    setLoading(false)
  }

  return {
    subscription,
    hasSubscription,
    deactivate,
    activate,
    cancelImmediately,
    loading
  }
}

const statusColor: Record<string, any> = {
  active: 'green.300',
  unpaid: 'red.300',
  paid_due: 'red.300',
  trialing: 'white',
  canceled: 'gray.300'
}

const SubscriptionInfo: React.FC<{ subscription: SubscriptionResponse }> = ({
  subscription
}) => {
  return (
    <>
      <Text>
        Your account has a {subscription.plan.interval}ly subscription.
      </Text>

      <SimpleGrid columns={3} my={5}>
        <Box>
          <Text>Current Period</Text>
          <Text fontWeight="bold" fontSize="lg">
            {formatTimestamp(subscription.current_period_start)} -{' '}
            {formatTimestamp(subscription.current_period_end)}
          </Text>
        </Box>

        <Box>
          <Text>Recurring Fee</Text>
          <Text fontWeight="bold" fontSize="xl">
            {formatMoney(subscription.plan.amount, subscription.plan.currency)}{' '}
            / {subscription.plan.interval}
          </Text>
        </Box>
        <Box>
          <Text>Status</Text>
          <Text
            fontWeight="bold"
            fontSize="xl"
            color={statusColor[subscription.status]}
          >
            {subscription.status.toUpperCase().replace('_', '   ')}
          </Text>
        </Box>
      </SimpleGrid>

      {subscription.cancel_at_period_end && (
        <Text color="red.400">
          Your subscription will end on{' '}
          <chakra.span fontWeight="bold">
            {formatTimestamp(subscription.current_period_end)}
          </chakra.span>
          .
        </Text>
      )}
    </>
  )
}

export const SettingsMembership: React.FC = () => {
  const { hasSubscription, subscription, deactivate, activate, loading } =
    useStripeSubscription()
  const userData = useUserData()

  if (userData == null) return null

  return (
    <SettingsCard>
      <SettingsHeading
        title="Membership"
        description="Cancel update or get information about your subscription."
      />
      <SettingsDivider />

      {userData.membership == null && (
        <>
          <Text fontSize="lg" fontWeight="bold">
            Becoming a member and gain access to premium content.
          </Text>

          <NextLink href="/pricing" passHref>
            <Button as="a" my={3} colorScheme="green" variant="solid">
              Learn more
            </Button>
          </NextLink>

          <TextMuted>
            If you just purchased a membership it may take a few minutes to show
            here. Contact Justin at jsbroks@gmail.com if have any issues.
          </TextMuted>
        </>
      )}

      {userData.membership?.type === 'lifetime' && (
        <Box fontSize="lg" fontWeight="bold">
          You have a lifetime membership!
        </Box>
      )}

      {hasSubscription && subscription == null && (
        <Center h={200}>
          <Spinner size="lg" />
        </Center>
      )}

      {subscription && (
        <>
          <SubscriptionInfo subscription={subscription} />

          <SettingsDivider />
          <Button mr={2} colorScheme="purple">
            Update Payment
          </Button>
          <Button mr={2} colorScheme="blue">
            Change Plan
          </Button>
          {subscription.cancel_at_period_end ? (
            <Button
              colorScheme="green"
              variant="ghost"
              onClick={activate}
              isLoading={loading}
              mr={2}
            >
              Reactivate Subscription
            </Button>
          ) : (
            <Button
              variant="ghost"
              colorScheme="red"
              onClick={deactivate}
              isLoading={loading}
            >
              Cancel Subscription
            </Button>
          )}
        </>
      )}
    </SettingsCard>
  )
}
