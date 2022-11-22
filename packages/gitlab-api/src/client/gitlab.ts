import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import { random, singleton, asyncNever } from '../utils'
import type {
  Gitlab,
  GitlabSDKConfig,
  GitlabSDKOptions,
  GitlabSDKSigninRedirectArgs,
  StateStore,
} from '../types'

import { TokenManager } from './token'
import { WebStorageStateStore } from './store'

/** @internal */
const normalizeOptions = ({
  authority = 'https://gitlab.com',
  apiVersion = 'v4',
  clientId,
  redirectURI = '/connect/gitlab/callback.html',
  userStore = new WebStorageStateStore({
    store: window.sessionStorage,
  }),
}: GitlabSDKConfig): GitlabSDKOptions => ({
  authority,
  apiVersion,
  clientId,
  redirectURI,
  userStore,
})

/** @internal */
const normalizeSigninRedirectArgs = ({
  state = random(),
  callbackURL = window.location.href,
}: GitlabSDKSigninRedirectArgs): Required<GitlabSDKSigninRedirectArgs> => ({
  state,
  callbackURL,
})

export class GitlabSDK {
  client: AxiosInstance
  endpoint: string
  userStore: StateStore
  token: TokenManager
  options: GitlabSDKOptions

  constructor(config: GitlabSDKConfig) {
    const options = normalizeOptions(config)
    const { authority, apiVersion, userStore } = options

    this.options = options
    this.userStore = userStore
    this.endpoint = `/api/${apiVersion}`
    this.token = new TokenManager(userStore)

    this.client = axios.create({
      baseURL: authority,
      headers: {
        Accept: 'application/json',
      },
    })

    this.client.interceptors.request.use(config => {
      const accessToken = this.token.get()
      if (accessToken) {
        config.headers!['Authorization'] = `Bearer ${accessToken}`
      }
      return config
    })
  }

  /**
   * TODO(zhengxs2018) 使用异步函数代替
   *
   * @internal
   */
  unstable__isAuthenticated(): boolean {
    return this.token.isValid()
  }

  unstable__isSigninRedirect() {
    const hash = new URLSearchParams(window.location.hash.slice(1))
    return hash.has('access_token')
  }

  async getUser(config?: AxiosRequestConfig): Promise<Gitlab.User> {
    const response = await this.client.get(`${this.endpoint}/user`, config)
    return response.data
  }

  signinRedirect(args: GitlabSDKSigninRedirectArgs = {}): Promise<never> {
    const { authority, redirectURI, clientId } = this.options
    const { state, callbackURL } = normalizeSigninRedirectArgs(args)

    const url = new URL('/oauth/authorize', authority)
    const combineURL = new URL(redirectURI, document.baseURI)

    url.searchParams.set('client_id', clientId)
    url.searchParams.set('state', state)
    url.searchParams.set('redirect_uri', combineURL.toString())
    url.searchParams.set('response_type', 'token')

    this.userStore.set(state, callbackURL)

    window.location.href = url.toString()

    return asyncNever
  }

  async signinRedirectCallback(url?: string): Promise<never> {
    const hash = new URLSearchParams(window.location.hash.slice(1))
    if (hash.has('access_token') === false) {
      throw new Error('无效的 token')
    }

    const state = hash.get('state')!
    const accessToken = hash.get('access_token')!

    this.token.restore(accessToken)

    const callbackURL = url || this.userStore.get(state)

    this.userStore.remove(state)

    window.location.replace(callbackURL || '/')

    return asyncNever
  }

  async loginWithRedirect(
    args?: GitlabSDKSigninRedirectArgs,
  ): Promise<void | never> {
    if (this.unstable__isSigninRedirect()) {
      return this.signinRedirectCallback()
    }

    if (this.unstable__isAuthenticated() === false) {
      return this.signinRedirect(args)
    }
  }

  static getInstance() {
    return setupGitlab.get()
  }
}

export const setupGitlab = singleton(
  (config: GitlabSDKConfig) => new GitlabSDK(config),
)
