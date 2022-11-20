import type { Gitlab } from '../types'

import { Notes } from './notes'
import { Rest, RestOptions } from './rest'

export class Issues extends Rest<Gitlab.Issue> {
  constructor(options: RestOptions) {
    super('issues', options)
  }

  notes(issueId: Gitlab.ID) {
    return new Notes({
      client: this.client,
      endpoint: `${this.endpoint}/${issueId}`,
    })
  }
}
