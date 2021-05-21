import { Box, BoxProps, Text, useColorModeValue } from '@chakra-ui/react'
import { Content } from '@shared/firestore'
import React from 'react'

export const ContentFakeThumbnail: React.FC<BoxProps & { content: Content }> =
  ({ content, ...boxProps }) => {
    return (
      <Box
        bgColor={useColorModeValue('gray.400', 'gray.900')}
        userSelect="none"
        textAlign="center"
        {...boxProps}
      >
        <Box
          m={10}
          px={3}
          py={2}
          bgColor={useColorModeValue('gray.200', 'gray.700')}
          rounded="md"
        >
          <Text noOfLines={4} fontWeight="bold" letterSpacing="wide">
            {content.title}
          </Text>
        </Box>
      </Box>
    )
  }
