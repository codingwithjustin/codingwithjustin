import React from 'react'
import { NextPage } from 'next'
import { LayoutContainer } from '../components/Layout'
import { Avatar, Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { useAuthState, useUserData } from '@/firebase'
import {
  SettingsCard,
  SettingsDivider,
  SettingsHeading
} from '@/components/Settings'
import { SettingsMembership } from '@/components/SettingsMembership'
import { SettingsDiscord } from '@/components/SettingsDiscord'

const Settings: NextPage = () => {
  const { user } = useAuthState()
  const userData = useUserData()

  if (userData == null || user == null) return null

  return (
    <LayoutContainer>
      <Flex alignItems="center" mb={5}>
        <Avatar src={user?.photoURL ?? undefined} size="xl" />
        <Box ml={5}>
          <Heading as="h1">{user?.displayName}</Heading>
          <Text fontSize="lg">{user?.email}</Text>
        </Box>
      </Flex>

      <SettingsMembership />
      <SettingsDiscord />

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
