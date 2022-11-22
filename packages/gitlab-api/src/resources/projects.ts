import type { Gitlab } from '../types'

import { Rest, RestOptions } from './rest'

export class Projects extends Rest<Gitlab.Project> {
  constructor(options: RestOptions) {
    super('projects', options)
  }
}
