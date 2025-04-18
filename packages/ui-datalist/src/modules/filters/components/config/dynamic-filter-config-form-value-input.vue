<template>
  <component
    :is="valueComponent"
    v-model:model-value="filterValue"
    :label="label"
    :filter-option="props.filterOption"
    @update:invalid="emit('update:invalid', $event)"
  />
</template>

<script setup lang="ts">
import {computed} from "vue";

import {FilterOption} from "../../enums/FilterOption";
import {FilterName} from "../../types/Filter";
import {FilterOptionToValueComponentMap, TypeExtensionFilterValueField} from "../filter-options";

const filterValue = defineModel<unknown>();

const props = defineProps<{
  filterName: FilterName;
  filterOption: FilterOption;
  label?: string;
}>();

const emit = defineEmits<{
  'update:invalid': [boolean];
}>();

const valueComponent = computed(() => {
  if (props.filterOption?.extensionField) {
    return TypeExtensionFilterValueField;
  }

  return FilterOptionToValueComponentMap[props.filterName];
});
</script>

<style scoped>
</style>
