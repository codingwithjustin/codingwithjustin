import { Flex, FlexProps, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

export const ContentCarousel: React.FC<FlexProps> = props => {
  return (
    <Flex
      overflow="auto"
      css={{
        scrollbarColor: 'gray.400',
        '&::-webkit-scrollbar': {
          height: 10
        },
        '&::-webkit-scrollbar-thumb': {
          background: useColorModeValue(
            'var(--chakra-colors-gray-200)',
            'var(--chakra-colors-gray-600)'
          ),
          borderRadius: 'var(--chakra-radii-lg)'
        }
      }}
      {...props}
    ></Flex>
  )
}
