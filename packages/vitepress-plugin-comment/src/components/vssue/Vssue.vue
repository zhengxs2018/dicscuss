<script lang="ts" setup>
import VssueHeader from './VssueHeader.vue'
import VssueBody from './VssueBody.vue'
</script>

<template>
  <div class="vssue">
    <VssueHeader />
    <VssueBody />
  </div>
</template>

<style>
.vssue {
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
