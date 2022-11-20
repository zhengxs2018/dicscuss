import type { Gitlab } from '../types'

import { Issues } from './issues'
import { Rest, RestOptions } from './rest'

export class Projects extends Rest<Gitlab.Project> {
  constructor(options: RestOptions) {
    super('projects', options)
  }

  issues(projectId: Gitlab.ID) {
    return new Issues({
      client: this.client,
      endpoint: `${this.endpoint}/${projectId}`,
    })
  }
}
