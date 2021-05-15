import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query
} from '@firebase/firestore'
import { Content, Course, Video } from '@shared/firestore'
import { matchSorter } from 'match-sorter'

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

export class ContentFilter {
  static async content() {
    return new ContentFilter(await get())
  }

  content: Content[]

  constructor(content: Content[]) {
    this.content = content
  }

  findBySlug(slug: string) {
    return this.content.find(f => f.slug === slug)
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

export const isVideo = (a: Content): a is Video => a.type === 'video'
export const isCourse = (a: Content): a is Course => a.type === 'course'

export const contentThumbnail = (c: Content) =>
  'youtubeId' in c
    ? `https://i.ytimg.com/vi/${c.youtubeId}/maxresdefault.jpg`
    : c.thumbnail

export const url = ({ slug }: Content) => `/content/${slug}`

export const formatPublishedAt = (c: Content) =>
  new Date(c.publishedAt * 1000).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
