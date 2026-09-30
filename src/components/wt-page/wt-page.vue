<template>
  <div class="wt-page">
    <div v-if="$slots.header" class="wt-page__header">
      <slot name="header" />
    </div>
    <div class="wt-page__body">
      <!-- @slot Layouts of the page -->
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Top structural level of the interface: header + body, where the body
 * distributes its width between one or more `wt-layout`s.
 */
defineSlots<{
	header?: () => unknown;
	default?: () => unknown;
}>();
</script>

<style scoped>
.wt-page {
  display: flex;
  flex-direction: column;
  gap: var(--wt-page-gap);
  box-sizing: border-box;
  background: var(--wt-page-background-color);
  padding: var(--wt-page-padding-y) var(--wt-page-padding-x);
  width: 100%;
  height: 100%;
  min-height: 0;
}

.wt-page__header {
  flex: 0 0 auto;
}

.wt-page__body {
  display: flex;
  position: relative;
  flex: 1 1 auto;
  gap: var(--wt-page-body-gap);
  box-sizing: border-box;
  background: var(--wt-page-body-background-color);
  padding: var(--wt-page-body-padding-y) var(--wt-page-body-padding-x);
  min-width: 0;
  min-height: 0;
}
</style>
