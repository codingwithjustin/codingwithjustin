import React from 'react'
import { LayoutRightSidebar } from '@/components/Layout'
import { NavbarCourses } from '@/components/NavBar'
import { ContentFilter, isCourse, url } from '@/content'
import {
  Button,
  Container,
  Flex,
  Heading,
  HeadingProps,
  Icon,
  Text,
  Spacer
} from '@chakra-ui/react'
import { Content, Course, CourseSection } from '@shared/firestore'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { CourseContentContext, CourseSidebar } from '@/components/Courses'
import { ContentPageCard } from '@/components/content/ContentHeading'
import { FaAngleLeft, FaAngleRight, FaCheck, FaHome } from 'react-icons/fa'
import NextLink from 'next/link'

interface ContentChildrenProps {
  course: Course
  section: CourseSection
  content: Content
}

const ContentTitle: React.FC<HeadingProps> = props => (
  <Heading as="h1" mb={8} fontSize={{ base: '3xl', lg: '4xl' }} {...props} />
)

const getNext = (
  course: Course,
  section: CourseSection,
  content: Content
): Content | null => {
  const idx = section.content.findIndex(c => c.slug === content.slug)
  if (idx + 1 < section.content.length)
    return { ...section.content[idx + 1], course, section }

  const sectionIdx = course.children.findIndex(s => s.slug === section.slug)
  if (sectionIdx + 1 < course.children.length) {
    const nextSection = course.children[sectionIdx + 1]
    return nextSection.content[0]
      ? { ...nextSection.content[0], course, section }
      : null
  }
  return null
}

const getPrevious = (
  course: Course,
  section: CourseSection,
  content: Content
): Content | null => {
  const idx = section.content.findIndex(c => c.slug === content.slug)
  if (idx - 1 >= 0) return { ...section.content[idx - 1], course, section }
  const sectionIdx = course.children.findIndex(s => s.slug === section.slug)
  if (sectionIdx - 1 >= 0) {
    const previousSection = course.children[sectionIdx - 1]
    return previousSection.content[previousSection.content.length - 1]
      ? {
          ...previousSection.content[previousSection.content.length - 1],
          course,
          section: previousSection
        }
      : null
  }
  return null
}

const ContentChildren: NextPage<ContentChildrenProps> = props => {
  const { course, section, content } = props

  const nextContent = getNext(course, section, content)
  const previousContent = getPrevious(course, section, content)

  return (
    <CourseContentContext.Provider value={{ course, section, content }}>
      <LayoutRightSidebar sidebar={<CourseSidebar />} navbar={NavbarCourses}>
        <Container maxW="4xl" my={10}>
          <ContentTitle mb={10}>{content.title}</ContentTitle>
          <ContentPageCard
            content={content}
            descriptionHeader={
              <Flex mb={4}>
                {previousContent ? (
                  <NextLink href={url(previousContent)}>
                    <Button as="a" variant="ghost" size="sm" mr={5}>
                      <Icon as={FaAngleLeft} mr={2} />
                      <Text isTruncated>{previousContent?.title}</Text>
                    </Button>
                  </NextLink>
                ) : (
                  <NextLink href={url(course)} passHref>
                    <Button
                      as="a"
                      variant="ghost"
                      size="sm"
                      colorScheme="green"
                    >
                      <Icon as={FaHome} mr={2} />
                      Overview
                    </Button>
                  </NextLink>
                )}

                <Spacer />

                {nextContent ? (
                  <NextLink href={url(nextContent)}>
                    <Button as="a" variant="ghost" size="sm" ml={5}>
                      <Text isTruncated>{nextContent?.title}</Text>
                      <Icon as={FaAngleRight} ml={2} />
                    </Button>
                  </NextLink>
                ) : (
                  <NextLink href={url(course)} passHref>
                    <Button
                      as="a"
                      variant="ghost"
                      size="sm"
                      colorScheme="green"
                    >
                      Done!
                      <Icon as={FaCheck} ml={2} />
                    </Button>
                  </NextLink>
                )}
              </Flex>
            }
          />
        </Container>
      </LayoutRightSidebar>
    </CourseContentContext.Provider>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const content = await ContentFilter.content()
  const pages = Array.from(content.iterateCourseContent())

  return {
    paths: pages.map(([course, section, content]) => ({
      params: {
        slug: course.slug,
        section: section.slug,
        subSlug: content.slug
      }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<
  ContentChildrenProps,
  { slug: string; section: string; subSlug: string }
> = async ({ params }) => {
  const { slug, section: sectionSlug, subSlug } = params ?? {}

  const allContent = await ContentFilter.content()
  const course = allContent.get().find(c => c.slug === slug)
  if (course == null || !isCourse(course))
    throw new Error(`Content is not a course (${params}).`)

  const section = course?.children.find(s => s.slug === sectionSlug)
  const content = section?.content.find(c => c.slug === subSlug)
  if (course == null || section == null || content == null)
    throw new Error(`Content is missing (${params}).`)

  return { props: { course, section, content } }
}

export default ContentChildren
