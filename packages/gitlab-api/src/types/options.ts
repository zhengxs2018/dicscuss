import type { StateStore } from './storage'

export type GitlabSDKConfig = {
  authority?: string
  apiVersion?: string | null
  clientId: string
  redirectURI?: string | URL
  postLogoutRedirectURI?: string | URL
  userStore?: StateStore
}

export type GitlabSDKOptions = Required<GitlabSDKConfig>

export type GitlabSDKSigninRedirectArgs = {
  state?: string
  callbackURL?: string
}
