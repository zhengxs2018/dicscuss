<script lang="ts" setup>
import { useActiveNotes } from '@zhengxs/gitlab-vue'

const { filter, pageCount, isFirst, isEnd, search, prev, next, loadPage } =
  useActiveNotes()

const pagesOptions = [5, 10, 20, 50]

const handlePageChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value
  const page = Number(value)

  if (page === filter.value.page) return
  return loadPage(page)
}

const handlePerPageChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value
  return search({ per_page: Number(value) })
}
</script>

<template>
  <div class="discuss-pagination">
    <div class="discuss-pagination-per-page">
      <label>
        <span> 每页评论数 </span>
        <select
          :value="filter.per_page"
          class="discuss-pagination-select"
          @change="handlePerPageChange"
        >
          <option v-for="val in pagesOptions" :key="val" :value="val">
            {{ val }}
          </option>
        </select>
      </label>
    </div>

    <div class="discuss-pagination-page">
      <template v-if="pageCount > 1">
        <a
          class="discuss-pagination-link"
          :class="{ 'is-disabled': isFirst }"
          @click="prev()"
        >
          &lt;
        </a>
        <select
          :value="filter.page"
          class="discuss-pagination-select"
          @change="handlePageChange"
        >
          <option v-for="val in pageCount" :key="val" :value="val">
            {{ val }}
          </option>
        </select>
        <span>/ {{ pageCount }}</span>
        <a
          class="discuss-pagination-link"
          :class="{ 'is-disabled': isEnd }"
          @click="next()"
          >&gt;</a
        >
      </template>
      <template v-else> 1 / {{ pageCount }} </template>
    </div>
  </div>
</template>
