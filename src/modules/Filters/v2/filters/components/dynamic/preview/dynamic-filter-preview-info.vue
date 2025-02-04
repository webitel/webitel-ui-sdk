<template>
  <section class="dynamic-filter-preview-info">
    <header class="dynamic-filter-preview-info-header">
      {{ props.name }}
    </header>

    <wt-divider />

    <!--    TODO: how to visually represent id/value types? -->
    <ul v-if="isArrayValue">
      <li
        v-for="(el, index) of value"
        :key="index"
      >
        {{ el }}
      </li>
    </ul>

    <article v-else>
      {{ props.value }}
    </article>
  </section>
</template>

<script lang="ts" setup>
import type { FilterName, FilterValue } from '../../../types/Filter';

interface Props {
  name: FilterName;
  value: FilterValue;
}

const props = defineProps<Props>();

const isArrayValue = Array.isArray(props.value);
</script>

<style lang="scss" scoped>
.dynamic-filter-preview-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.dynamic-filter-preview-info-header {
  @extend %typo-subtitle-1;
}
</style>
