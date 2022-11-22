import { ref, unref, watchEffect } from 'vue'

import { useGitlab } from './use_gitlab'
import { useAxios } from './use_axios'

import { MaybeRef } from './types'

export const useMarkdownPreview = (raw: MaybeRef<string>) => {
  const { sdk } = useGitlab()
  const data = ref('')

  const { loading, error, send, cancel } = useAxios<string>(
    async (text, config) => {
      data.value = await sdk.markdown(text!, config)
    },
  )

  watchEffect(onCleanup => {
    onCleanup(cancel)

    const content = unref(raw).trim()

    if (content) {
      send(content)
    } else {
      data.value = ''
    }
  })

  return {
    loading,
    error,
    data,
  }
}
