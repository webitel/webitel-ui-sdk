<template>
  <section class="dynamic-filter-preview-info">
    <header class="dynamic-filter-preview-info-header">
      {{ props.name }}
    </header>

    <wt-divider />

    <component
      :is="getFilterValueComponent(props.name)"
      v-if="props.value"
      :value="props.value" />


<!--    <article v-else>-->
<!--      {{ props.value }}-->
<!--    </article>-->
  </section>
</template>

<script lang="ts" setup>
import type { FilterName, FilterValue } from '../../types/Filter';
import userFilterValuePreview from '../values/users/user-filter-value-preview.vue';

interface Props {
  name: FilterName;
  value: FilterValue;
}

const props = defineProps<Props>();

const getFilterValueComponent = (filterName: FilterName) => {
  switch (filterName) {
    case 'user':
      return userFilterValuePreview;
    default:
  }
};
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
