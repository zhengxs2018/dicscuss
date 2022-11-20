<script lang="ts" setup>
import { unref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: () => '',
  },
  placeholder: {
    type: String,
    default: '请输入内容',
  },
  readonly: Boolean,
  disabled: Boolean,
})

const emit = defineEmits(['update:modelValue', 'keyup'])

const rows = computed((): number => {
  const rows = unref(props.modelValue).split('\n').length - 1
  return rows < 3 ? 5 : rows + 2
})

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
}
</script>

<template>
  <textarea
    :value="modelValue"
    class="vssue-textarea"
    :rows="rows"
    :placeholder="placeholder"
    :spellcheck="false"
    :disabled="disabled"
    @input="handleInput"
    @keyup="emit('keyup', $event)"
  >
  </textarea>
</template>

<style>
:root {
  --vs-textarea-border: var(--vp-c-divider-light);
  --vs-textarea-focus-border: var(--vp-c-brand-light);
  --vs-textarea-placeholder-text: var(--vp-c-text-3);
  --vs-textarea-disable-background: var(--vp-c-gray-light-5);
}

.vssue-textarea {
  resize: none;
  outline: none;
  width: 100%;
  padding: 15px;
  font-size: 12px;
  border: 1px solid var(--vs-textarea-border);
  border-radius: 5px;
}

.vssue-textarea:disabled {
  cursor: not-allowed;
  background-color: var(--vs-textarea-disable-background);
}

.vssue-textarea:focus {
  background-color: #ffffff;
  border-color: var(--vs-textarea-focus-border);
}

.vssue-textarea::placeholder {
  color: var(--vs-textarea-placeholder-text);
}
</style>
