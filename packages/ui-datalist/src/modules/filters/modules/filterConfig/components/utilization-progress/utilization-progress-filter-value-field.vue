<template>
  <wt-single-select
    :label="labelValue"
    :options="UtilizationProgressOptions"
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
import UtilizationProgressOptions from '../../enums/options/UtilizationProgressOptions';

const model = defineModel<string>();
const { t } = useI18n();

const props = defineProps<{
	filterConfig?: WtSysTypeFilterConfig;
	disableValidation?: boolean;
}>();

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

const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();

onMounted(() => {
	if (!props?.disableValidation) v$.value.$touch();
});

const labelValue = computed(() =>
	t(
		`webitelUI.filters.${
			props?.filterConfig?.showFilterName
				? props?.filterConfig.name
				: 'filterValue'
		}`,
	),
);

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
