import { createApp } from 'vue'
import { setupGitlab } from '@zhengxs/gitlab-api'

import App from './App.vue'

const gitlab = setupGitlab({
  authority: import.meta.env.VITE_APP_GITLAB_BASE_URL,
  clientId: import.meta.env.VITE_APP_GITLAB_CLIENT_ID,
  redirectURI: import.meta.env.VITE_APP_GITLAB_REDIRECT_URI,
})

await gitlab.loginWithRedirect()

if (import.meta.env.DEV) {
  import.meta.glob('./__mocks__/**/*.mock.ts', { eager: true })
}

createApp(App).mount('#app')
