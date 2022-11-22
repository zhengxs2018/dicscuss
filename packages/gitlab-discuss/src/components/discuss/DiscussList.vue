<script lang="ts" setup>
import { useActiveNotes } from '@zhengxs/gitlab-vue'

import DiscussItem from './DiscussItem.vue'

const { items } = useActiveNotes()
</script>

<template>
  <div class="discuss-comments">
    <DiscussItem v-for="item in items" :item="item" :key="item.id" />
  </div>
</template>
