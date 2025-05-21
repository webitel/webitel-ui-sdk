<template>
  <component
    :is="props.filterConfig.valueInputComponent"
    v-model:model-value="filterValue"
    :filter-config="props.filterConfig"
    :label="props.filterConfig.label"
    @update:model-value="onValueChange"
  />
</template>

<script lang="ts" setup>

import { IFilter } from '../../classes/Filter';
import { BaseFilterConfig } from '../modules/filterConfig';

const props = defineProps<{
  filterConfigs?: BaseFilterConfig[];
  filterConfig?: BaseFilterConfig;
  filter?: IFilter;
}>();


const filterValue = defineModel(); // важно

const emit = defineEmits(['update:model-value']);


const onValueChange = (v) => {
  filterValue.value = v;
  emit('update:model-value', v);
};

</script>

<style lang="scss" scoped>
.wt-chip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2xs);
}

.wt-loader {
  margin: auto;
}
</style>
