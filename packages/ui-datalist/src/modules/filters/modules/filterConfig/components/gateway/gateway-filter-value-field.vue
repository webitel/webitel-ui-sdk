<template>
  <wt-multi-select
    :label="labelValue"
    :search-method="searchGateway"
    :v="!disableValidation && v$.model"
    :model-value="model"
    option-value="id"
    @update:model-value="handleInput"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { WtMultiSelect } from '@webitel/ui-sdk/components';
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { searchMethod } from './config.js';

type ModelValue = number[];

const model = defineModel<ModelValue>();

const props = defineProps<{
	filterConfig?: WtSysTypeFilterConfig;
	disableValidation?: boolean;
}>();

const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();
const { t } = useI18n();

const labelValue = computed(() => {
	const value = props?.filterConfig?.showFilterName
		? props?.filterConfig.name
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

onMounted(() => {
	if (!props?.disableValidation) v$.value.$touch();
});

const searchGateway = async (params: { search?: string }) => {
	return params.search
		? await searchMethod({
				name: params.search,
			})
		: await searchMethod(params);
};

watch(
	() => v$.value.$invalid,
	(invalid) => {
		emit('update:invalid', invalid);
	},
	{
		immediate: true,
	},
);

const handleInput = (value: ModelValue) => {
	model.value = value;
};
</script>

<style scoped></style>
