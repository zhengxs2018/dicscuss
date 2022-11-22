import { ref, Ref, computed } from 'vue'
import { Gitlab, Notes } from '@zhengxs/gitlab-api'

import { useActiveIssue } from './use_issue'
import { useSingleton } from './use_singleton'

/** @internal */
const GITLAB_NOTES_INJECT_KEY = Symbol.for('gitlab#notes')

export type NotesProvider = {
  filter: Ref<Gitlab.Filter>
  items: Ref<Gitlab.Note[]>
  total: Ref<number>
  search: (args?: Omit<Gitlab.Filter, 'per_page'>) => Promise<void>
  next: () => Promise<void>
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

    const search = async () => {
      const params = {
        ...filter.value,
        page: 1,
      }

      const res = await rest.value!.index(params)

      filter.value = params
      items.value = res.items
      total.value = res.total
    }

    const next = async () => {
      const args = filter.value
      const params = {
        ...args,
        page: args.page + 1,
      }

      const res = await rest.value!.index(params)

      filter.value = params
      items.value = items.value.concat(res.items)
      total.value = res.total
    }

    const create = async (payload: { body: string }) => {
      return rest.value!.create(payload)
    }

    return {
      filter,
      items,
      total,
      search,
      create,
      next,
    }
  })
}
