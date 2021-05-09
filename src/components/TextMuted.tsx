import { Text, TextProps, useColorModeValue } from '@chakra-ui/react'

export const TextMuted: React.FC<TextProps> = props => {
  return <Text {...props} color={useColorModeValue('gray.600', 'gray.300')} />
}
