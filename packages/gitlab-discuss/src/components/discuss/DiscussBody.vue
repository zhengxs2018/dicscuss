<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { useActiveNotes } from '@zhengxs/gitlab-vue'

import DiscussButton from '../base/DiscussButton.vue'

import DiscussNewComment from './DiscussNewComment.vue'
import DiscussList from './DiscussList.vue'

const { loading, search, total } = useActiveNotes()

onBeforeMount(() => {
  search()
})
</script>

<template>
  <div class="discuss-body">
    <DiscussNewComment />

    <div v-if="loading" class="discuss-comments-loading">Loading...</div>
    <template v-if="total">
      <DiscussList />
    </template>
    <div v-if="!loading && total === 0" class="discuss-comments-empty">
      <p>暂无评论</p>
      <DiscussButton @click="search()"> 刷新列表 </DiscussButton>
    </div>
  </div>
</template>
