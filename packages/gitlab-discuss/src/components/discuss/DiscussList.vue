<script lang="ts" setup>
import { useActiveNotes } from '@zhengxs/gitlab-vue'

import DiscussPagination from './DiscussPagination.vue'
import DiscussItem from './DiscussItem.vue'

const { loading, items, search, total } = useActiveNotes()
</script>

<template>
  <div class="discuss-comments">
    <DiscussPagination />
    <DiscussItem v-for="item in items" :item="item" :key="item.id" />
    <DiscussPagination />
  </div>
</template>
