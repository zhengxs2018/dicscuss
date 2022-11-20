import type { Ref } from 'vue'
import type { Gitlab } from '@zhengxs/gitlab-api'

/** @internal */
export type MaybeRef<T> = T | Ref<T>

/** @internal */
export type IDRef = MaybeRef<Gitlab.ID | undefined>
