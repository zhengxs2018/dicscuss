import { provide, inject, ref, Ref, readonly } from 'vue'

import { Gitlab } from '@zhengxs/gitlab-api'

import { useGitlab } from './use_gitlab'
import { useAxios } from './use_axios'

/** @internal */
const GITLAB_CURRENT_USER_KEY = Symbol.for('gitlab#currentUser')

export type CurrentUserContext = {
  loading: Ref<boolean>
  loaded: Ref<boolean>
  error: Ref<string | null>
  data: Ref<Gitlab.User>
  refresh: () => Promise<void>
  removeUser: () => Promise<void>
}

/** @internal */
const unknownUser = readonly<Gitlab.User>({
  id: -1,
  name: '未登录',
  username: 'unknown',
  state: 'inactive',
  avatar_url: '',
  web_url: '',
  created_at: '',
})

/** @internal */
const createCurrentUserContext = (): CurrentUserContext => {
  const { client, isAuthenticated } = useGitlab()

  const data = ref<Gitlab.User>(unknownUser)
  const loaded = ref<boolean>(false)
  const { loading, send, error } = useAxios<void>(async (_, config) => {
    const user = await client.getUser(config)

    loaded.value = true
    data.value = user
  })

  /** @internal */
  const removeUser = () => {
    data.value = unknownUser
    loaded.value = false

    return Promise.resolve()
  }

  const refresh = () => (isAuthenticated() ? send() : removeUser())

  return {
    loading,
    loaded,
    error,
    data,
    refresh,
    removeUser,
  }
}

export const useCurrentUser = () => {
  let instance = inject<CurrentUserContext | null>(
    GITLAB_CURRENT_USER_KEY,
    null,
  )
  if (instance) return instance

  instance = createCurrentUserContext()

  provide(GITLAB_CURRENT_USER_KEY, instance)

  return instance
}
