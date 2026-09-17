<template>
  <wt-single-select
    :clearable="false"
    :label="labelValue"
    :options="CallDirectionFilterOptions"
    v-model:model-value="model"
    :v="!disableValidation && v$.model"
    data-key="value"
    option-value="value"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { WtSingleSelect } from '@webitel/ui-sdk/components';
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { CallDirectionFilterOptions } from '../../enums/options/CallDirectionFilterOptions';

const props = defineProps<{
	disableValidation?: boolean;
}>();

const model = defineModel<string>();
const { t } = useI18n();

const props = defineProps<{
	filterConfig?: WtSysTypeFilterConfig;
	disableValidation?: boolean;
}>();

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

const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();

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
</script>

<style scoped></style>
