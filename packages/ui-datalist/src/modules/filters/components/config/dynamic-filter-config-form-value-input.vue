<template>
  <component
    :is="props.filterConfig.valueInputComponent"
    :filter-config="props.filterConfig"
    :model-value="filterValue"
    @update:model-value="changeFilterValue"
    @update:invalid="emit('update:invalid', $event)"
  />
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import {AnyFilterConfig} from "../../modules/filterConfig/classes/FilterConfig";

const filterValue = defineModel<unknown>();

const props = defineProps<{
  filterConfig: AnyFilterConfig;
  label?: string;
  modelValue?: AnyFilterConfig;
}>();

const isStaticMode = inject('isStaticMode');

const changeFilterValue = (event) => {
  filterValue.value = event;
  if(isStaticMode?.value) {
    emit('submit', {
      name: props.filterConfig.name,
      label: props.label,
      value: filterValue.value,
    });
  }
}

const emit = defineEmits<{
  'update:invalid': [boolean];
  'submit': object;
}>();
</script>

<style scoped>
</style>
