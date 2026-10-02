<template>
  <variable-filter-value-preview
    :key="variableValue"
    :value="variableValue"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import VariableFilterValuePreview from './variable-filter-value-preview.vue';
import type { IVariableKeyFilterConfig } from './variableKeyFilterConfig';

const props = defineProps<{
	filterConfig: IVariableKeyFilterConfig;
	value?: unknown;
}>();

const variableValue = computed(
	() => `${props.filterConfig.variableKey}=${props.value ?? ''}`,
);
</script>

<style scoped></style>
