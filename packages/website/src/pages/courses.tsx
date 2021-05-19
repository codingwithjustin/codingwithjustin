import { Card } from '@/components/Card'
import { VContentCard } from '@/components/content/ContentCard'
import { LayoutContainer } from '@/components/Layout'
import { TextMuted } from '@/components/TextMuted'
import { ContentFilter, isCourse } from '@/content'
import {
  Button,
  Center,
  Heading,
  Input,
  SimpleGrid,
  VStack
} from '@chakra-ui/react'
import { Course } from '@shared/firestore'
import { GetStaticProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import React from 'react'

interface CourseProps {
  courses: Course[]
}

const Courses: NextPage<CourseProps> = ({ courses }) => {
  return (
    <>
      <NextSeo
        title="Courses"
        description="Learn programming from beginning to end with indepth examples."
      />
      <LayoutContainer>
        <Heading as="h1" fontSize="4xl" mb={2}>
          Courses
        </Heading>
        <TextMuted>
          Learn programming from beginning to end with indepth examples.
        </TextMuted>

        {courses.length === 0 && (
          <Card as="section" marginY={10} p={5}>
            No courses available yet. We&lsquo;re working on it!
          </Card>
        )}

        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3 }}
          spacing={8}
          marginY={10}
        >
          {courses.map(c => (
            <VContentCard key={c.slug} w="inherit" content={c} />
          ))}
        </SimpleGrid>

        <Card my={28} p={10}>
          <Center py={10}>
            <VStack maxW={450} textAlign="center" spacing={5}>
              <Heading>Get updates for new courses!</Heading>
              <Input placeholder="Enter your email to join." />
              <Button isFullWidth colorScheme="blue">
                Join Now
              </Button>
            </VStack>
          </Center>
        </Card>
      </LayoutContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps<CourseProps> = async () => {
  const all = await ContentFilter.content()
  const courses = all.where(c => isCourse(c)).get() as Course[]
  return {
    props: { courses }
  }
}

export default Courses
