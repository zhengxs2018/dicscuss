import type { StateStore } from './storage'

export type GitlabSDKConfig = {
  authority?: string
  apiVersion?: string | null
  clientId: string
  clientSecret?: string | null
  redirectURI?: string | URL
  postLogoutRedirectURI?: string | URL
  userStore?: StateStore
}

export type GitlabSDKOptions = Required<GitlabSDKConfig>

export type GitlabSDKSigninRedirectArgs = {
  state?: string
  scope?: string
  responseType?: string
  callbackURL?: string
}
