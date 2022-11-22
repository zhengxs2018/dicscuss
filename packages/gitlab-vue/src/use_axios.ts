// TODO(zhengxs2018) axios 的导出类型有错误
// @ts-ignore
import { isCancel } from 'axios'
import type { AxiosRequestConfig } from 'axios'

import { ref } from 'vue'

const neverPromise = new Promise<never>(() => void 0)

export type AxiosFetcher<U = any, T = any> = (
  data: U | undefined,
  config: AxiosRequestConfig,
) => Promise<T>

export type AxiosRequest<U = any, T = any> = (
  data?: U,
  config?: AxiosRequestConfig,
) => Promise<T>

export const withCancelToken = <U = any, T = any>(
  fetcher: AxiosFetcher<U, T>,
) => {
  let abortCtrl: AbortController | null

  const send: AxiosRequest<U, T> = (data, config) => {
    cancel() // 主动取消

    const controller = new AbortController()

    abortCtrl = controller

    const promise = fetcher(data, { ...config, signal: controller.signal })

    promise.finally(() => {
      abortCtrl = null
    })

    return promise
  }

  const cancel = (message?: string) => {
    if (abortCtrl) {
      abortCtrl.abort(message)
      abortCtrl = null
    }
  }

  return [send, cancel] as const
}

export const useAxios = <U = any, T = any>(fetcher: AxiosFetcher<U, T>) => {
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const [send, cancel] = withCancelToken(async (args, config) => {
    try {
      const result = await fetcher(args, config)
      return result
    } catch (ex) {
      if (isCancel(ex)) return neverPromise

      error.value = (ex as Error).message
      throw error
    } finally {
      loading.value = false
    }
  })

  return {
    loading,
    send,
    cancel,
    error,
  }
}
