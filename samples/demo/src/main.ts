import { createApp } from 'vue'
import { setupGitlab } from '@zhengxs/gitlab-api'

import App from './App.vue'

const gitlab = setupGitlab({
  authority: import.meta.env.VITE_APP_GITLAB_BASE_URL,
  clientId: import.meta.env.VITE_APP_GITLAB_CLIENT_ID,
  clientSecret: import.meta.env.VITE_APP_GITLAB_CLIENT_SECRET,
  redirectURI: import.meta.env.VITE_APP_GITLAB_REDIRECT_URI,
})

await gitlab.loginWithRedirect({
  // 支在纯 web 端的应用中
  // 用 code 交换 token 不是很好
  // 推荐使用 token 模式
  responseType: 'token'
})

if (import.meta.env.DEV) {
  import.meta.glob('./__mocks__/**/*.mock.ts', { eager: true })
}

createApp(App).mount('#app')
