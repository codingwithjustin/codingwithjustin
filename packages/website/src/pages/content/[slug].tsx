import {
  Image,
  Box,
  Container,
  Flex,
  Heading,
  Text,
  IconButton
} from '@chakra-ui/react'
import React from 'react'
import { FaDiscord, FaGithub, FaTwitter, FaYoutube } from 'react-icons/fa'
import { LayoutNavbarFooter } from '@/components/Layout'
import { YouTubeVideo } from '@/components/Youtube'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ContentFilter } from '@/content'
import { Content } from '@shared/firestore'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { LayoutContainer } from '@/components/Layout'
import remark from 'remark'
import remarkMdx from 'remark-mdx'

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
  return (
    <LayoutContainer>
      <Heading as="h1" mb={4} fontSize="5xl">
        {content.title}
      </Heading>

      <Box flexGrow={1} rounded="md" shadow="md" bg="gray.700">
        {'youtubeId' in content && typeof content.youtubeId === 'string' && (
          <YouTubeVideo id={content.youtubeId} />
        )}

        <Text fontSize="lg" p={5} pb={3} noOfLines={2}>
          {content.description}
        </Text>

        <Flex p={5}>
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
              href="https://github.com/codingwithjustin"
              fontSize="1.5em"
              variant="ghost"
              aria-label="GitHub"
              icon={<FaGithub />}
            />
            <IconButton
              as="a"
              size="lg"
              href="https://www.youtube.com/channel/UCro4e-xxAYrgwt5cOccnE0A"
              fontSize="1.5em"
              variant="ghost"
              colorScheme="red"
              aria-label="Youtube"
              icon={<FaYoutube />}
            />
            <IconButton
              as="a"
              size="lg"
              href="https://github.com/codingwithjustin"
              fontSize="1.5em"
              variant="ghost"
              colorScheme="purple"
              aria-label="GitHub"
              icon={<FaDiscord />}
            />
            <IconButton
              as="a"
              size="lg"
              href="https://twitter.com/jsbroks"
              fontSize="1.5em"
              variant="ghost"
              colorScheme="twitter"
              aria-label="Twitter"
              icon={<FaTwitter />}
            />
          </Box>
        </Flex>
      </Box>
      <Box as="section" py={28}>
        <MDXRemote {...mdx} />
      </Box>
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
    .children.filter((f: any) => f.type === 'heading')
  return { props: { content, mdx, headings } }
}

export default ContentPage
