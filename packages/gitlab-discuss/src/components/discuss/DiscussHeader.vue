<script lang="ts" setup>
import {
  useGitlab,
  useCurrentUser,
  useActiveIssue,
  useActiveNotes,
} from '@zhengxs/gitlab-vue'

const { isLoggedIn, login } = useGitlab()
const { data: currentUser } = useCurrentUser()
const { data: issue } = useActiveIssue()
const { total } = useActiveNotes()
</script>

<template>
  <div class="discuss-header">
    <a
      class="discuss-header-comments-count"
      :href="issue?.web_url"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span> {{ total }} 条评论 </span>
    </a>

    <div class="discuss-header-right">
      <span v-if="isLoggedIn">
        {{ currentUser.name }}
      </span>
      <a v-else @click="login()"> 请登录 </a>
    </div>
  </div>
</template>

<style>
.discuss-header {
  padding-bottom: 10px;
  border-bottom: 1px solid var(--vp-c-divider-light);
  margin-bottom: 10px;
  overflow: hidden;
}

.discuss-header-right {
  float: right;
}
</style>
