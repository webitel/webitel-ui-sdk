<template>
  <div class="dynamic-filter-panel-wrapper">
    <div class="dynamic-filter-panel-wrapper__filters">
      <slot name="filters" />
    </div>

    <div class="dynamic-filter-panel-wrapper__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dynamic-filter-panel-wrapper {
  display: grid;
  grid-gap: var(--spacing-sm);
  align-items: center;
  grid-template-columns: 1fr auto;

  &__filters {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    grid-gap: var(--spacing-sm);
  }

  &__actions {
    display: flex;
    grid-gap: var(--spacing-sm);
  }
}
</style>
