<template>
  <component
    :is="props.filterConfig.valueInputComponent"
    :filter-config="props.filterConfig"
    :model-value="filterValue"
    @test="test"
    @update:model-value="test"
    @update:invalid="emit('update:invalid', $event)"
  />
</template>

<script lang="ts" setup>
import {AnyFilterConfig} from "../../modules/filterConfig/classes/FilterConfig";

const filterValue = defineModel<unknown>();

const props = defineProps<{
  filterConfig: AnyFilterConfig;
  label?: string;
  modelValue?: AnyFilterConfig;
}>();


const test = (event) => {
  filterValue.value = event;
  emit('submit', {
    name: props.filterConfig.name,
    label: props.label,
    value: filterValue.value,
  });

}

const emit = defineEmits<{
  'update:invalid': [boolean];
  'submit': object;
}>();
</script>

<style scoped>
</style>
