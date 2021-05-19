import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text,
  Box,
  Link,
  Spacer,
  Tag,
  Button,
  Icon
} from '@chakra-ui/react'
import { Content, Course, CourseSection } from '@shared/firestore'
import React, { createContext, useContext } from 'react'
import { FaVideo } from 'react-icons/fa'
import NextLink from 'next/link'
import { url } from '@/content'

interface CourseContent {
  course: Course
  section: CourseSection
  content: Content
}

export const CourseContentContext = createContext<CourseContent>({} as any)

export const useCourseContent = () => {
  return useContext(CourseContentContext)
}

export const CourseSidebar: React.FC = () => {
  const { course, content } = useCourseContent()

  return (
    <Box w={450}>
      <Box px={8} pb={5} pt={8}>
        <Link
          href={url(course)}
          fontWeight="bold"
          color="blue.300"
          fontSize="3xl"
        >
          {course.title}
        </Link>
      </Box>
      <Accordion
        allowMultiple
        size="lg"
        defaultIndex={course.children.map((_, i) => i)}
      >
        {course.children.map((s, i) => (
          <AccordionItem key={s.slug}>
            <AccordionButton px={8}>
              <Text key={s.slug} fontWeight="bold" fontSize="xl">
                {i + 1} {s.name}
              </Text>
              <Spacer />
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel px={5}>
              {s.content.map((c, x) => (
                <NextLink
                  key={c.slug}
                  href={url({ ...c, course, section: s })}
                  passHref
                >
                  <Button
                    colorScheme={c.slug === content.slug ? 'green' : undefined}
                    justifyContent="left"
                    as="a"
                    isFullWidth
                    px={5}
                    py={2}
                    my={0.5}
                    variant="ghost"
                    isActive={c.slug === content.slug}
                  >
                    <Icon as={FaVideo} />
                    <Text mx={3} isTruncated>
                      {i + 1}.{x + 1} {c.title} and a really long title
                    </Text>
                    <Spacer />
                    <Tag colorScheme="green" ml={1} size="sm" flexShrink={0}>
                      Free
                    </Tag>
                    <Tag
                      colorScheme={
                        c.slug === content.slug ? 'green' : undefined
                      }
                      size="sm"
                      ml={1}
                      flexShrink={0}
                    >
                      11:20
                    </Tag>
                  </Button>
                </NextLink>
              ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  )
}
