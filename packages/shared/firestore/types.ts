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
    type: 'lifetime' | 'subscription'
    status:
      | 'active'
      | 'canceled'
      | 'incomplete'
      | 'incomplete_expired'
      | 'past_due'
      | 'trialing'
      | 'unpaid'
    invoiceId?: string
    subscriptionId?: string
  }

  stripeCustomerId?: string
}

export interface BaseContent {
  id?: string
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
  premium?: boolean

  course?: Course
  section?: CourseSection
}

export interface Video extends BaseContent {
  type: 'video'
  seconds: number
  youtubeId?: string
  vimeoId?: string
}

export interface CourseSection {
  slug: string
  name: string
  description: string
  content: Array<Content>
}

export interface Course extends BaseContent {
  type: 'course'
  vimeoId: string
  children: CourseSection[]
  learn: string[]
}

export type Content = Course | Video
