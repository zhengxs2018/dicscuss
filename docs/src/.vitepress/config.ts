import { defineConfig } from 'vitepress'

import nav from './navbar'
import sidebar from './sidebar'

export default defineConfig({
  lang: 'zh-CN',
  base: '/discuss/',
  title: 'Discuss',
  description: '为你的文档开启评论功能',
  themeConfig: {
    nav,
    sidebar,
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present zhengxs2018',
    },
  },
  vite: {
    server: {
      fs: {
        strict: false,
      },
    },
  },
})
