export interface UsersDiscord {
  id: string
  username: string
  avatar?: string
}

export interface User {
  uid: string
  email: string

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
  slug: string
  description: string
  tags: string[]
  thumbnail?: string
  body: string
  draft?: boolean
  level?: 'beginner' | 'intermediate' | 'advanced'
  publishedAt: number
  membershipOnly: boolean
}

export interface Video extends BaseContent {
  type: 'video'
  seconds: number
  youtubeId?: string
  vimeoId?: string
}

export interface CourseSection {
  name: string
  description: string
  content: Array<Video | CourseSection | string>
}

export interface Course extends BaseContent {
  type: 'course'
  vimeoId: string
  content: CourseSection[]
}

export type Content = Course | Video
