import {
  Image,
  Box,
  Container,
  Flex,
  Heading,
  Text,
  IconButton
} from '@chakra-ui/react'

import { LayoutNavbarFooter } from '../../components/Layout'
import React from 'react'
import { FaDiscord, FaGithub, FaTwitter, FaYoutube } from 'react-icons/fa'
import { YouTubeVideo } from '../../components/Youtube'

const Index = () => {
  return (
    <LayoutNavbarFooter>
      <Container maxW="7xl" my={10}>
        <Heading as="h1" mb={4}>
          3 Steps to building software
        </Heading>

        <Box flexGrow={1} rounded="md" shadow="md" bg="gray.700">
          <YouTubeVideo id={'OZj1eHecLd8'} />
          <Flex m={5}>
            <Image
              flexShrink={0}
              rounded="full"
              mr={5}
              src={
                'https://yt3.ggpht.com/ytc/AAUvwnjRLyTU3teRL40o0yGEKAIp7fdv3H83gSv6r8zVYw=s48-c-k-c0x00ffffff-no-rj'
              }
            />
            <Box flexGrow={1}>
              <Text fontSize="lg" fontWeight="bold" letterSpacing="wide">
                Justin Brooks
              </Text>
              <Text>May 3, 2021</Text>
            </Box>
            <Box>
              <IconButton
                as="a"
                size="lg"
                fontSize="1.5em"
                variant="ghost"
                aria-label="GitHub"
                icon={<FaGithub />}
              />
              <IconButton
                as="a"
                size="lg"
                fontSize="1.5em"
                variant="ghost"
                colorScheme="red"
                aria-label="Youtube"
                icon={<FaYoutube />}
              />
              <IconButton
                as="a"
                size="lg"
                fontSize="1.5em"
                variant="ghost"
                colorScheme="purple"
                aria-label="GitHub"
                icon={<FaDiscord />}
              />
              <IconButton
                as="a"
                size="lg"
                fontSize="1.5em"
                variant="ghost"
                colorScheme="twitter"
                aria-label="Twitter"
                icon={<FaTwitter />}
              />
            </Box>
          </Flex>
        </Box>
      </Container>
    </LayoutNavbarFooter>
  )
}

export default Index
