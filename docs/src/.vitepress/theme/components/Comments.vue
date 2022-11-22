<script lang="ts" setup>
import { onMounted } from 'vue'
import { useData, withBase } from 'vitepress'

import { setupGitlab } from '@zhengxs/gitlab-api'

import { Discuss } from '@zhengxs/gitlab-discuss'
import '@zhengxs/gitlab-discuss/index.css'

const { frontmatter } = useData()

const gitlab = setupGitlab({
  authority: 'https://gitlab.com',
  clientId: 'bf7178ecb1f12463b98f0a2be59fc74c7655fa6957dfdd940b01e644faaaf345',
  clientSecret:
    '707a62d3c4570668b58e510649bf71a7ab50f16c71ece45bb574d200e9aff68d',
  redirectURI: withBase('/connect/gitlab/callback.html'),
})

onMounted(async () => {
  await gitlab.loginWithRedirect({ responseType: 'code' })
})
</script>

<template>
  <Discuss
    v-if="frontmatter.issueId"
    projectId="41267734"
    :issueId="frontmatter.issueId"
    :key="frontmatter.issueId"
  />
</template>
