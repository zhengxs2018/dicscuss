<script lang="ts" setup>
import { ref } from 'vue'

import { useGitlab, useCurrentUser, useActiveNotes } from '@zhengxs/gitlab-vue'

import DiscussAvatar from '../base/DiscussAvatar.vue'
import DiscussTextarea from '../base/DiscussTextarea.vue'
import DiscussButton from '../base/DiscussButton.vue'

const { logout } = useGitlab()
const { data: currentUser } = useCurrentUser()
const { search, create } = useActiveNotes()

const loading = ref(false)
const content = ref()

const handleSubmit = async () => {
  await create({ body: content.value })
  content.value = ''

  await search()
}
</script>

<template>
  <div class="discuss-new-comment">
    <div class="discuss-new-comment-avatar">
      <DiscussAvatar v-bind="currentUser" />
    </div>

    <div class="discuss-new-comment-body">
      <DiscussTextarea
        v-model="content"
        @keyup.ctrl.enter.stop="handleSubmit"
      />
    </div>

    <div class="discuss-new-comment-footer">
      <span class="discuss-current-user">
        <span>当前用户 - {{ currentUser.username }} - </span>
        <a class="discuss-logout" @click="logout()"> 退出登录 </a>
      </span>

      <div class="discuss-new-comment-operations">
        <DiscussButton
          class="discuss-button-submit-comment"
          type="primary"
          @click="handleSubmit()"
        >
          {{ loading ? '提交中' : '提交' }}
        </DiscussButton>
      </div>
    </div>
  </div>
</template>
