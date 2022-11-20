import { provide, inject, Ref, ref, unref, computed } from 'vue'
import type { Gitlab, Issues, Notes } from '@zhengxs/gitlab-api'

import { useProject } from './use_projects'
import type { IDRef } from './types'

/** @internal */
const GITLAB_ISSUES_INJECT_KEY = Symbol.for('gitlab#issues')

/** @internal */
const GITLAB_ISSUE_INJECT_KEY = Symbol.for('gitlab#issue')

export type IssuesContext = {
  rest: Ref<Issues | undefined>
}

/** @internal */
const createIssuesContext = (): IssuesContext => {
  const { issues: rest } = useProject()

  return {
    rest,
  }
}

export const useIssues = (): IssuesContext => {
  let instance = inject<IssuesContext | null>(GITLAB_ISSUES_INJECT_KEY, null)
  if (instance) return instance

  instance = createIssuesContext()

  provide(GITLAB_ISSUES_INJECT_KEY, instance)

  return instance
}

export type IssueContext = {
  id: IDRef
  rest: Ref<Issues | undefined>
  data: Ref<Gitlab.Issue | undefined>
  notes: Ref<Notes | undefined>
}

/** @internal */
const createIssueContext = (issueId: IDRef): IssueContext => {
  const { rest } = useIssues()

  const id = computed(() => unref(issueId))
  const data = ref<Gitlab.Issue | undefined>(undefined)
  const notes = computed(() =>
    id.value ? rest.value?.notes(id.value) : undefined,
  )

  return {
    id,
    rest,
    data,
    notes,
  }
}

export const useIssue = (issueId?: IDRef): IssueContext => {
  let instance: IssueContext

  if (issueId) {
    instance = createIssueContext(issueId)
    provide(GITLAB_ISSUE_INJECT_KEY, instance)
  } else {
    instance = inject<IssueContext>(GITLAB_ISSUE_INJECT_KEY)!
  }

  return instance
}
