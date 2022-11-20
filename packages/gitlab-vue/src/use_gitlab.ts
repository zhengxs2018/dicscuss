import { ref, Ref, provide, inject } from 'vue'
import { GitlabSDKConfig, GitlabSDK } from '@zhengxs/gitlab-api'

import { singleton } from './util'

/** @internal */
const GITLAB_INJECT_KEY = Symbol.for('gitlab')

/**
 * TODO(zhengxs2018) 需要支持多实例
 */
export const setupGitlab = singleton(
  (config: GitlabSDKConfig) => new GitlabSDK(config),
)

export type GitlabProvider = {
  client: GitlabSDK
  isLoggedIn: Ref<boolean>
  login: () => void
  isAuthenticated: () => boolean
}

/** @internal */
const createGitlabProvider = (config: GitlabSDKConfig): GitlabProvider => {
  // TODO 允许非单例模式
  const client = setupGitlab(config)

  /** @internal */
  const isLoggedIn = ref<boolean>(false)

  const isAuthenticated = () => {
    const status = client.unstable__isAuthenticated()

    if (isLoggedIn.value !== status) {
      isLoggedIn.value = status
    }

    return status
  }

  const login = () => {
    if (isAuthenticated()) return

    client.signinRedirect()
  }

  const provider: GitlabProvider = {
    client,
    isLoggedIn,
    isAuthenticated,
    login,
  }

  provide(GITLAB_INJECT_KEY, provider)

  return provider
}

export const useGitlab = (config?: GitlabSDKConfig) => {
  return config
    ? createGitlabProvider(config)
    : inject<GitlabProvider>(GITLAB_INJECT_KEY)!
}
