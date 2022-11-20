import { provide, inject, computed, ref, isRef, Ref } from 'vue'
import { Projects, Issues } from '@zhengxs/gitlab-api'

import { useGitlab } from './use_gitlab'
import type { IDRef } from './types'

/** @internal */
const GITLAB_PROJECTS_INJECT_KEY = Symbol.for('gitlab#projects')

/** @internal */
const GITLAB_PROJECT_INJECT_KEY = Symbol.for('gitlab#project')

export type ProjectsContext = {
  rest: Projects
}

/** @internal */
const createProjectsContext = (): ProjectsContext => {
  // TODO(zhengxs2018) 支持异步实例化？
  const sdk = useGitlab()
  const rest = new Projects(sdk.client)

  const context: ProjectsContext = {
    rest,
  }

  return context
}

export const useProjects = (): ProjectsContext => {
  let instance = inject<ProjectsContext | null>(
    GITLAB_PROJECTS_INJECT_KEY,
    null,
  )
  if (instance) return instance

  instance = createProjectsContext()

  provide(GITLAB_PROJECTS_INJECT_KEY, instance)

  return instance
}

export type ProjectContext = {
  id: IDRef
  rest: Projects
  issues: Ref<Issues | undefined>
}

/** @internal */
const createProjectContext = (projectId: IDRef): ProjectContext => {
  const { rest } = useProjects()

  const id = isRef(projectId) ? projectId : ref(projectId)
  const issues = computed(() => (id.value ? rest.issues(id.value) : undefined))

  return {
    id,
    rest,
    issues,
  }
}

export const useProject = (id?: IDRef): ProjectContext => {
  let instance: ProjectContext

  if (id) {
    instance = createProjectContext(id)
    provide(GITLAB_PROJECT_INJECT_KEY, instance)
  } else {
    instance = inject<ProjectContext>(GITLAB_PROJECT_INJECT_KEY)!
  }

  return instance
}
