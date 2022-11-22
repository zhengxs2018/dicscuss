import { ref, Ref } from 'vue'
import { GitlabSDK } from '@zhengxs/gitlab-api'

import { useSingleton } from './use_singleton'

/** @internal */
const GITLAB_INJECT_KEY = Symbol.for('gitlab')

export type GitlabProvider = {
  sdk: GitlabSDK
  isLoggedIn: Ref<boolean>
  login: () => void
  isAuthenticated: () => boolean
}

export const useGitlab = (): GitlabProvider => {
  return useSingleton(GITLAB_INJECT_KEY, () => {
    const sdk = GitlabSDK.getInstance()
    if (!sdk) throw new Error(`无效的配置`)

    const isLoggedIn = ref<boolean>(sdk.unstable__isAuthenticated())

    const isAuthenticated = () => {
      const status = sdk.unstable__isAuthenticated()

      if (isLoggedIn.value !== status) {
        isLoggedIn.value = status
      }

      return status
    }

    const login = () => {
      if (isAuthenticated()) return

      sdk.signinRedirect()
    }

    return {
      sdk,
      isLoggedIn,
      isAuthenticated,
      login,
    }
  })
}
