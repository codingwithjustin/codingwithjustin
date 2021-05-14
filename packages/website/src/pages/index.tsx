import React from 'react'
import {
  Box,
  Center,
  Heading,
  useBreakpointValue,
  useColorModeValue,
  SimpleGrid,
  Stack,
  Text,
  Button,
  Flex,
  Icon,
  Image,
  chakra
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { LayoutContainer } from '../components/Layout'
import { SearchInput } from '../components/SearchInput'
import { DevelopmentGraphic, ProgressGraphic } from '../components/Graphics'
import {
  FcComments,
  FcCommandLine,
  FcGraduationCap,
  FcApproval,
  FcDownload,
  FcInfo,
  FcCollaboration,
  FcBusinessman,
  FcTemplate
} from 'react-icons/fc'
import { FaAngleRight } from 'react-icons/fa'
import { ContentTabs, ContentTabsProps } from '@/components/content/ContentTabs'
import { GetStaticProps, NextPage } from 'next'
import { TextMuted } from '../components/TextMuted'
import {
  DiscordButton,
  GitHubButton,
  GitHubPersonalButton,
  LinkedinPersonalButton,
  TwitterButton,
  YoutubeButton
} from '../components/SocialMedia'
import { ContentFilter } from '@/content'

const Hero: React.FC = () => {
  const header = useBreakpointValue({
    base: 'Learn to build fullstack apps.',
    md: 'Learn to build fullstack applications.'
  })
  const showGraphic = useBreakpointValue({ base: false, md: true })
  return (
    <Center position="relative">
      {showGraphic && <ProgressGraphic w="4xl" />}
      <Box
        top={{ md: '47%' }}
        left={{ md: '42%' }}
        maxW={550}
        position={{ sm: 'relative', md: 'absolute' }}
        marginTop={0}
      >
        <Heading as="h1" fontSize={{ base: '4xl', lg: '5xl' }}>
          {header}
        </Heading>
        <SearchInput
          inputGroup={{ size: 'lg', mt: 5 }}
          input={{
            placeholder: 'What do you want to learn?',
            borderColor: 'green.500'
          }}
        />
        <Box float="right" mt={2}>
          <YoutubeButton />
          <TwitterButton />
          <GitHubButton />
          <DiscordButton />
        </Box>
      </Box>
    </Center>
  )
}

interface FeatureProps {
  title: string
  children: React.ReactNode
  icon: React.ReactElement
}

const Feature: React.FC<FeatureProps> = props => {
  const { title, children, icon } = props
  return (
    <Stack
      spacing={{ base: '3', md: '6' }}
      direction={{ base: 'column', md: 'row' }}
    >
      <Box fontSize="6xl">{icon}</Box>
      <Stack spacing="1">
        <Text fontWeight="bold" letterSpacing="wide" fontSize="xl">
          {title}
        </Text>
        <Box color={useColorModeValue('gray.600', 'gray.400')}>{children}</Box>
      </Stack>
    </Stack>
  )
}

const Index: NextPage<ContentTabsProps> = props => {
  return (
    <LayoutContainer maxWidth="6xl">
      <Hero />

      <Box as="section" marginY={28}>
        <SimpleGrid columns={3} spacingX={10}>
          <Feature title="Discord Community" icon={<FcComments />}>
            We have a discord channel where you can chat and learn with others.
          </Feature>

          <Feature title="Open Source" icon={<FcCommandLine />}>
            Code written in videos are free and accessible on Github.
          </Feature>

          <Feature title="Education for Free" icon={<FcGraduationCap />}>
            Free resources for developers to build high-quality applications.
          </Feature>
        </SimpleGrid>
      </Box>

      <Box as="section" marginY={28}>
        <Box mb={5} ml={3}>
          <Heading as="h2" mb={2}>
            Get started learning for free.
          </Heading>
          <TextMuted>
            Choose from hours worth of video with new additions published every
            week.
          </TextMuted>
        </Box>
        <ContentTabs {...props} />
      </Box>

      <Box as="section" marginY={48}>
        <Flex alignItems="center" position="relative">
          <Box>
            <Heading as="h3" fontSize="6xl" mb={2} lineHeight={1} m={2}>
              Become a{' '}
              <Text as="span" color={useColorModeValue('blue.600', 'blue.300')}>
                member
              </Text>
              !
            </Heading>
            <TextMuted fontSize="lg" fontWeight="bold" m={2}>
              Gain access to premium content.
            </TextMuted>
            <NextLink href="/pricing">
              <Button size="lg" colorScheme="blue" m={2}>
                Membership plans <Icon ml={3} as={FaAngleRight} />
              </Button>
            </NextLink>
          </Box>
          <DevelopmentGraphic position="absolute" right={0} w={550} m={3} />
        </Flex>

        <SimpleGrid columns={3} rows={2} spacing={10} marginY={40}>
          <Feature title="Learn to Code" icon={<FcInfo />}>
            Learn from high quality and engaging videos.
          </Feature>
          <Feature title="Get hired" icon={<FcBusinessman />}>
            Gain the knowledge, confidence, experience you need.
          </Feature>
          <Feature title="Add to your portfolio" icon={<FcTemplate />}>
            Learn to build complex, professional, real-world projects.
          </Feature>

          <Feature title="Private Discord Channel" icon={<FcCollaboration />}>
            Join a private discord channel to learn with others.
          </Feature>
          <Feature title="Access to all future courses" icon={<FcApproval />}>
            Access updates and future videos as we release them.
          </Feature>
          <Feature title="Download for offline learning" icon={<FcDownload />}>
            Learn anywhere, even offline.
          </Feature>
        </SimpleGrid>
      </Box>

      <Box as="section" marginY={48}>
        <Flex alignItems="center">
          <Box>
            <Image rounded="full" src="/headshot.png" w={450} />
            <Center mt={2}>
              <TwitterButton />
              <LinkedinPersonalButton />
              <GitHubPersonalButton />
            </Center>
          </Box>
          <Box fontSize="xl" ml={10}>
            <Heading as="h4" fontSize="5xl" mt={2}>
              Hi there, I&lsquo;m{' '}
              <chakra.span color="purple.300">Justin Brooks</chakra.span>.
            </Heading>
            <Text>
              My goal is to make learning software engaging, easy and quick.
              Content I create is short and to the point. If you enjoy my work,
              consider becoming a member and gaining access to premium content.
            </Text>
          </Box>
        </Flex>
      </Box>
    </LayoutContainer>
  )
}

export const getStaticProps: GetStaticProps<ContentTabsProps> = async () => {
  const content = await ContentFilter.content()

  const hasTag = (tag: string) => content.clone().hasTag(tag).first(10).get()

  return {
    props: {
      latest: content.clone().first(10).get(),
      vue: hasTag('vue'),
      javascript: hasTag('javascript'),
      react: hasTag('react')
    }
  }
}

export default Index
