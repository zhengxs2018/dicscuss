import { ref, Ref, readonly, watchEffect } from 'vue'

import { Gitlab } from '@zhengxs/gitlab-api'

import { useAxios } from './use_axios'
import { useGitlab } from './use_gitlab'
import { useSingleton } from './use_singleton'

/** @internal */
const GITLAB_CURRENT_USER_KEY = Symbol.for('gitlab#currentUser')

export type CurrentUserProvider = {
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

// TODO(zhengxs2018) 允许非单例模式
export const useCurrentUser = (): CurrentUserProvider => {
  return useSingleton(GITLAB_CURRENT_USER_KEY, () => {
    const { sdk, isAuthenticated } = useGitlab()

    const data = ref<Gitlab.User>(unknownUser)
    const loaded = ref<boolean>(false)
    const { loading, send, cancel, error } = useAxios<void>(
      async (_, config) => {
        const user = await sdk.getUser(config)

        loaded.value = true
        data.value = user
      },
    )

    /** @internal */
    const removeUser = () => {
      data.value = unknownUser
      loaded.value = false

      return Promise.resolve()
    }

    const refresh = () => (isAuthenticated() ? send() : removeUser())

    watchEffect(onCleanup => {
      onCleanup(() => cancel())
      refresh()
    })

    return {
      loading,
      loaded,
      error,
      data,
      refresh,
      removeUser,
    }
  })
}
