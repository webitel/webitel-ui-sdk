<template>
  <dynamic-filter-config-form-new
    :filter="props.filter"
    :filter-config="filterConfig"
    @submit="submit"
  />
</template>

<script lang="ts" setup>
// Що тут змінилось?
// в розмітці майже все прибралось
// по скрипту hide у сабміті не викликаю


import { ref, watch } from 'vue';
import { FilterData, IFilter } from '../classes/Filter';
import { AnyFilterConfig } from '../modules/filterConfig/classes/FilterConfig';
import { FilterOptionToPreviewApiSearchMethodMap } from '../modules/filterConfig/components';
import DynamicFilterConfigFormNew from './dynamic-filter-config-form-new.vue';

interface Props {
  filter: IFilter;
  filterConfig: AnyFilterConfig;
  readonly?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:filter': [FilterData];
  'delete:filter': [IFilter];
}>();

const localValue = ref();

const fillLocalValue = async (filter = props.filter) => {
  const filterName = props.filter.name;
  const filterValue = filter.value;

  let valueSearchMethod;

  if (props.filterConfig.searchRecords) {
    /* arrow fn here preserves filterConfig class "this" */
    valueSearchMethod = (...params) =>
      props.filterConfig.searchRecords(...params);
  } else {
    valueSearchMethod =
      /* compat */ FilterOptionToPreviewApiSearchMethodMap[filterName];
  }

  if (valueSearchMethod) {
    const { items } = await valueSearchMethod(
      { id: filterValue },
      {
        filterValue,
        filterName,
        filterConfig: props.filterConfig,
      },
    );
    localValue.value = items;
  } else {
    localValue.value = filterValue;
  }
};

watch(
  () => props.filter.value,
  () => {
    fillLocalValue(props.filter);
  },
  {
    immediate: true,
  },
);

const submit = (filter: IFilter) => {
  emit('update:filter', filter);
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
