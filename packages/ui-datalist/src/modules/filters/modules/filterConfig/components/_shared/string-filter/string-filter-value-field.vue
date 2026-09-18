<template>
  <wt-input-text
    v-model:model-value="model"
    :label="labelValue"
    :v="!disableValidation && v$.model"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import type { FilterConfig } from '../../../classes/FilterConfig';

type ModelValue = string;

const props = defineProps<{
	filterConfig?: FilterConfig;
	disableValidation?: boolean;
}>();

const model = defineModel<ModelValue>();
if (!model.value) {
	model.value = '';
}

const { t } = useI18n();

const labelValue = computed(() => {
	const value = props.filterConfig?.showFilterName
		? props.filterConfig.name
		: 'filterValue';
	return t(`webitelUI.filters.${value}`);
});

const v$ = useVuelidate(
	computed(() => ({
		model: {
			required,
		},
	})),
	{
		model,
	},
	{
		$autoDirty: true,
	},
);

if (!props.disableValidation) v$.value.$touch();
const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();

watch(
	() => v$.value.$invalid,
	(invalid) => {
		emit('update:invalid', invalid);
	},
	{
		immediate: true,
	},
);
</script>

<style scoped></style>
