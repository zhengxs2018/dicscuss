import type { DefaultTheme } from 'vitepress/types'

export default <DefaultTheme.SidebarMulti>{
  '/guide/': [
    {
      text: '开始',
      items: [
        {
          text: '介绍',
          link: '/guide/',
        },
        {
          text: '常见问题',
          link: '/guide/faq',
        },
      ],
    },
  ],
}
