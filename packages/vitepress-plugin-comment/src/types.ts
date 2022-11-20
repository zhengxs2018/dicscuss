import type { Ref } from 'vue'

export type MaybeRef<T> = T | Ref<T>

export type AllowUndefined<T> = T | undefined
