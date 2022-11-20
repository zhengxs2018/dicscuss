<script lang="ts" setup>
import { useGitlab, useCurrentUser } from '@zhengxs/gitlab-vue'

import { useNoteForm } from '../../composables'

import VssueAvatar from '../base/VssueAvatar.vue'
import VssueButton from '../base/VssueButton.vue'
import VssueIcon from '../base/VssueIcon.vue'
import VssueTextarea from '../base/VssueTextarea.vue'

const { isLoggedIn } = useGitlab()
const { data: currentUser } = useCurrentUser()
const { data, placeholder, disabled, submit } = useNoteForm()
</script>

<template>
  <div class="vssue-new-comment">
    <div class="vssue-new-comment-avatar">
      <VssueAvatar v-if="isLoggedIn" v-bind="currentUser" />
      <VssueIcon v-else name="gitlab" title="使用 GitLab 帐号登" />
    </div>

    <div class="vssue-new-comment-body">
      <VssueTextarea
        v-model="data"
        :placeholder="placeholder"
        :disabled="disabled"
        @keyup.enter.ctrl.prevent.stop="submit"
      />
    </div>

    <div class="vssue-new-comment-footer">
      <span v-if="isLoggedIn" class="vssue-current-user">
        <span>当前用户 - {{ currentUser.name }} - </span>
        <a class="vssue-logout"> 退出登录 </a>
      </span>
      <span v-else class="vssue-current-user">
        使用 GitLab 帐号登录后发表评论
      </span>

      <div class="vssue-new-comment-operations">
        <VssueButton
          v-if="isLoggedIn"
          class="vssue-button-submit-comment"
          type="primary"
          :disabled="disabled"
          @click="submit"
        >
          <!-- <VssueIcon v-show="loading" name="loading" /> -->
          提交评论
        </VssueButton>

        <VssueButton v-else class="vssue-button-login" type="primary">
          使用 Gitlab 登录
        </VssueButton>
      </div>
    </div>
  </div>
</template>

<style>
.vssue-new-comment {
  border-bottom: 1px solid var(--vp-c-divider-light);
  margin-top: 10px;
  margin-bottom: 10px;
}

.vssue-new-comment-avatar {
  float: left;
}

.vssue-new-comment-avatar .vssue-icon {
  cursor: pointer;
  padding: 5px;
  font-size: 50px;
}

.vssue-new-comment-body {
  position: relative;
}

.vssue-new-comment-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.vssue-new-comment-footer {
  margin-top: 10px;
  margin-bottom: 10px;
}

.vssue-new-comment-footer::after {
  display: block;
  clear: both;
  content: '';
}

.vssue-current-user {
  color: var(--vp-c-text-1);
}

.vssue-logout {
  cursor: pointer;
  text-decoration: underline;
  color: var(--vp-c-text-1);
  font-weight: normal;
}

@media screen and (max-width: 719px) {
  .vssue-new-comment .vssue-new-comment-body {
    margin-left: 60px;
  }
}

@media screen and (min-width: 720px) {
  .vssue-new-comment .vssue-new-comment-body {
    margin-left: 70px;
  }
}

@media screen and (max-width: 719px) {
  .vssue-new-comment-footer {
    text-align: center;
  }

  .vssue-new-comment-operations {
    margin-top: 10px;
  }
}

@media screen and (min-width: 720px) {
  .vssue-new-comment-footer {
    margin-left: 70px;
    text-align: right;
  }

  .vssue-new-comment-footer .vssue-current-user {
    float: left;
  }
}
</style>
