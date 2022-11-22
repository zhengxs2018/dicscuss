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
    class="discuss-icon"
    :class="`discuss-icon-${props.name}`"
    aria-hidden="true"
  >
    <title>{{ props.title }}</title>
    <use :xlink:href="`#discuss-icon-${props.name}`"></use>
  </svg>
</template>
