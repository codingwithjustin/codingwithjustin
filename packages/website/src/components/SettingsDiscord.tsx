import { useAuthState, useUserData } from '@/firebase'
import { Avatar, Box, Button, Code, Flex, Spacer, Text } from '@chakra-ui/react'
import { UsersDiscord } from '@shared/firestore'
import React from 'react'
import { SettingsCard, SettingsDivider, SettingsHeading } from './Settings'
import { TextMuted } from './TextMuted'

export const DiscordInfo: React.FC<{ discord: UsersDiscord }> = ({
  discord
}) => {
  const avatarUrl = `https://cdn.discordapp.com/avatars/${discord.id}/${discord.avatar}.png`
  return (
    <Flex alignItems="center">
      <Avatar src={avatarUrl} />
      <Box ml={3}>
        <Text fontSize="lg" fontWeight="bold">
          {discord.username}
        </Text>
        <TextMuted>{discord.id}</TextMuted>
      </Box>
      <Spacer />
      <Button>Unlink</Button>
    </Flex>
  )
}

export const SettingsDiscord: React.FC = () => {
  const { user } = useAuthState()
  const userData = useUserData()
  if (userData == null || user == null) {
    return <div></div>
  }
  return (
    <SettingsCard>
      <SettingsHeading
        title="Discord"
        description="Link your discord account with your website account."
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
        <DiscordInfo discord={userData.discord} />
      )}
    </SettingsCard>
  )
}
