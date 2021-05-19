import { LayoutRightSidebar } from '@/components/Layout'
import { NavbarCourses } from '@/components/NavBar'
import { ContentFilter, isCourse } from '@/content'
import { Breadcrumb, BreadcrumbItem } from '@chakra-ui/breadcrumb'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  BreadcrumbLink,
  Button,
  Icon,
  Link,
  Spacer,
  Tag,
  Text
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { Content, Course, CourseSection } from '@shared/firestore'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'
import { FaVideo } from 'react-icons/fa'

interface ContentChildrenProps {
  root: Course
  section: CourseSection
  content: Content
}

const ContentChildren: NextPage<ContentChildrenProps> = props => {
  const { root, section, content } = props

  return (
    <LayoutRightSidebar
      sidebar={
        <Box w={450}>
          <Box px={8} pb={5} pt={8}>
            <Link
              href={`/content/${root.slug}`}
              fontWeight="bold"
              color="blue.300"
              fontSize="3xl"
            >
              {root.title}
            </Link>
          </Box>
          <Accordion
            allowMultiple
            size="lg"
            defaultIndex={root.children.map((_, i) => i)}
          >
            {root.children.map((s, i) => (
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
                      href={`/content/${root.slug}/${s.slug}/${c.slug}`}
                      passHref
                    >
                      <Button
                        colorScheme={
                          c.slug === content.slug ? 'green' : undefined
                        }
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
                        <Tag
                          colorScheme="green"
                          ml={1}
                          size="sm"
                          flexShrink={0}
                        >
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
      }
      navbar={NavbarCourses}
    >
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">{root.title}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">{section.name}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">{content.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </LayoutRightSidebar>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const content = await ContentFilter.content()
  const pages = []

  for (const r of content.get()) {
    if (!isCourse(r)) continue
    for (const s of r.children) {
      for (const x of s.content) {
        pages.push([r, s, x])
      }
    }
  }

  return {
    paths: pages.map(([root, section, content]) => ({
      params: {
        slug: root.slug,
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
  const root = allContent.get().find(c => c.slug === slug)
  if (root == null || !isCourse(root))
    throw new Error(`Content is not a course (${params}).`)

  const section = root?.children.find(s => s.slug === sectionSlug)
  const content = section?.content.find(c => c.slug === subSlug)
  if (root == null || section == null || content == null)
    throw new Error(`Content is missing (${params}).`)

  return { props: { root, section, content } }
}

export default ContentChildren
