import { ref, Ref, computed } from 'vue'
import { Gitlab, Notes } from '@zhengxs/gitlab-api'

import { useActiveIssue } from './use_issue'
import { useSingleton } from './use_singleton'
import { useAxios } from './use_axios'

/** @internal */
const GITLAB_NOTES_INJECT_KEY = Symbol.for('gitlab#notes')

export type NotesProvider = {
  filter: Ref<Gitlab.Filter>
  items: Ref<Gitlab.Note[]>
  pageCount: Ref<number>
  loading: Ref<boolean>
  error: Ref<string | null>
  isFirst: Ref<boolean>
  isEnd: Ref<boolean>
  total: Ref<number>
  search: (args?: Omit<Partial<Gitlab.Filter>, 'page'>) => Promise<void>
  next: () => Promise<void>
  prev: () => Promise<void>
  loadMore: () => Promise<void>
  loadPage: (page: number) => Promise<void>
  create: (payload: { body: string }) => Promise<any>
}

const createNotesRest = () => {
  const { rest, id } = useActiveIssue()

  return computed<Notes | undefined>(() => {
    const iid = id.value
    const prest = rest.value

    if (iid && prest) {
      return new Notes({
        client: prest.client,
        endpoint: `${prest.endpoint}/${iid}`,
      })
    }
  })
}

export const useActiveNotes = () => {
  return useSingleton(GITLAB_NOTES_INJECT_KEY, (): NotesProvider => {
    const rest = createNotesRest()

    const filter = ref<Gitlab.Filter>({
      page: 1,
      per_page: 10,
      order_by: 'created_at',
      sort: 'desc',
    })

    const items = ref<Gitlab.Note[]>([])
    const total = ref(0)
    const pageCount = computed(() =>  {
      return Math.ceil(total.value / filter.value.per_page)
    })

    const isFirst = computed(() => filter.value.page === 1)
    const isEnd = computed(() => pageCount.value === filter.value.page)

    const { loading, error, send } = useAxios<Gitlab.Filter>(
      (params, config) => {
        return rest.value!.index(params, config)
      },
    )

    const search = async (args?: Omit<Partial<Gitlab.Filter>, 'page'>) => {
      const params = {
        ...filter.value,
        ...args,
        page: 1,
      }

      const res = await send(params)

      filter.value = params
      items.value = res.items
      total.value = res.total
    }

    const loadPage = async (page: number) => {
      const args = filter.value
      const params = {
        ...args,
        page,
      }

      const res = await send(params)

      filter.value = params
      items.value = res.items
      total.value = res.total
    }

    const loadMore = async () => {
      const args = filter.value
      const params = {
        ...args,
        page: args.page + 1,
      }

      const res = await send(params)

      filter.value = params
      items.value = items.value.concat(res.items)
      total.value = res.total
    }

    const prev = () => {
      return isFirst.value ? Promise.resolve() : loadPage(filter.value.page - 1)
    }

    const next = () => {
      return isEnd.value ? Promise.resolve() : loadPage(filter.value.page + 1)
    }

    const create = async (payload: { body: string }) => {
      return rest.value!.create(payload)
    }

    return {
      filter,
      loading,
      error,
      items,
      total,
      isFirst,
      isEnd,
      pageCount,
      search,
      loadMore,
      create,
      prev,
      next,
      loadPage,
    }
  })
}
