import type { Gitlab } from '../types'

import { Rest, RestOptions } from './rest'

export class Notes extends Rest<Gitlab.Note> {
  constructor(options: RestOptions) {
    super('notes', options)
  }
}
