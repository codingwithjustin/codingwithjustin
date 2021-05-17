import React from 'react'
import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'

export const Card: React.FC<BoxProps> = props => (
  <Box
    rounded="md"
    shadow="md"
    bgColor={useColorModeValue('white', 'gray.700')}
    {...props}
  />
)
