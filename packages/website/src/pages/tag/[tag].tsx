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
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import NextLink from 'next/link'

import React, { useMemo } from 'react'
import {
  HContentCard,
  VContentCard
} from '../../components/content/ContentCard'
import { ContentCarousel } from '../../components/content/ContentCarousel'
import { FilterCheckbox, QueryFilter } from '../../components/Filter'
import { LayoutContainer } from '../../components/Layout'

import { ContentFilter } from '../../content'

const Videos: NextPage<{ tag?: string }> = ({ tag }) => {
  const content = useMemo(
    () => (tag ? ContentFilter.content().hasTag(tag) : null),
    [tag]
  )

  const popularTags = useMemo(
    () =>
      content
        ?.popularTags()
        .filter(([t]) => t !== tag)
        .slice(0, 10) ?? [],
    [content, tag]
  )

  const membershipContent = useMemo(
    () => content?.clone().premium().first(10),
    [content]
  )

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
                <VContentCard key={s.title} flexShrink={0} marginX={2} {...s} />
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
          {popularTags.map(([t]) => (
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
                <HContentCard {...s} />
              </Box>
            ))}
          </Box>
        </Flex>
      </Box>
    </LayoutContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = Object.keys(ContentFilter.content().tagOccurrences())
  return {
    paths: tags.map(t => ({ params: { tag: t } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return { props: params ?? {} }
}
export default Videos
