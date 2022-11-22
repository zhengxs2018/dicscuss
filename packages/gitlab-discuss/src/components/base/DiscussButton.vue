<script lang="ts" setup>
defineProps({
  type: {
    type: String,
    required: false,
    default: 'default',
  },
})
</script>

<template>
  <button class="discuss-button" :class="`discuss-button-${type}`">
    <slot></slot>
  </button>
</template>
