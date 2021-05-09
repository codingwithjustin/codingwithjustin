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
