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
  <button class="vssue-button" :class="`vssue-button-${type}`">
    <slot></slot>
  </button>
</template>

<style>
:root {
  --vs-button-primary-text: var(--vp-c-brand)
  --vs-button-primary-border: var(--vp-c-brand)

  --vs-button-default-text: var(--vp-c-brand)
  --vs-button-default-border: var(--vp-c-brand)

  --vs-button-disable-text: var(--vp-c-divider-light)
  --vs-button-disable-border: var(--vp-c-divider-light)
}

.vssue-button {
  padding: 10px 20px;
  font-size: 1.05;
  font-weight: bold;
  color: var(--vs-button-default-text);
  border: 2px solid var(--vs-button-default-border);
  border-radius: 10px;
  cursor: pointer;
  outline: none;
}

.vssue-button:disabled {
  cursor: not-allowed;
  color: var(--vs-button-disable-text);
  border-color: var(--vs-button-disable-border);
}

.vssue-button:not(:disabled).vssue-button-primary {
  color: var(--vs-button-primary-text);
  border-color: var(--vs-button-primary-border);
}
</style>
