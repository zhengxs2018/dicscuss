<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'

import Comments from './components/Comments.vue'

const ParentLayout = DefaultTheme.Layout
</script>

<template>
  <ParentLayout>
    <template #doc-footer-before>
      <ClientOnly>
        <Comments />
      </ClientOnly>
    </template>
  </ParentLayout>
</template>
