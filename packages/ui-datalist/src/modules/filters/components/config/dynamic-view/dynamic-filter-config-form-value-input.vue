<template>
  <component
    :is="props.filterConfig.valueInputComponent"
    v-model:model-value="filterValue"
    :label="label"
    :filter-config="props.filterConfig"
    @update:invalid="emit('update:invalid', $event)"
  />
</template>

<script setup lang="ts">
import {AnyFilterConfig} from "../../../modules/filterConfig/classes/FilterConfig";

const filterValue = defineModel<unknown>();

const props = defineProps<{
  filterConfig: AnyFilterConfig;
  label?: string;
}>();

const emit = defineEmits<{
  'update:invalid': [boolean];
}>();
</script>

<style scoped>
</style>
