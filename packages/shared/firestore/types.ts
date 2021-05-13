export interface UsersDiscord {
  id: string
  username: string
  avatar?: string
}

export interface User {
  uid: string
  email: string

  isAdmin?: boolean

  displayName?: string
  photoURL?: string
  discord?: UsersDiscord
  joinedAt: Date

  membership?: {
    status: 'active' | 'lifetime'
    sku: string
    joinedAt: Date
  }

  stripeCustomerId?: string
}

export interface BaseContent {
  type: string
  title: string
  description: string
  thumbnail: string
  tags: string[]
  parent?: string
  content: any
  draft?: boolean
  level?: 'beginner' | 'intermediate' | 'advanced'
  publishedAt: Date
  membershipOnly: boolean
}

export interface Video extends BaseContent {
  type: 'video'
  milliseconds: number
}

export const isVideo = (a: Content): a is Video => a.type === 'video'
export const isYoutubeVideo = (a: Content): a is VideoYoutube =>
  a.type === 'video' && 'youtubeId' in a
export const isVideoVimeo = (a: Content): a is VideoVimeo =>
  a.type === 'video' && 'vimeoId' in a

export interface VideoYoutube extends BaseContent {
  type: 'video'
  youtubeId: string
}

export interface VideoVimeo extends BaseContent {
  vimeoId: string
}

export interface CourseSection {
  vimeoId: string
  name: string
  description: string
  children: Array<VideoVimeo>
}

export const isCourse = (a: Content): a is Course => a.type === 'course'
export interface Course extends BaseContent {
  type: 'course'

  children: CourseSection[]
}

export type Content = Course | Video | VideoYoutube | VideoVimeo
