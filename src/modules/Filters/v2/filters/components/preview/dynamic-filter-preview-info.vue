<template>
  <section class="dynamic-filter-preview-info">
    <header class="dynamic-filter-preview-info__header">
      <slot name="header"/>
    </header>

    <wt-divider />

    <div class="dynamic-filter-preview-info__body">
      <slot name="default" />
    </div>

  </section>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.dynamic-filter-preview-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);

  &__header {
    @extend %typo-subtitle-1;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }
}
</style>
