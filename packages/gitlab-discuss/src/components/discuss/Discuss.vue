<script lang="ts" setup>
import { ref, unref, toRef, computed, onBeforeMount } from 'vue'

import {
  useGitlab,
  useActiveProject,
  useActiveIssue,
  useActiveNotes,
} from '@zhengxs/gitlab-vue'

import DiscussIcons from '../base/DiscussIcons.vue'

import DiscussHeader from './DiscussHeader.vue'
import DiscussBody from './DiscussBody.vue'
import DiscussStatus from './DiscussStatus.vue'

const props = defineProps({
  projectId: {
    type: [String, Number],
    required: true,
  },
  issueId: {
    type: [String, Number],
    required: true,
  },
})

const { isLoggedIn } = useGitlab()
const project = useActiveProject(toRef(props, 'projectId'))
const issue = useActiveIssue(toRef(props, 'issueId'))
const notes = useActiveNotes()

const initialed = ref(false)
const loading = ref(false)

const hasError = computed(() => !!(unref(project.error) || unref(issue.error)))

// TODO 区分 404
const status = computed(() => {
  if (loading.value) return 'initial'
  if (hasError.value) return 'error'
  if (isLoggedIn.value) return 'initialed'

  return 'loginRequired'
})

const refresh = async () => {
  try {
    loading.value = true
    await project.refresh()
    await issue.refresh()
    notes.search()
    initialed.value = true
  } finally {
    loading.value = false
  }
}

onBeforeMount(async () => {
  await refresh()
})
</script>

<template>
  <div class="discuss">
    <DiscussIcons />

    <template v-if="isLoggedIn">
      <DiscussHeader />
      <DiscussBody v-if="status === 'initialed'" />
      <DiscussStatus v-else :status="status" />
    </template>
    <template v-else> 请先登录 </template>
  </div>
</template>
