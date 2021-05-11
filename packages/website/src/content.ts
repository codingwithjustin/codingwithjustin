export interface Content {
  type: 'video' | 'course' | 'blog'
  title: string
  description: string
  thumbnail: string
  tags?: string[]
  membership?: boolean
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  publishedAt?: string
}

import { matchSorter } from 'match-sorter'
import youtubeVideos from './content.json'

export const contents: Content[] = youtubeVideos.map(s => ({
  type: s.type,
  title: s.title,
  description: s.description,
  thumbnail: s.thumbnail,
  tags: s.tags ?? [],
  level: s.level
  //   publishedAt: s.publishedAt
})) as any

export const search = (value: string) => {
  return matchSorter(contents, value, {
    keys: ['title', 'description', 'tags']
  })
}

export const hasTag = (value: string) => {
  return contents.filter(s => s.tags?.includes(value))
}

/**
 * Conte Filter
 */
export class ContentFilter {
  static content() {
    return new ContentFilter()
  }

  content: Content[]

  constructor() {
    this.content = contents
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
    this.where(c => c.membership)
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
    const filter = new ContentFilter()
    filter.content = [...this.content]
    return filter
  }

  get() {
    return this.content
  }
}
