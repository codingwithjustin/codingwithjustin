import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query
} from '@firebase/firestore'
import { Content, Course, CourseSection, Video } from '@shared/firestore'
import { matchSorter } from 'match-sorter'
import { formatTimestamp } from './utils'
import cloneDeep from 'lodash.clonedeep'

let content: Content[] = []

export const get = async () => {
  if (content.length === 0) {
    const col = collection(getFirestore(), 'content')
    const result = await getDocs<Content>(
      query(col, orderBy('publishedAt', 'desc'))
    )
    content = result.docs.map(d => ({ ...d.data(), id: d.id }))
  }
  return content
}

export const isVideo = (a: Content): a is Video => a.type === 'video'
export const isCourse = (a: Content): a is Course => a.type === 'course'

export class ContentFilter {
  static async content() {
    return new ContentFilter(await get())
  }

  content: Content[]
  contentMap: Record<string, Content>
  // Boolean for knowing if the content is already flattened
  isContentFlat: boolean

  constructor(content: Content[]) {
    this.content = [...content]
    this.contentMap = Object.fromEntries(
      this.content.filter(c => c.id != null).map(c => [c.id, c])
    )
    this.isContentFlat = false
  }

  flatten() {
    if (this.isContentFlat) return this
    this.isContentFlat = true
    const newContent = Array.from(this.iterateCourseContent())
      .filter(([_, __, c]) => typeof c !== 'string')
      .map(([course, section, content]) => ({ ...content, course, section }))
    this.content.push(...newContent)
    return this
  }

  *iterateCourseContent() {
    for (const c of this.content) {
      if (!isCourse(c)) continue
      for (const s of c.children) {
        for (const v of s.content) {
          yield [c, s, v] as [Course, CourseSection, Content]
        }
      }
    }
  }

  resolveCourse(c: Course): Course<Content> {
    const course = cloneDeep(c)
    course.children = course.children.map(c => {
      c.content = c.content.map(c =>
        typeof c == 'string' ? this.findById(c) : c
      )
      return c
    })
    return course as Course<Content>
  }

  findBySlug(slug: string) {
    return this.content.find(f => f.slug === slug)
  }

  findById(id: string) {
    return this.contentMap[id]
  }

  search(value: string) {
    this.content = matchSorter(this.content, value, {
      keys: ['title', 'description', 'tags']
    })
    return this
  }

  type(value: string | string[] | undefined) {
    if (value == null) return this
    typeof value === 'string'
      ? this.where(c => c.type === value)
      : this.where(c => value.includes(c.type))
    return this
  }

  price(value: string | string[] | undefined) {
    if (value == null) return this

    return this
  }

  tagOccurrences() {
    return this.content.reduce<Record<string, number>>((acc, curr) => {
      const tags = curr.tags ?? []
      for (const tag of tags) {
        acc[tag] ? acc[tag]++ : (acc[tag] = 1)
      }
      return acc
    }, {})
  }

  premium() {
    this.where(c => c.premium)
    return this
  }

  get length() {
    return this.content.length
  }

  popularTags() {
    return Object.entries(this.tagOccurrences()).sort((a, b) => b[1] - a[1])
  }

  hasTag(tag: string) {
    this.where(s => s.tags?.includes(tag))
    return this
  }

  hasAllTags(tags: string[]) {
    this.where(s => s.tags?.every(i => tags.includes(i)))
    return this
  }

  hasAtLeastOneTag(tags: string[]) {
    this.where(s => s.tags?.some(i => tags.includes(i)))
    return this
  }

  where(func: (c: Content, index: number) => boolean | undefined) {
    this.content = this.content.filter(func)
    return this
  }

  first(num: number) {
    this.content = this.content.slice(0, num)
    return this
  }

  map<T>(func: (value: Content, index: number) => T) {
    return this.content.map(func)
  }

  clone() {
    return new ContentFilter([...this.content])
  }

  get() {
    return this.content
  }
}

export const contentThumbnail = (c: Content) =>
  'youtubeId' in c
    ? `https://i.ytimg.com/vi/${c.youtubeId}/maxresdefault.jpg`
    : c.thumbnail

export const url = ({
  section,
  course,
  slug
}: {
  section?: CourseSection
  course?: Course
  slug: string
}) => {
  if (section != null && course != null)
    return `/content/${course.slug}/${section.slug}/${slug}`
  return `/content/${slug}`
}

export const formatPublishedAt = (c: Content) => formatTimestamp(c.publishedAt)
