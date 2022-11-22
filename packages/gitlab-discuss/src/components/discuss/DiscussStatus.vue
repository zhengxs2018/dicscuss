<script lang="ts" setup>
defineProps({
  status: String,
  message: String,
})
</script>

<template>
  <div>{{ status }}</div>
</template>
