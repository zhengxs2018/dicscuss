<script lang="ts" setup>
import VssueIcon from './VssueIcon.vue'

defineProps({
  name: String,
  avatar_url: String,
  web_url: String,
  status: String,
})
</script>

<template>
  <div class="vssue-avatar">
    <a :href="web_url" :title="name" target="_blank" rel="noopener noreferrer">
      <img v-if="avatar_url" :src="avatar_url" :alt="name" />
      <VssueIcon v-else name="gitlab" :title="name" />
    </a>
  </div>
</template>

<style>
.vssue-avatar {
  position: relative;
  width: 50px;
  height: 50px;
}

.vssue-avatar img {
  width: 50px;
  height: 50px;
}

.vssue-avatar .vssue-icon {
  cursor: pointer;
  padding: 5px;
  font-size: 50px;
}
</style>
