<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { useActiveNotes } from '@zhengxs/gitlab-vue'

import DiscussNewComment from './DiscussNewComment.vue'
import DiscussList from './DiscussList.vue'

const { search } = useActiveNotes()

onBeforeMount(() => {
  search()
})
</script>

<template>
  <div class="discuss-body">
    <DiscussNewComment />
    <DiscussList />
  </div>
</template>
