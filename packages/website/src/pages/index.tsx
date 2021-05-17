import React, { useEffect, useState } from 'react'
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
  chakra,
  Spacer
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
import { FaAngleRight, FaDiscord } from 'react-icons/fa'
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
import { AnimatePresence, motion } from 'framer-motion'

const MotionSpan = chakra(motion.div)

const AnimateText = ({ value }: { value: [string, string] }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <MotionSpan
        position="relative"
        display="inline"
        zIndex={10}
        color={`${value[1]}.400`}
        key={value[0]}
        transition="easeInOut"
        initial={{ opacity: 0, top: -10, scale: 0.95 }}
        animate={{ opacity: 1, top: 0, scale: 1 }}
        exit={{ opacity: 0, top: 10, scale: 0.95 }}
      >
        {value[0]}
      </MotionSpan>
    </AnimatePresence>
  )
}

const Hero: React.FC = () => {
  const switchTime = 5000
  const words: Array<[string, string]> = [
    ['design', 'green'],
    ['build', 'teal'],
    ['deploy', 'blue']
  ]

  const [index, setIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setIndex(index => index + 1), switchTime)
    return () => clearInterval(interval)
  }, [])

  const color = words[index % words.length][1]

  const headerEnding = useBreakpointValue({
    base: 'apps',
    lg: 'applications'
  })
  return (
    <Flex
      position="relative"
      direction={{ base: 'column', md: 'row' }}
      alignItems="center"
      textAlign={{ base: 'center', md: 'left' }}
    >
      <ProgressGraphic
        color={color}
        w={{ base: 'inherit', md: '4xl' }}
        maxW={{ base: 'xs', md: '4xl' }}
        m={{ base: 5, md: 0 }}
      />
      <Box
        top="47%"
        left="42%"
        position={{ base: 'relative', md: 'absolute' }}
        marginTop={{ base: 5, md: 0 }}
      >
        <Heading
          as="h1"
          w={{ base: 'inherit', md: 400, lg: 'inherit' }}
          fontSize={{ base: '4xl', sm: '6xl', md: '5xl' }}
        >
          Learn to <AnimateText value={words[index % words.length]} />
          <br />
          fullstack {headerEnding}.
        </Heading>
        <SearchInput
          inputGroup={{
            size: 'lg',
            mt: 5,
            w: { base: 'inherit', sm: 450, md: 'inherit' }
          }}
          input={{
            placeholder: 'What do you want to learn?',
            borderColor: `${color}.400`
          }}
        />
        <Box float={{ base: 'none', md: 'right' }} mt={2}>
          <YoutubeButton />
          <TwitterButton />
          <GitHubButton />
          <DiscordButton />
        </Box>
      </Box>
    </Flex>
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
      alignItems={{ base: 'center', md: 'normal' }}
      textAlign={{ base: 'center', md: 'left' }}
      m={{ base: 'auto', md: 0 }}
      maxW={{ base: 350, md: 'full' }}
      spacing={{ base: '3', md: '6' }}
      direction={{ base: 'column', md: 'row' }}
    >
      <Box fontSize="6xl">{icon}</Box>
      <Stack spacing="1">
        <Text fontWeight="bold" letterSpacing="wide" fontSize="xl">
          {title}
        </Text>
        <Box color={useColorModeValue('gray.600', 'gray.400')} fontSize="lg">
          {children}
        </Box>
      </Stack>
    </Stack>
  )
}

const Index: NextPage<ContentTabsProps> = props => {
  return (
    <LayoutContainer maxWidth="6xl">
      <Box as="section">
        <Hero />
      </Box>

      <Box as="section" marginY={{ base: 16, md: 28 }}>
        <SimpleGrid
          columns={{ base: 0, md: 3 }}
          rows={{ base: 3, md: 0 }}
          spacingX={10}
          spacingY={10}
        >
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
        <Box mb={5} ml={3} textAlign={{ base: 'center', md: 'left' }}>
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

      <Box as="section" marginY={28}>
        <Flex
          rounded="md"
          bgColor="discord"
          p={10}
          direction={{ base: 'column', md: 'row' }}
          alignItems="center"
          boxShadow="md"
          color="white"
          textAlign={{ base: 'center', md: 'left' }}
        >
          <Icon as={FaDiscord} fontSize="6xl" />
          <Box mx={{ base: 4, md: 10 }} my={{ base: 5, md: 0 }}>
            <Heading fontSize="2xl">Connect with the community</Heading>
            <Text>
              Feel free to ask questions, talk about software, and meet new
              people.
            </Text>
          </Box>
          <Spacer />
          <Button flexShrink={0} size="lg" py={7} fontWeight="extrabold">
            Join #CWJ Discord
          </Button>
        </Flex>
      </Box>

      <Box as="section" marginY={48}>
        <Flex
          alignItems="center"
          position="relative"
          direction={{ base: 'column', lg: 'row' }}
          textAlign={{ base: 'center', lg: 'left' }}
        >
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
          <DevelopmentGraphic
            position={{ base: 'relative', lg: 'absolute' }}
            right={0}
            w={{ base: 'inherit', md: 550 }}
            m={{ base: 10, lg: 3 }}
          />
        </Flex>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          rows={{ base: 6, md: 3, lg: 2 }}
          spacing={10}
          marginY={{ base: 10, md: 20, lg: 40 }}
        >
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
        <Flex
          alignItems="center"
          direction={{ base: 'column', md: 'row' }}
          textAlign={{ base: 'center', md: 'left' }}
        >
          <Box>
            <Image
              rounded="full"
              alt="Justin Brooks"
              src="/headshot.png"
              w={{ base: 250, sm: 300, md: 450 }}
            />
            <Center mt={2}>
              <TwitterButton />
              <LinkedinPersonalButton />
              <GitHubPersonalButton />
            </Center>
          </Box>
          <Box fontSize="xl" m={{ base: 5, md: 0 }} mx={{ md: 10 }}>
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
