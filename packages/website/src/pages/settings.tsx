import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { LayoutContainer } from '../components/Layout'
import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Center,
  Code,
  Divider,
  DividerProps,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Spinner,
  Text
} from '@chakra-ui/react'
import NextLink from 'next/link'
import {
  getUserSubscription,
  SubscriptionResponse,
  useAuthState,
  useUserData
} from '@/firebase'
import { formatMoney, formatTimestamp } from '@/utils'
import { TextMuted } from '@/components/TextMuted'

const SettingsHeading: React.FC<
  BoxProps & { title: string; description: string }
> = ({ title, description, ...boxProps }) => {
  return (
    <Box {...boxProps}>
      <Text fontSize="2xl" fontWeight="bold">
        {title}
      </Text>
      <Text>{description}</Text>
    </Box>
  )
}

const SettingsCard: React.FC<BoxProps> = props => {
  return <Box rounded="md" bgColor="gray.700" {...props} p={5} my={10} />
}

const SettingsDivider: React.FC<DividerProps> = props => (
  <Divider my={3} {...props} />
)

const Settings: NextPage = () => {
  const { user } = useAuthState()
  const userData = useUserData()
  const [subscription, setSubscription] = useState<SubscriptionResponse>()
  const hasSubscription = userData?.membership?.subscriptionId != null
  useEffect(() => {
    hasSubscription
      ? getUserSubscription().then(s => setSubscription(s.data))
      : setSubscription(undefined)
  }, [hasSubscription])

  if (userData == null || user == null) {
    return <div></div>
  }
  return (
    <LayoutContainer>
      <Flex alignItems="center" mb={5}>
        <Avatar src={user?.photoURL ?? undefined} size="xl" />
        <Box ml={5}>
          <Heading as="h1">{user?.displayName}</Heading>
          <Text fontSize="lg">{user?.email}</Text>
        </Box>
      </Flex>

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
              If you just purchased a membership it may take a few minutes to
              show here. Contact Justin at jsbroks@gmail.com if have any issues.
            </TextMuted>
          </>
        )}

        {userData.membership?.type === 'lifetime' && (
          <Box fontSize="lg" fontWeight="bold">
            You have a lifetime membership!
          </Box>
        )}

        {hasSubscription && subscription == null && (
          <Center h={300}>
            <Spinner size="lg" />
          </Center>
        )}

        {subscription && (
          <>
            <Text>
              You account has a {subscription.plan.interval}ly subscription.
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
                  {formatMoney(
                    subscription.plan.amount,
                    subscription.plan.currency
                  )}
                  / {subscription.plan.interval}
                </Text>
              </Box>
              <Box>
                <Text>Status</Text>
                <Text fontWeight="bold" fontSize="xl">
                  {subscription.status}
                </Text>
              </Box>
            </SimpleGrid>

            <Divider my={3} />
            <Button mr={2} colorScheme="green">
              Change Plan
            </Button>
            <Button variant="ghost">Cancel Subscription</Button>
          </>
        )}
      </SettingsCard>

      <SettingsCard>
        <SettingsHeading
          title="Discord"
          description="Link your discord account with you website account."
        />
        <SettingsDivider />
        {userData.discord?.id == null ? (
          <Box>
            <Text fontSize="lg" fontWeight="bold" my={2}>
              You do not have a linked discord account.
            </Text>
            <Text>
              In the CWJ discord type{' '}
              <Code px={2} rounded="md">
                /link {user.email}
              </Code>
            </Text>
            {userData.membership && (
              <Text mt={2}>
                You will need to link your discord account to gain access to
                membership only channels.
              </Text>
            )}
          </Box>
        ) : (
          <Flex alignItems="center">
            <Avatar
              src={`https://cdn.discordapp.com/avatars/${userData.discord.id}/${userData.discord.avatar}.png`}
            />
            <Box ml={3}>
              <Text fontSize="lg" fontWeight="bold">
                {userData.discord.username}
              </Text>
              <TextMuted>{userData.discord.id}</TextMuted>
            </Box>
            <Spacer />
            <Button>Unlink</Button>
          </Flex>
        )}
      </SettingsCard>

      <SettingsCard>
        <SettingsHeading
          title="Delete Account"
          description="Deleting your account will also cancel your subscriptions."
        />
        <SettingsDivider />
        <Button colorScheme="red" isDisabled>
          Delete
        </Button>
      </SettingsCard>
    </LayoutContainer>
  )
}

export default Settings
