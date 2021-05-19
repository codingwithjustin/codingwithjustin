import { contentThumbnail, formatPublishedAt } from '@/content'
import { useUserData } from '@/firebase'
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Icon,
  useColorModeValue,
  VStack,
  Image,
  Text,
  Flex,
  BoxProps,
  Heading,
  SimpleGrid,
  AccordionItem,
  AccordionPanel,
  Spacer
} from '@chakra-ui/react'
import { Content, Course } from '@shared/firestore'
import React from 'react'
import { Card } from '../Card'
import { ContentFakeThumbnail } from './ContentThumbnail'
import NextLink from 'next/link'
import { FaCheck, FaLock } from 'react-icons/fa'
import { YouTubeVideo } from '../Youtube'
import { ContentTag } from './ContentCard'
import {
  DiscordButton,
  GitHubPersonalButton,
  TwitterButton,
  YoutubeButton
} from '../SocialMedia'
import {
  CourseFreeTag,
  CourseSecondsTag,
  CourseToc,
  CourseTocContentButton,
  CourseTocSection
} from '../Courses'
import { formatSeconds } from '@/utils'

const VideoPaywall: React.FC<{ content: Content }> = props => {
  const { content } = props
  const thumbnail = contentThumbnail(content)
  const premiumOverlays = useColorModeValue('whiteAlpha.700', 'blackAlpha.800')
  return (
    <AspectRatio ratio={16 / 9} rounded="md" top={0} left={0}>
      <Box position="relative">
        {thumbnail == null ? (
          <ContentFakeThumbnail content={content} />
        ) : (
          <Image roundedTopLeft="md" roundedTopRight="md" src={thumbnail} />
        )}
        <Center
          bgColor={premiumOverlays}
          roundedTopLeft="md"
          roundedTopRight="md"
          w="full"
          h="full"
          position="absolute"
        >
          <VStack spacing={5}>
            <Icon as={FaLock} fontSize="8rem" color="green.500" />
            <NextLink href="/pricing" passHref>
              <Button as="a" colorScheme="green" size="lg">
                Become a member
              </Button>
            </NextLink>
          </VStack>
        </Center>
      </Box>
    </AspectRatio>
  )
}

export const ContentPageCard: React.FC<{
  content: Content
  descriptionHeader?: React.ReactNode
}> = ({ content, descriptionHeader }) => {
  const { type, premium } = content
  const { hasAccess } = useUserData()
  return (
    <Card>
      <Box position="relative">
        {premium && !hasAccess(content) ? (
          <>{type == 'video' && <VideoPaywall content={content} />}</>
        ) : (
          <>
            {'youtubeId' in content &&
              typeof content.youtubeId === 'string' && (
                <YouTubeVideo id={content.youtubeId} />
              )}

            {content.thumbnail == null && content.type == 'video' && (
              <AspectRatio ratio={16 / 9}>
                <ContentFakeThumbnail
                  roundedTopLeft="md"
                  roundedTopRight="md"
                  content={content}
                />
              </AspectRatio>
            )}
          </>
        )}
      </Box>

      <Box p={5}>
        {descriptionHeader}
        <Text fontSize="lg" noOfLines={4}>
          {content.description}
        </Text>

        <Box my={5}>
          {content.tags.map(t => (
            <ContentTag key={t}>{t}</ContentTag>
          ))}
        </Box>

        <Flex pt={2}>
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
            <Text>{formatPublishedAt(content)}</Text>
          </Box>
          <Box>
            <GitHubPersonalButton size="lg" />
            <YoutubeButton size="lg" />
            <DiscordButton size="lg" />
            <TwitterButton size="lg" />
          </Box>
        </Flex>
      </Box>
    </Card>
  )
}

export const ContentPageWhatYoullLearn: React.FC<
  BoxProps & { learn: string[] }
> = ({ learn, ...props }) => {
  return (
    <Box as="section" my={12} {...props}>
      <Heading as="h2" mb={5}>
        What you&lsquo;ll learn
      </Heading>

      <SimpleGrid
        p={5}
        px={6}
        mt={2}
        rounded="md"
        borderWidth="1px"
        columns={2}
        spacing={3}
      >
        {learn.map(c => (
          <Flex key={c}>
            <Icon as={FaCheck} color="green.200" mt={1} />
            <Text ml={4}>{c}</Text>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export const ContentPageCourseToc: React.FC<{ content: Course }> = ({
  content
}) => {
  return (
    <Box as="section" my={12}>
      <Heading as="h2" mb={5}>
        Content
      </Heading>
      <CourseToc rounded="md" borderWidth="1px">
        {content.children.map((s, i) => (
          <AccordionItem
            key={i}
            borderBottomWidth="0 !important"
            borderTopWidth={i === 0 ? 0 : 1}
          >
            <CourseTocSection section={s}></CourseTocSection>
            <AccordionPanel>
              {s.content.map(c => (
                <CourseTocContentButton
                  content={{ ...c, course: content, section: s }}
                  key={c.slug}
                >
                  <Text mx={3} isTruncated>
                    {c.title}
                  </Text>
                  <Spacer />
                  {!c.premium && <CourseFreeTag />}
                  {c.type === 'video' && (
                    <CourseSecondsTag>
                      {formatSeconds(c.seconds)}
                    </CourseSecondsTag>
                  )}
                </CourseTocContentButton>
              ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </CourseToc>
    </Box>
  )
}
