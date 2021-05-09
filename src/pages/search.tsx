import { Box, Flex, Heading, Divider, Accordion } from '@chakra-ui/react'

import React, { useMemo } from 'react'
import { LayoutContainer } from '../components/Layout'
import { useRouter } from 'next/router'
import { HContentCard } from '../components/ContentCard'
import { NextPage } from 'next'

import { ContentFilter } from '../content'
import { FilterCheckbox, QueryFilter } from '../components/Filter'

const Search: NextPage = () => {
  const { query } = useRouter()
  const { string = '', type } = query

  const results = useMemo(
    () =>
      ContentFilter.content()
        .search(typeof string === 'string' ? string : string?.join(' '))
        .type(type)
        .get(),
    [string]
  )

  return (
    <LayoutContainer>
      <Heading>
        {results.length} results for "{string}"
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
          {results.map((s, i) => (
            <Box key={i}>
              {i !== 0 && <Divider />}
              <HContentCard {...s} />
            </Box>
          ))}
        </Box>
      </Flex>
    </LayoutContainer>
  )
}

export default Search
