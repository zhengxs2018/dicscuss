import { Ref, computed } from 'vue'
import { Issues } from '@zhengxs/gitlab-api'

import { useActiveProject } from './use_project'
import { useSingleton } from './use_singleton'

/** @internal */
const GITLAB_ISSUES_INJECT_KEY = Symbol.for('gitlab#issues')

export type IssuesProvider = {
  rest: Ref<Issues | undefined>
}

const createIssuesRest = () => {
  const { rest, id } = useActiveProject()

  return computed<Issues | undefined>(() => {
    const pid = id.value

    if (pid) {
      return new Issues({
        client: rest.client,
        endpoint: `${rest.endpoint}/${pid}`,
      })
    }
  })
}

export const useIssues = () => {
  const rest = createIssuesRest()

  return {
    rest,
  }
}

export const useActiveIssues = () => {
  return useSingleton(GITLAB_ISSUES_INJECT_KEY, () => useIssues())
}
