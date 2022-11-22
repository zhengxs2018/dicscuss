/// <reference path="../../vue-shim.d.ts" />

import CodeGroup from '../components/CodeGroup.vue'
import CodeGroupItem from '../components/CodeGroupItem.vue'
import NextSteps from '../components/NextSteps.vue'
import ReferenceIndex from '../components/ReferenceIndex.vue'

import type { AppEnhancer } from '../types'

export const setupGlobalComponents: AppEnhancer = ({ app }) => {
  app.component('code-group', CodeGroup)
  app.component('code-group-item', CodeGroupItem)
  app.component('next-steps', NextSteps)
  app.component('reference-index', ReferenceIndex)
}
