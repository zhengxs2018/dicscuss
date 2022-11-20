// TODO(zhengxs2018) axios 的导出类型有错误
// @ts-ignore
import { isCancel } from 'axios'
import type { AxiosRequestConfig, Canceler } from 'axios'

import { ref } from 'vue'

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
  let abort: Canceler | null

  const send: AxiosRequest<U, T> = (data, config) => {
    cancel() // 主动取消

    const controller = new AbortController()

    abort = controller.abort

    return fetcher(data, { ...config, signal: controller.signal })
  }

  const cancel = (message?: string) => {
    if (abort) {
      abort(message)
      abort = null
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
      if (isCancel(ex)) return

      error.value = (ex as Error).message
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
