<template>
  <section class="dynamic-filter-preview-info">
    <header class="dynamic-filter-preview-info__header typo-body-2-bold">
      <slot name="header" />
    </header>

    <wt-divider />

    <div class="dynamic-filter-preview-info__body">
      <slot name="default" />
    </div>
  </section>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.dynamic-filter-preview-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  min-width: 60px;


  &__body {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }
}
</style>
