import { Projects } from '@zhengxs/gitlab-api'

import { useGitlab } from './use_gitlab'
import { useSingleton } from './use_singleton'

/** @internal */
const GITLAB_PROJECTS_INJECT_KEY = Symbol.for('gitlab:projects')

export const useProjects = () => {
  const { sdk } = useGitlab()
  const rest = new Projects(sdk)

  return { rest }
}

export const useActiveProjects = () => {
  return useSingleton(GITLAB_PROJECTS_INJECT_KEY, () => useProjects())
}
