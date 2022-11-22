<script lang="ts" setup>
import DiscussIcon from './DiscussIcon.vue'

defineProps({
  name: String,
  avatar_url: String,
  web_url: String,
  status: String,
})
</script>

<template>
  <div class="discuss-avatar">
    <a :href="web_url" :title="name" target="_blank" rel="noopener noreferrer">
      <img v-if="avatar_url" :src="avatar_url" :alt="name" />
      <DiscussIcon v-else name="gitlab" :title="name" />
    </a>
  </div>
</template>
