import type { Gitlab } from '../types'

import { Rest, RestOptions } from './rest'

export class Issues extends Rest<Gitlab.Issue> {
  constructor(options: RestOptions) {
    super('issues', options)
  }
}
