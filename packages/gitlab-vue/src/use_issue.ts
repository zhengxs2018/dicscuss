import { Ref, ref, isRef } from 'vue'
import { Gitlab, Issues } from '@zhengxs/gitlab-api'

import { useAxios } from './use_axios'
import { useIssues } from './use_issues'
import { useSingleton, getSingleton } from './use_singleton'
import type { IDRef } from './types'

/** @internal */
const GITLAB_ISSUE_INJECT_KEY = Symbol.for('gitlab:issue')

export type IssueProvider = {
  id: Ref<Gitlab.ID | undefined>
  loading: Ref<boolean>
  error: Ref<string | null>
  data: Ref<Gitlab.Issue | undefined>
  rest: Ref<Issues | undefined>
  refresh: () => Promise<void>
}

export const useIssue = (issueId: IDRef): IssueProvider => {
  const { rest } = useIssues()
  const id = isRef(issueId) ? issueId : ref(issueId)

  const data = ref<Gitlab.Issue | undefined>()

  const { loading, error, send, cancel } = useAxios(async () => {
    data.value = await rest.value!.show(id.value!)
  })

  const refresh = async () => {
    if (id.value && rest.value) {
      await send()
    } else {
      cancel()
    }
  }

  return {
    rest,
    id,
    data,
    loading,
    error,
    refresh,
  }
}

export const useActiveIssue = (issueId?: IDRef) => {
  if (issueId) {
    return useSingleton(GITLAB_ISSUE_INJECT_KEY, () => useIssue(issueId))
  }

  return getSingleton<IssueProvider>(GITLAB_ISSUE_INJECT_KEY)
}
