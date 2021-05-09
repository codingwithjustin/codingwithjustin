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
  Avatar,
  IconButton,
  Image
} from '@chakra-ui/react'

import { LayoutContainer } from '../components/Layout'
import { SearchInput } from '../components/SearchInput'
import { DevelopmentGraphic, ProgressGraphic } from '../components/LogicGraphic'
import { Membership } from '../components/Banners'
import {
  FcComments,
  FcCommandLine,
  FcGraduationCap,
  FcApproval,
  FcDownload,
  FcInfo,
  FcOrgUnit,
  FcCollaboration,
  FcBusinessman,
  FcTemplate
} from 'react-icons/fc'
import { YouTubeVideo } from '../components/Youtube'
import {
  FaAngleRight,
  FaCaretRight,
  FaCentercode,
  FaGithub,
  FaQuoteLeft,
  FaTwitter,
  FaYoutube
} from 'react-icons/fa'
import { ContentTabs } from '../components/ContentTabs'
import { NextPage } from 'next'
import { TextMuted } from '../components/TextMuted'

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
          <IconButton
            as="a"
            href="#"
            variant="ghost"
            aria-label="GitHub"
            color="gray.500"
            icon={<FaGithub fontSize="20px" />}
          />
          <IconButton
            as="a"
            href="#"
            variant="ghost"
            aria-label="Youtube"
            color="gray.500"
            icon={<FaYoutube fontSize="20px" />}
          />
          <IconButton
            as="a"
            href="#"
            variant="ghost"
            aria-label="GitHub"
            color="gray.500"
            icon={<FaTwitter fontSize="20px" />}
          />
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

const Index: NextPage = () => {
  return (
    <LayoutContainer maxWidth="6xl">
      <Hero />

      <Box as="section" mt={20}>
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

      <Box as="section" marginY={20}>
        <Box mb={5}>
          <Heading as="h2" mb={2}>
            Get started learning for free.
          </Heading>
          <TextMuted>
            Choose from hours worth of video with new additions published every
            week.
          </TextMuted>
        </Box>
        <ContentTabs />
      </Box>

      <Box as="section" marginY={48}>
        <Flex alignItems="center" position="relative">
          <Box>
            <Heading as="h3" fontSize="6xl" mb={2} lineHeight={1} m={2}>
              Become a{' '}
              <Text as="span" color="blue.300">
                member
              </Text>
              !
            </Heading>
            <TextMuted fontSize="lg" fontWeight="bold" m={2}>
              Gain access to premium content.
            </TextMuted>
            <Button size="lg" colorScheme="blue" m={2}>
              Get Started Now <Icon ml={3} as={FaAngleRight} />
            </Button>
          </Box>
          <DevelopmentGraphic position="absolute" right={0} w={550} m={3} />
        </Flex>

        <SimpleGrid columns={3} rows={2} spacing={10} marginY={40}>
          <Feature title="Learn to Code" icon={<FcInfo />}>
            We have a discord channel where you can chat and learn with others.
          </Feature>
          <Feature title="Get hired" icon={<FcBusinessman />}>
            Code written in videos are free and accessible on Github.
          </Feature>
          <Feature title="Add to your portfolio" icon={<FcTemplate />}>
            Learn to build complex, professional, real-world projects.
          </Feature>

          <Feature title="Private Discord Channel" icon={<FcCollaboration />}>
            Learn to build complex, professional, real-world projects.
          </Feature>
          <Feature title="Access to all future courses" icon={<FcApproval />}>
            Learn to build complex, professional, real-world projects.
          </Feature>
          <Feature title="Download for offline learning" icon={<FcDownload />}>
            Learn to build complex, professional, real-world projects.
          </Feature>
        </SimpleGrid>
      </Box>

      <Box as="section" marginY={48}>
        <Flex alignItems="center">
          <Image rounded="full" src="/headshot.png" w={450} />
          <Box fontSize="xl" ml={10} mt={-4}>
            <Heading as="h4" fontSize="5xl" mt={2}>
              Hi there, I'm Justin Brooks.
            </Heading>
            <Text mt={1}>Hi there, I'm Justin Brooks.</Text>
            <Text>
              By joining the Zero To Mastery Academy and putting in the work,
              you’ll have the opportunity to take control of your life, work in
              an exciting industry with infinite possibilities and live the life
              you want.
            </Text>
          </Box>
        </Flex>
      </Box>
    </LayoutContainer>
  )
}

export default Index
