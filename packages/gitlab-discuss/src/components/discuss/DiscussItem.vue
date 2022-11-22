<script lang="ts" setup>
import { PropType } from 'vue'
import { format } from 'timeago.js'

import { Gitlab } from '@zhengxs/gitlab-api'

import DiscussAvatar from '../base/DiscussAvatar.vue'
import DiscussMarkdownPreview from './DiscussMarkdownPreview.vue'

defineProps({
  item: {
    type: Object as PropType<Gitlab.Note>,
    required: true,
  },
})
</script>

<template>
  <div class="discuss-comment">
    <div class="discuss-comment-avatar">
      <DiscussAvatar v-bind="item.author" />
    </div>

    <div class="discuss-comment-body">
      <div class="discuss-comment-header">
        <div class="discuss-comment-author">
          <a
            :href="item.author.web_url"
            :title="item.author.name"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ item.author.name }}
          </a>
        </div>

        <div class="discuss-comment-created-at">
          {{ format(item.created_at, 'zh_CN') }}
        </div>
      </div>

      <div class="discuss-comment-main">
        <DiscussMarkdownPreview :content="item.body"/>
      </div>
    </div>
  </div>
</template>
