import { ref, Ref, provide, inject } from 'vue'
import type { Gitlab, Notes } from '@zhengxs/gitlab-api'

import { useIssue } from './use_issues'

/** @internal */
const GITLAB_NOTES_INJECT_KEY = Symbol.for('gitlab#notes')

export type NotesContext = {
  filter: Ref<Gitlab.Filter>
  items: Ref<Gitlab.Note[]>
  total: Ref<number>
  rest: Ref<Notes | undefined>
  search: (args?: Omit<Gitlab.Filter, 'per_page'>) => Promise<void>
  next: () => Promise<void>
  create: (payload: { body: string }) => Promise<any>
}

/** @internal*/
const createNotesContext = (): NotesContext => {
  const { notes: rest } = useIssue()

  const filter = ref<Gitlab.Filter>({
    page: 1,
    per_page: 10,
    order_by: 'created_at',
    sort: 'desc',
  })

  const items = ref<Gitlab.Note[]>([])
  const total = ref(0)

  const search = async () => {
    const params = {
      ...filter.value,
      per_page: 1,
    }

    const res = await rest.value!.index(params)

    filter.value = params
    items.value = res.items
    total.value = res.total
  }

  const next = async () => {
    const params = {
      ...filter.value,
      per_page: filter.value.per_page + 1,
    }

    const res = await rest.value!.index(params)

    filter.value = params
    items.value = res.items
    total.value = res.total
  }

  const create = async (payload: { body: string }) => {
    return rest.value?.create(payload)
  }

  return {
    rest,
    filter,
    items,
    total,
    search,
    create,
    next,
  }
}

export const useNotes = (): NotesContext => {
  let instance = inject<NotesContext | null>(GITLAB_NOTES_INJECT_KEY, null)
  if (instance) return instance

  instance = createNotesContext()

  provide(GITLAB_NOTES_INJECT_KEY, instance)

  return instance
}
