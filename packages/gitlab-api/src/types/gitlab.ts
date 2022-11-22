/* eslint-disable @typescript-eslint/no-namespace */
export namespace Gitlab {
  export type Filter = {
    page: number
    per_page: number
    order_by: string
    sort: 'asc' | 'desc'
  }

  export type ID = number | string

  export type User = {
    id: ID
    name: string
    username: string
    state: string
    avatar_url: string
    web_url: string
    created_at: string
  }

  export type Author = {
    id: ID
    name: string
    username: string
    state: string
    avatar_url: string
    web_url: string
  }

  export type Project = {
    id: ID
  }

  export type Issue = {
    id: ID
    iid: ID
    title: string
    description: string
    web_url: string
  }

  export type Note = {
    id: ID
    type: null
    body: string
    attachment: null
    created_at: string
    updated_at: string
    system: boolean
    noteable_id: number
    noteable_type: string
    resolvable: boolean
    confidential: boolean
    noteable_iid: number
    commands_changes: Record<string, unknown>
    author: Author
  }
}
