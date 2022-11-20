<script lang="ts" setup>
import { useGitlab, useCurrentUser, useIssue } from '@zhengxs/gitlab-vue'

const { isLoggedIn, login } = useGitlab()
const { data: currentUser } = useCurrentUser()
const { data: issue } = useIssue()
</script>

<template>
  <div class="vssue-header">
    <a
      class="vssue-header-comments-count"
      :href="issue?.web_url"
      target="_blank"
      rel="noopener noreferrer"
    >
      <!-- <span> {{ notes.total }} 条评论 </span> -->
      0 条评论
    </a>

    <div class="vssue-header-right">
      <span v-if="isLoggedIn">
        {{ currentUser.name }}
      </span>
      <a v-else @click="login()"> 请登录 </a>
    </div>
  </div>
</template>

<style>
.vssue-header {
  padding-bottom: 10px;
  border-bottom: 1px solid var(--vp-c-divider-light);
  margin-bottom: 10px;
  overflow: hidden;
}

.vssue-header-right {
  float: right;
}
</style>
