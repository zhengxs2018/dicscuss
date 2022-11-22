<script lang="ts" setup>
import { PropType } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  steps: Array as PropType<
    Array<{
      text: string
      caption: string
      link: string
    }>
  >,
})
</script>

<template>
  <div class="vt-box-container next-steps">
    <a
      v-for="(step, i) in steps"
      class="vt-box"
      :href="step.link ? withBase(step.link) : 'javascript: void 0;'"
      :key="i"
    >
      <p class="next-steps-link">{{ step.text }}</p>
      <p class="next-steps-caption">{{ step.caption }}</p>
    </a>
  </div>
</template>

<style>
.vt-box-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.vt-box-container .vt-box {
  background-color: var(--vp-c-bg-soft);
  transition: color 0.5s, background-color 0.5s;
  padding: 28px 36px;
  border-radius: 8px;
  flex: 0 32%;
  font-size: 14px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .vt-box-container .vt-box {
    flex: 0 100%;
    margin-bottom: 20px;
  }
}

.next-steps {
  margin-top: 3rem;
}

.next-steps .vt-box {
  border: 1px solid var(--vp-c-bg-soft);
}

.next-steps .vt-box:hover {
  border-color: var(--vp-c-brand-light);
  transition: border-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.next-steps-link {
  font-size: 20px;
  line-height: 1.4;
  letter-spacing: -0.02em;
  margin-bottom: 0.75em;
  display: block;
  color: var(--vp-c-brand);
}

.next-steps-caption {
  margin-bottom: 0;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
}
</style>
