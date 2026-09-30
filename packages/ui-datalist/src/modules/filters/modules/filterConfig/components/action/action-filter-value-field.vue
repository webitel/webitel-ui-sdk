<template>
  <wt-multi-select
    :label="labelValue"
    :options="options"
    v-model:model-value="model"
    :v="!disableValidation && v$.model"
    chips-view
    data-key="value"
    option-label="label"
    option-value="value"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { WtMultiSelect } from '@webitel/ui-sdk/components';
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { useActionOptions } from '../../composables/useActionOptions';

const model = defineModel<string[]>();
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

const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();

const labelKey = computed(() =>
	props?.filterConfig?.showFilterName ? props.filterConfig.name : 'filterValue',
);

const labelValue = computed(() => t(`webitelUI.filters.${labelKey.value}`));

const { options } = useActionOptions();

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
</script>

<style scoped></style>
