import {
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
  useColorModeValue,
  BoxProps,
  HeadingProps,
  Tag
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ContentFilter, isCourse } from '@/content'
import { Content, Course } from '@shared/firestore'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { LayoutContainer } from '@/components/Layout'
import remark from 'remark'
import remarkMdx from 'remark-mdx'
import { useDocumentOnce } from '@/firebase/firestore'
import { getFirestore, setDoc } from '@firebase/firestore'
import { doc } from 'firebase/firestore'
import { useAuthState, useUserData } from '@/firebase'
import { NextSeo } from 'next-seo'
import { Card } from '@/components/Card'
import {
  ContentPageCard,
  ContentPageCourseToc,
  ContentPageWhatYoullLearn
} from '@/components/content/ContentPage'

const ProBanner: React.FC = () => {
  return (
    <Card borderColor="green.400" borderWidth={2} mb={6} p={6}>
      <Heading color="green.200" pb={0}>
        Membership
      </Heading>
      <Text fontSize="lg" my={5}>
        Become a member and gain access to premium content.
      </Text>
      <Button colorScheme="green">Learn more</Button>
    </Card>
  )
}

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
      <Button onClick={onOpen} mt={2} isFullWidth colorScheme="blue">
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

interface TableOfContentsProps extends BoxProps {
  headings: any[]
  content: Content
}

const TableOfContents: React.FC<TableOfContentsProps> = props => {
  const { headings, content, ...boxProps } = props
  const tocColor = useColorModeValue('blue.700', 'blue.200')
  const tocColorSecondary = useColorModeValue('gray.600', 'gray.200')

  return (
    <Box
      p={6}
      bgColor={useColorModeValue('white', 'gray.700')}
      boxShadow="sm"
      borderRadius="md"
      {...boxProps}
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
  )
}

interface ContentPageProps {
  content: Content
  mdx: MDXRemoteSerializeResult
  preview?: MDXRemoteSerializeResult
  headings: any[]
}

const ContentHeading: React.FC<HeadingProps> = props => (
  <Heading as="h1" mb={8} fontSize={{ base: '5xl', lg: '6xl' }} {...props} />
)

const ContentPage: NextPage<ContentPageProps> = props => {
  const { content, mdx, headings } = props
  const { title, description } = content
  const { isAdmin } = useAuthState()
  const { hasMembership } = useUserData()
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{ title, description }}
      />
      <LayoutContainer maxW="6xl">
        {content.draft && (
          <Tag colorScheme="purple" size="lg">
            DRAFT
          </Tag>
        )}
        <ContentHeading>{content.title}</ContentHeading>
        <Flex>
          <Box flexGrow={1}>
            <ContentPageCard content={content} />

            {'learn' in content && (
              <ContentPageWhatYoullLearn learn={content.learn} />
            )}

            {content.type === 'course' && (
              <ContentPageCourseToc content={content as Course<Content>} />
            )}

            <Box as="section" my={12}>
              <MDXRemote {...mdx} />
            </Box>

            {!hasMembership && <ProBanner />}
          </Box>

          <Box w={350} flexShrink={0} ml={6}>
            <Box position="sticky" top={5}>
              <TableOfContents content={content} headings={headings} />
              {isAdmin && content.id && <EditBody contentId={content.id} />}
            </Box>
          </Box>
        </Flex>
      </LayoutContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const content = await ContentFilter.content()

  const missingSlugs = content
    .get()
    .filter(c => c.slug == null || c.slug.length === 0)
  if (missingSlugs.length > 0) {
    throw new Error(
      `Content is missing slugs: ${JSON.stringify(missingSlugs, null, 4)}`
    )
  }

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
  let content = all.findBySlug(params?.slug ?? '')

  if (!content)
    throw new Error(`Could not find content with slug ${params?.slug}`)
  if (isCourse(content)) content = all.resolveCourse(content)

  const { body } = content
  const mdx = await serialize(body)

  // const lines = body.split('\n').slice(0, 5).join('\n')
  // const preview = await serialize(lines)

  const structure: any = remark()
  const headings = structure
    .use(remarkMdx)
    .parse(body)
    .children.filter((f: any) => f.type === 'heading' && f.depth < 3)
    .map((h: any) => ({ ...h, ...(h.children?.[0] ?? {}) }))

  return { props: { content, mdx, headings } }
}

export default ContentPage
