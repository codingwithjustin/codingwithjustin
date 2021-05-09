import {
  Box,
  Text,
  Flex,
  Heading,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Stack,
  Checkbox
} from '@chakra-ui/react'

import React, { createContext, useContext, useMemo } from 'react'
import { LayoutContainer } from '../components/Layout'
import { useRouter } from 'next/router'
import { HContentCard } from '../components/ContentCard'
import { NextPage } from 'next'

import * as Content from '../content'

const FilterContext = createContext({
  has: (_: string) => false as boolean,
  toggle: (_: string) => {}
})

const FilterCheckbox: React.FC<{ children: string }> = ({ children }) => {
  const { has, toggle } = useContext(FilterContext)
  return (
    <Checkbox isChecked={has(children)} onChange={() => toggle(children)}>
      {children}
    </Checkbox>
  )
}

const SearchFilter: React.FC<{ name: string }> = ({ name, children }) => {
  const slugify = (property: string) => property.toLocaleLowerCase()

  const key = slugify(name)
  const router = useRouter()
  const value = router.query[key]

  const has = (property: string) => {
    if (!value) return false
    property = slugify(property)
    return typeof value === 'string'
      ? value === property
      : value.includes(property)
  }

  const toggle = (property: string) => {
    const { query, pathname } = router

    property = slugify(property)
    if (value == null) {
      query[key] = property
    } else if (typeof value === 'string') {
      has(property) ? delete query[key] : (query[key] = [value, property])
    } else {
      router.query[key] = has(property)
        ? value?.filter(s => s !== property)
        : [...value, property]
    }

    router.push({ query, pathname })
  }

  return (
    <AccordionItem>
      <AccordionButton>
        <Text letterSpacing="wide" flex="1" textAlign="left">
          {name}
        </Text>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <FilterContext.Provider value={{ has, toggle }}>
          <Stack>{children}</Stack>
        </FilterContext.Provider>
      </AccordionPanel>
    </AccordionItem>
  )
}

const Search: NextPage = () => {
  const { query } = useRouter()
  const { string } = query

  const results = useMemo(
    () => (typeof string === 'string' ? Content.search(string) : []),
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
            <SearchFilter name="Type">
              <FilterCheckbox>Blog</FilterCheckbox>
              <FilterCheckbox>Video</FilterCheckbox>
              <FilterCheckbox>Course</FilterCheckbox>
            </SearchFilter>
            <SearchFilter name="Price">
              <FilterCheckbox>Free</FilterCheckbox>
              <FilterCheckbox>Membership</FilterCheckbox>
            </SearchFilter>
            <SearchFilter name="Level">
              <FilterCheckbox>All Levels</FilterCheckbox>
              <FilterCheckbox>Beginner</FilterCheckbox>
              <FilterCheckbox>Intermediate</FilterCheckbox>
              <FilterCheckbox>Expert</FilterCheckbox>
            </SearchFilter>
          </Accordion>
        </Box>

        <Box mt={-4}>
          {results.map((s, i) => (
            <>
              {i !== 0 && <Divider />}
              <HContentCard {...s} />
            </>
          ))}
        </Box>
      </Flex>
    </LayoutContainer>
  )
}

export default Search
