<script lang="ts" setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: false,
    default: null,
  },
})
</script>

<template>
  <svg
    class="vssue-icon"
    :class="`vssue-icon-${props.name}`"
    aria-hidden="true"
  >
    <title>{{ props.title }}</title>
    <use :xlink:href="`#vssue-icon-${props.name}`"></use>
  </svg>
</template>
