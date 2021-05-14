import {
  Accordion,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  useColorModeValue
} from '@chakra-ui/react'
import { Content } from '@shared/firestore'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import NextLink from 'next/link'

import React from 'react'
import {
  HContentCard,
  VContentCard
} from '../../components/content/ContentCard'
import { ContentCarousel } from '../../components/content/ContentCarousel'
import { FilterCheckbox, QueryFilter } from '../../components/Filter'
import { LayoutContainer } from '../../components/Layout'

import { ContentFilter } from '../../content'

interface VideoPageProps {
  tag: string
  content: Content[]
  popularTags: string[]
  membershipContent: Content[]
}

const Videos: NextPage<VideoPageProps> = ({
  tag,
  content,
  popularTags,
  membershipContent
}) => {
  const tagColor = useColorModeValue('green.400', 'green.200')

  if (content == null || tag == null) {
    return <Box>Unknown Tag</Box>
  }

  const tagCapitalized = tag.charAt(0).toUpperCase() + tag.slice(1)

  return (
    <LayoutContainer>
      <Heading as="h1" fontSize="4xl" mb={3}>
        {tagCapitalized}
      </Heading>

      {membershipContent && membershipContent.length > 0 && (
        <Box as="section" marginY={10}>
          <Heading as="h4" fontSize="2xl" mb={2}>
            Premium content
          </Heading>
          <Box borderWidth="1px" borderRadius="lg">
            <ContentCarousel paddingY={7} paddingX={5}>
              {membershipContent.map(s => (
                <VContentCard
                  key={s.title}
                  flexShrink={0}
                  marginX={2}
                  content={s}
                />
              ))}
            </ContentCarousel>
          </Box>
        </Box>
      )}

      <Box as="section" marginY={10}>
        <Heading as="h4" fontSize="2xl" mb={2}>
          Similar topics
        </Heading>
        <SimpleGrid columns={5} rows={2}>
          {popularTags.map(t => (
            <NextLink key={t} href={`/tag/${t}`}>
              <Button
                key={t}
                variant="outline"
                color={tagColor}
                fontWeight="bold"
                letterSpacing="wide"
                m={2}
              >
                {t}
              </Button>
            </NextLink>
          ))}
        </SimpleGrid>
      </Box>

      <Box as="section" mt={10} mb={16}>
        <Heading as="h4" fontSize="2xl" mb={2}>
          Content
        </Heading>
        <Flex mt={8}>
          <Box w={275} mr={5}>
            <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
              <QueryFilter name="Type">
                <FilterCheckbox>Blog</FilterCheckbox>
                <FilterCheckbox>Video</FilterCheckbox>
                <FilterCheckbox>Course</FilterCheckbox>
              </QueryFilter>
              <QueryFilter name="Price">
                <FilterCheckbox>Free</FilterCheckbox>
                <FilterCheckbox>Membership</FilterCheckbox>
              </QueryFilter>
              <QueryFilter name="Level">
                <FilterCheckbox>All Levels</FilterCheckbox>
                <FilterCheckbox>Beginner</FilterCheckbox>
                <FilterCheckbox>Intermediate</FilterCheckbox>
                <FilterCheckbox>Expert</FilterCheckbox>
              </QueryFilter>
            </Accordion>
          </Box>

          <Box mt={-4}>
            {content.map((s, i) => (
              <Box key={i}>
                {i !== 0 && <Divider />}
                <HContentCard content={s} />
              </Box>
            ))}
          </Box>
        </Flex>
      </Box>
    </LayoutContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const content = await ContentFilter.content()
  const tags = Object.keys(content.tagOccurrences())
  return {
    paths: tags.map(t => ({ params: { tag: t } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<VideoPageProps, { tag: string }> =
  async ({ params }) => {
    const { tag } = params ?? {}
    if (!tag) throw new Error(`Must provide a tag`)

    const contentAll = await ContentFilter.content()
    const content = contentAll.hasTag(tag)
    const popularTags = content
      ?.popularTags()
      .map(([t]) => t)
      .filter(t => t !== tag)
      .slice(0, 10)
    const membershipContent = content.clone().premium().get()
    return {
      props: { tag, content: content.get(), popularTags, membershipContent }
    }
  }
export default Videos
