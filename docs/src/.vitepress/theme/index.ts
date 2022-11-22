import DefaultTheme from 'vitepress/theme'

import './theme.css'
import Layout from './Layout.vue'

import { setupGlobalData, setupGlobalComponents } from './internal'
import { defineTheme } from './helpers'

export default defineTheme({
  ...DefaultTheme,
  Layout,
  enhanceApp(options) {
    setupGlobalData(options)
    setupGlobalComponents(options)
  },
})
