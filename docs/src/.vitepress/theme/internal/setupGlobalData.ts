import { AppEnhancer } from '../types'

export const setupGlobalData: AppEnhancer = ({ app, siteData }) => {
  const siteDataProxy = {}

  Object.defineProperties(siteDataProxy, {
    title: {
      get: () => siteData.value.title,
      enumerable: true
    },
    description: {
      get: () => siteData.value.description,
      enumerable: true
    },
  })

  app.config.globalProperties.$siteData = siteDataProxy
}
