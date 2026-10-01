<template>
  <variable-filter-value-field
    v-model:model-value="model"
    :disable-validation="disableValidation"
    @update:invalid="emit('update:invalid', $event)"
  />
</template>

<script lang="ts" setup>
import VariableFilterValueField from './variable-filter-value-field.vue';
import type { IVariableKeyFilterConfig } from './variableKeyFilterConfig';

const props = defineProps<{
	filterConfig: IVariableKeyFilterConfig;
	disableValidation?: boolean;
}>();

const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();

const model = defineModel<string>();
model.value = `${props.filterConfig.variableKey}=${model.value ?? ''}`;
</script>

<style scoped></style>
