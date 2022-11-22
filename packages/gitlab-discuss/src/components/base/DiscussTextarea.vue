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
    class="discuss-textarea"
    :rows="rows"
    :placeholder="placeholder"
    :spellcheck="false"
    :disabled="disabled"
    @input="handleInput"
    @keyup="emit('keyup', $event)"
  >
  </textarea>
</template>
