<template>
  <dynamic-filter-config-form-value-input-v2
    v-model:model-value="filterValue"
    :filter-config="filterConfig"
    @update:model-value="onValueChange"
  />
</template>

<script lang="ts" setup>
import { IFilter } from '../classes/Filter';
import { FilterData } from '../classes/Filter';
import { ref, watch } from 'vue';
import DynamicFilterConfigFormValueInputV2 from './dynamic-filter-config-form-value-input-v2.vue';
import deepcopy from 'deep-copy';

const props = defineProps<{
  filterConfig: any;
  filter: IFilter;
}>();

const emit = defineEmits<{
  'update:filter': [FilterData];
  'add:filter': [FilterData];
}>();

const filterName = ref();
const filterLabel = ref('');
const filterValue = ref();

const onValueChange = (v) => {
  filterValue.value = v;
  console.log(filterValue)
  submit();
};

const submit = () => {
  emit('add:filter', {
    name: filterName.value,
    label: filterLabel.value,
    value: filterValue.value,
  });
};

if (props.filter) {
  watch(
    props.filter,
    () => {
      filterName.value = props.filter;
      filterValue.value = deepcopy(props.filter.value);
      filterLabel.value = props.filter.label;
    },
    { immediate: true },
  );
}
</script>
