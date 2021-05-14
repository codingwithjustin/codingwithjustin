import {
  Image,
  Box,
  Flex,
  Heading,
  Text,
  Textarea,
  Button,
  ModalBody,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  useColorModeValue
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { YouTubeVideo } from '@/components/Youtube'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ContentFilter } from '@/content'
import { Content } from '@shared/firestore'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { LayoutContainer } from '@/components/Layout'
import remark from 'remark'
import remarkMdx from 'remark-mdx'
import { useDocumentOnce } from '@/firebase/firestore'
import { getFirestore, setDoc } from '@firebase/firestore'
import { doc } from 'firebase/firestore'
import { useAuthState } from '@/firebase'
import {
  DiscordButton,
  GitHubPersonalButton,
  TwitterButton,
  YoutubeButton
} from '@/components/SocialMedia'
import { ContentTag } from '@/components/content/ContentCard'

const EditBody: React.FC<{ contentId: string }> = ({ contentId }) => {
  const contentDoc = doc(getFirestore(), 'content', contentId)
  const { value: content } = useDocumentOnce(contentDoc)
  const [body, setBody] = useState<string>()
  useEffect(() => {
    if (content != null && body == null) setBody(content.body)
  }, [content, body])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const onSave = () => {
    setDoc(contentDoc, { body }, { merge: true })
  }

  return (
    <>
      <Button onClick={onOpen} mt={2} isFullWidth colorScheme="green">
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              h="80vh"
            />
            <Button onClick={onSave}>Save</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

interface ContentPageProps {
  content: Content
  mdx: MDXRemoteSerializeResult
  headings: any[]
}

const ContentPage: NextPage<ContentPageProps> = ({
  content,
  mdx,
  headings
}) => {
  const { isAdmin } = useAuthState()
  const tocColor = useColorModeValue('black', 'green.200')
  const tocColorSecondary = useColorModeValue('gray.600', 'gray.200')

  const publishedAtDate = new Date(content.publishedAt * 1000)
  return (
    <LayoutContainer maxW="6xl">
      <Heading as="h1" mb={8} fontSize={{ base: '5xl', lg: '6xl' }}>
        {content.title}
      </Heading>

      <Flex>
        <Box flexGrow={1}>
          <Box
            rounded="md"
            shadow="md"
            bgColor={useColorModeValue('white', 'gray.700')}
          >
            {'youtubeId' in content &&
              typeof content.youtubeId === 'string' && (
                <YouTubeVideo id={content.youtubeId} />
              )}

            <Box p={5}>
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
                  <Text>
                    {publishedAtDate.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </Text>
                </Box>
                <Box>
                  <GitHubPersonalButton size="lg" />
                  <YoutubeButton size="lg" />
                  <DiscordButton size="lg" />
                  <TwitterButton size="lg" />
                </Box>
              </Flex>
            </Box>
          </Box>

          <Box as="section" py={12}>
            <MDXRemote {...mdx} />
          </Box>
        </Box>
        <Box w={350} flexShrink={0}>
          <Box ml={6} position="sticky" top={5}>
            <Box
              p={6}
              bgColor={useColorModeValue('white', 'gray.700')}
              boxShadow="sm"
              borderRadius="md"
            >
              <Text
                fontWeight="bold"
                fontSize="lg"
                color={tocColor}
                letterSpacing="wide"
                mb={4}
              >
                {content.title}
              </Text>
              {headings.map((h: any, i) => (
                <Text
                  key={i}
                  {...(h.depth == 1
                    ? {
                        color: tocColor,
                        mt: 3,
                        fontWeight: 'bold'
                      }
                    : {
                        ml: 2,
                        color: tocColorSecondary
                      })}
                >
                  {h.value}
                </Text>
              ))}
            </Box>

            {isAdmin && content.id && <EditBody contentId={content.id} />}
          </Box>
        </Box>
      </Flex>
    </LayoutContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const content = await ContentFilter.content()
  const slugs = content.map(c => c.slug)

  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<
  ContentPageProps,
  { slug: string }
> = async ({ params }) => {
  const all = await ContentFilter.content()
  const content = all.findBySlug(params?.slug ?? '')
  if (!content)
    throw new Error(`Could not find content with slug ${params?.slug}`)

  const { body } = content
  const mdx = await serialize(body)

  const structure: any = remark()
  const headings = structure
    .use(remarkMdx)
    .parse(body)
    .children.filter((f: any) => f.type === 'heading' && f.depth < 3)
    .map((h: any) => ({ ...h, ...(h.children?.[0] ?? {}) }))
  return { props: { content, mdx, headings } }
}

export default ContentPage
