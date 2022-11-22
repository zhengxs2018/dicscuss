<script lang="ts" setup>
import { toRef } from 'vue'
import { useMarkdownPreview } from '@zhengxs/gitlab-vue'

// TODO(zhengxs2018) 本地 markdown 转 html
// TODO(zhengxs2018) 可选择性的远程渲染
const props = defineProps({
  content: {
    type: String,
    required: true,
  }
})

const { loading, error, data } = useMarkdownPreview(toRef(props, 'content'))
</script>

<template>
  <div class="markdown-preview">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ content }}</div>
    <!-- eslint-disable vue/no-v-html -->
    <div v-else v-html="data"></div>
    <!-- eslint-enable vue/no-v-html -->
  </div>
</template>
