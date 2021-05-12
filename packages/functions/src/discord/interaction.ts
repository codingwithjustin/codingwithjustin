/* eslint-disable camelcase */
export interface Interaction {
  id: string
  channel_id: string
  application_id: string
  token: string
  guild_id: string
  data: Data
  version: number
  type: number
  member?: Member
}

export interface Data {
  options: Option[]
  name: string
  id: string
}

export interface Option {
  type: number
  value: any
  name: string
}

export interface Member {
  avatar: null
  roles: any[]
  nick: string
  pending: boolean
  mute: boolean
  is_pending: boolean
  user: User
  joined_at: string
  permissions: string
  deaf: boolean
  premium_since: null
}

export interface User {
  id: string
  avatar: string
  discriminator: string
  public_flags: number
  username: string
}
