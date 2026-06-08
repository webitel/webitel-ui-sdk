<template>
  <wt-multi-select
    :label="labelValue"
    :search-method="props.filterConfig.searchRecords"
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
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';

const props = defineProps<{
	filterConfig: WtSysTypeFilterConfig;
	disableValidation?: boolean;
}>();

type ModelValue = number[];

const model = defineModel<ModelValue>();

const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();
const { t } = useI18n();

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
v$.value.$touch();

const labelValue = computed(() =>
	t(
		`webitelUI.filters.${
			props?.filterConfig?.showFilterName
				? props?.filterConfig.name
				: 'filterValue'
		}`,
	),
);

onMounted(() => {
	if (!props?.disableValidation) v$.value.$touch();
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
