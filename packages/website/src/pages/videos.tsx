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
import { NextPage } from 'next'
import NextLink from 'next/link'
import React from 'react'
import { HContentCard, VContentCard } from '../components/ContentCard'
import { ContentCarousel } from '../components/ContentCarousel'
import { FilterCheckbox, QueryFilter } from '../components/Filter'
import { LayoutContainer } from '../components/Layout'
import { TextMuted } from '../components/TextMuted'

import { ContentFilter } from '../content'

const content = ContentFilter.content()
const membershipContent = content.clone().premium()
const popularTags = content
  ?.popularTags()
  .slice(0, 10)
  .map(([t]) => t)

const Videos: NextPage = () => {
  const tagColor = useColorModeValue('green.400', 'green.200')

  return (
    <LayoutContainer>
      <Heading as="h1" fontSize="4xl" mb={2}>
        Newest
      </Heading>

      <TextMuted>Stay up to date with the lasted content.</TextMuted>

      {membershipContent.length > 0 && (
        <Box as="section" marginY={10}>
          <Heading as="h4" fontSize="2xl" mb={2}>
            Premium content
          </Heading>
          <Box borderWidth="1px" borderRadius="lg">
            <ContentCarousel paddingY={7} paddingX={5}>
              {membershipContent.map(s => (
                <VContentCard
                  key={s.title}
                  w={250}
                  flexShrink={0}
                  marginX={2}
                  {...s}
                />
              ))}
            </ContentCarousel>
          </Box>
        </Box>
      )}

      <Box as="section" marginY={10}>
        <Heading as="h4" fontSize="2xl" mb={2}>
          Popular topics
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
                <HContentCard {...s} />
              </Box>
            ))}
          </Box>
        </Flex>
      </Box>
    </LayoutContainer>
  )
}

export default Videos
