<template>
  <div
    class="dynamic-filter-panel-wrapper"
    :class="`dynamic-filter-panel-wrapper--${props.size}`"
  >
    <div class="dynamic-filter-panel-wrapper__filters">
      <slot name="filters" />
    </div>

    <div class="dynamic-filter-panel-wrapper__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentSize } from '../../../../../enums';

const props = withDefaults(defineProps<{
  size?: ComponentSize;
}>(), {
  size: ComponentSize.MD,
});
</script>

<style lang="scss" scoped>
.dynamic-filter-panel-wrapper {
  display: grid;
  grid-gap: var(--spacing-sm);
  align-items: center;
  grid-template-columns: 1fr auto;
}

.dynamic-filter-panel-wrapper__filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  grid-gap: var(--spacing-sm);
}

.dynamic-filter-panel-wrapper__actions {
  display: flex;
  grid-gap: var(--spacing-sm);
}

.dynamic-filter-panel-wrapper {
  &--sm {
    .dynamic-filter-panel-wrapper__filters,
    .dynamic-filter-panel-wrapper__actions, {
      grid-gap: var(--spacing-xs);
    }
  }
}
</style>
