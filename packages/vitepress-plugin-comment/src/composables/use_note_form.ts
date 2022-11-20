import { ref, unref, computed, watchEffect } from 'vue'

import { useGitlab, useNotes } from '@zhengxs/gitlab-vue'

export const useNoteForm = () => {
  const { create } = useNotes()
  const { isLoggedIn } = useGitlab()

  const loading = ref(false)
  const inputRaw = ref('')

  const inputValue = computed(() => {
    const value = unref(inputRaw.value).trim()
    return value.length > 0 ? value : null
  })

  const placeholder = computed<string>(() => {
    return isLoggedIn.value ? '按 ctrl + enter 发送' : '登录后才能发表评论'
  })

  const disabled = computed<boolean>(() => isLoggedIn.value === false)

  const error = ref<string | null>(null)

  const submit = async () => {
    const body = inputValue.value
    if (body == null) return

    loading.value = true
    try {
      await create({ body })
    } catch (ex) {
      error.value = (ex as Error).message
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (inputRaw.value && error.value) {
      error.value = null
    }
  })

  return {
    loading,
    data: inputRaw,
    placeholder,
    disabled,
    error,
    submit,
  }
}
