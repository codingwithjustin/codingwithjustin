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
  Icon,
  AccordionProps,
  TextProps,
  AccordionButtonProps,
  ButtonProps,
  TagProps
} from '@chakra-ui/react'
import { Content, Course, CourseSection } from '@shared/firestore'
import React, { createContext, useContext } from 'react'
import { FaVideo } from 'react-icons/fa'
import NextLink from 'next/link'
import { url } from '@/content'
import { TextMuted } from './TextMuted'
import { formatSeconds } from '@/utils'

interface CourseContent {
  course: Course
  section: CourseSection
  content: Content
}

export const CourseContentContext = createContext<CourseContent>({} as any)

export const useCourseContent = () => {
  return useContext(CourseContentContext)
}

export const CourseToc: React.FC<AccordionProps> = props => (
  <Accordion allowMultiple size="lg" {...props} />
)

export const CourseTocSection: React.FC<
  AccordionButtonProps & {
    num?: number
    section: CourseSection
    textProps?: TextProps
  }
> = ({ section, num, textProps, ...buttonProps }) => {
  return (
    <AccordionButton {...buttonProps}>
      <Text key={section.slug} {...textProps}>
        {num ? `${num}. ` : ''} {section.name}
      </Text>
      <Spacer />
      <TextMuted mx={2}>
        {section.content.length} lesson{section.content.length !== 1 && 's'}
      </TextMuted>
      <AccordionIcon />
    </AccordionButton>
  )
}

export const CourseFreeTag: React.FC<TagProps> = () => {
  return (
    <Tag colorScheme="green" ml={1} size="sm" flexShrink={0}>
      Free
    </Tag>
  )
}

export const CourseSecondsTag: React.FC<TagProps & { isActive?: boolean }> = ({
  isActive,
  ...props
}) => {
  return (
    <Tag
      size="sm"
      ml={1}
      flexShrink={0}
      colorScheme={isActive ? 'green' : undefined}
      {...props}
    />
  )
}

export const CourseTocContentButton: React.FC<
  ButtonProps & { content: Content; isActive?: boolean }
> = ({ content, children, isActive, ...buttonProps }) => {
  return (
    <NextLink href={url(content)} passHref>
      <Button
        justifyContent="left"
        as="a"
        isFullWidth
        px={5}
        py={2}
        my={0.5}
        fontWeight="normal"
        variant="ghost"
        colorScheme={isActive ? 'green' : undefined}
        isActive={isActive}
        {...buttonProps}
      >
        <Icon as={FaVideo} />
        {children}
      </Button>
    </NextLink>
  )
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

      <CourseToc defaultIndex={course.children.map((_, i) => i)}>
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
                <CourseTocContentButton
                  key={c.slug}
                  content={{ ...c, course, section: s }}
                  isActive={c.slug === content.slug}
                >
                  <Text mx={3} isTruncated>
                    {i + 1}.{x + 1} {c.title}
                  </Text>
                  <Spacer />
                  {!c.premium && <CourseFreeTag />}
                  {c.type === 'video' && (
                    <CourseSecondsTag isActive={c.slug === content.slug}>
                      {formatSeconds(c.seconds)}
                    </CourseSecondsTag>
                  )}
                </CourseTocContentButton>
              ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </CourseToc>
    </Box>
  )
}
