import type { StateStore } from './storage'

export type GitlabSDKConfig = {
  clientId: string
  authority?: string
  redirectURI?: string | URL
  apiVersion?: string | null
  userStore?: StateStore
}

export type GitlabSDKOptions = Required<GitlabSDKConfig>

export type GitlabSDKSigninRedirectArgs = {
  state?: string
  callbackURL?: string
}
