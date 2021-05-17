import React from 'react'
import { Box, BoxProps, Divider, DividerProps, Text } from '@chakra-ui/react'

export const SettingsHeading: React.FC<
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

export const SettingsCard: React.FC<BoxProps> = props => {
  return <Box rounded="md" bgColor="gray.700" {...props} p={5} my={10} />
}

export const SettingsDivider: React.FC<DividerProps> = props => (
  <Divider my={3} {...props} />
)
