import type { App, ComponentOptions, Ref } from 'vue'

export type SiteData = {
  lang: string
  base: string
  title: string
  description: string
}
export type SiteDataRef = Ref<SiteData>

export type AppEnhancerOptions = {
  app: App
  siteData: SiteDataRef
}

export type AppEnhancer = (options: AppEnhancerOptions) => void

export type ThemeInfo = {
  Layout?: ComponentOptions
  NotFound?: ComponentOptions
  enhanceApp?: AppEnhancer
}

export interface APIHeader {
  text: string
  link: string
}

export interface APIGroup {
  text: string
  items: Array<{
    text: string
    link: string
    indexes: APIHeader[]
  }>
}
