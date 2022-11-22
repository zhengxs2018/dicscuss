import { Gitlab, Projects } from '@zhengxs/gitlab-api'
import { ref, isRef, Ref } from 'vue'

import { useAxios } from './use_axios'
import { useProjects } from './use_projects'
import { useSingleton, getSingleton } from './use_singleton'

import type { IDRef } from './types'

/** @internal */
const GITLAB_PROJECT_INJECT_KEY = Symbol.for('gitlab:project')

export type ProjectProvider = {
  id: Ref<Gitlab.ID | undefined>
  loading: Ref<boolean>
  error: Ref<string | null>
  data: Ref<Gitlab.Project | undefined>
  rest: Projects
  refresh: () => Promise<void>
}

export const useProject = (projectId: IDRef): ProjectProvider => {
  const { rest } = useProjects()

  const id = isRef(projectId) ? projectId : ref(projectId)
  const data = ref<Gitlab.Project | undefined>()

  const { loading, error, send } = useAxios(async () => {
    data.value = await rest.show(id.value!)
  })

  const refresh = async () => {
    if (!id.value) return

    await send()
  }

  return {
    id,
    data,
    loading,
    error,
    rest,
    refresh,
  }
}

export const useActiveProject = (projectId?: IDRef): ProjectProvider => {
  if (projectId) {
    return useSingleton(GITLAB_PROJECT_INJECT_KEY, () => useProject(projectId))
  }

  return getSingleton<ProjectProvider>(GITLAB_PROJECT_INJECT_KEY)
}
