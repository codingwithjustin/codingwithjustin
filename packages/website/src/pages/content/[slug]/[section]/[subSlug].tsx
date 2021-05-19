import { LayoutContainer } from '@/components/Layout'
import { ContentFilter, isCourse } from '@/content'
import { Breadcrumb } from '@chakra-ui/breadcrumb'
import { Content, Course, CourseSection } from '@shared/firestore'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

interface ContentChildrenProps {
  root: Course
  section: CourseSection
  content: Content
}

const ContentChildren: NextPage<ContentChildrenProps> = props => {
  const { root, section, content } = props

  return (
    <LayoutContainer>
      <Breadcrumb></Breadcrumb>
    </LayoutContainer>
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
    params: pages.map(([root, section, content]) => ({
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
