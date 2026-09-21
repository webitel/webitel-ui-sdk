<template>
  <wt-multi-select
    :label="labelValue"
    :disabled="!hasReadAccess"
    :search-method="lookupSearchMethod"
    :model-value="model"
    :v="!disableValidation && v$.model"
    option-value="id"
    @update:model-value="handleInput"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { WtMultiSelect } from '@webitel/ui-sdk/components';
import { WtObject } from '@webitel/ui-sdk/enums';
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { useFilterReadAccess } from '../../composables/useFilterReadAccess';
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

const { hasReadAccess, gateSearch } = useFilterReadAccess(WtObject.User);
const lookupSearchMethod = gateSearch(searchMethod);

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
	if (!props.disableValidation) v$.value.$touch();
});

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
