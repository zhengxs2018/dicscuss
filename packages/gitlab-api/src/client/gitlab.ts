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
  clientSecret = null,
  redirectURI = '/connect/gitlab/callback.html',
  postLogoutRedirectURI = '/',
  userStore = new WebStorageStateStore({
    store: window.sessionStorage,
  }),
}: GitlabSDKConfig): GitlabSDKOptions => ({
  authority,
  apiVersion,
  clientId,
  clientSecret,
  redirectURI,
  postLogoutRedirectURI,
  userStore,
})

/** @internal */
const normalizeSigninRedirectArgs = ({
  state = random(),
  callbackURL = window.location.href,
  responseType = 'code',
  scope = 'api',
}: GitlabSDKSigninRedirectArgs): Required<GitlabSDKSigninRedirectArgs> => ({
  state,
  callbackURL,
  responseType,
  scope,
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
    const currentURL = window.location.href
    const redirectURI = this.options.redirectURI.toString()

    if (currentURL.indexOf(redirectURI) === -1) return
    return (
      currentURL.indexOf('access_token=') > 0 || currentURL.indexOf('code=') > 0
    )
  }

  async getUser(config?: AxiosRequestConfig): Promise<Gitlab.User> {
    const response = await this.client.get(`${this.endpoint}/user`, config)
    return response.data
  }

  signinRedirect(args: GitlabSDKSigninRedirectArgs = {}): Promise<never> {
    const { authority, redirectURI, clientId } = this.options
    const { state, scope, responseType, callbackURL } =
      normalizeSigninRedirectArgs(args)

    const url = new URL('/oauth/authorize', authority)
    const combineURL = new URL(redirectURI, document.baseURI)

    url.searchParams.set('client_id', clientId)
    url.searchParams.set('state', state)
    url.searchParams.set('redirect_uri', combineURL.toString())
    url.searchParams.set('response_type', responseType)

    if (responseType === 'code') {
      url.searchParams.set('scope', scope)
    }

    this.userStore.set(state, callbackURL)

    window.location.href = url.toString()

    return asyncNever
  }

  async signinRedirectCallback(url?: string): Promise<never> {
    const { state, accessToken } = await this.exchangeToken()

    const callbackURL = url || this.userStore.get(state)

    this.token.restore(accessToken)

    window.location.replace(callbackURL || '/')

    return asyncNever
  }

  private async exchangeCode({ state, code }: { state: string; code: string }) {
    const { clientId, clientSecret, redirectURI } = this.options
    const combineURL = new URL(redirectURI, document.baseURI)

    const params = {
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: combineURL.toString(),
    }

    const response = await this.client.post('/oauth/token', null, { params })

    return {
      state,
      accessToken: response.data.access_token,
    } as const
  }

  private async exchangeToken() {
    const hashParams = new URLSearchParams(window.location.hash.slice(1))
    if (hashParams.has('access_token') === true) {
      return {
        state: hashParams.get('state')!,
        accessToken: hashParams.get('access_token')!,
      } as const
    }

    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('code') === true) {
      return this.exchangeCode({
        state: searchParams.get('code')!,
        code: searchParams.get('code')!,
      })
    }

    return Promise.reject(new Error('A code is required'))
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

  signoutRedirect() {
    const postLogoutRedirectURI = this.options.postLogoutRedirectURI
    this.userStore.clear()
    window.location.replace(postLogoutRedirectURI.toString())
  }

  async markdown(text: string, config?: AxiosRequestConfig): Promise<string> {
    const response = await this.client.post(
      `${this.endpoint}/markdown`,
      {
        text,
        gfm: true,
      },
      config,
    )
    return response.data.html
  }

  static getInstance() {
    return setupGitlab.get()
  }
}

export const setupGitlab = singleton(
  (config: GitlabSDKConfig) => new GitlabSDK(config),
)
