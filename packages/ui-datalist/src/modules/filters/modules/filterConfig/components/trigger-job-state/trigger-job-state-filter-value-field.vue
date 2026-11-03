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
import { EngineTriggerJobState } from '@webitel/api-services/gen/models';
import { WtMultiSelect } from '@webitel/ui-sdk/components';
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';

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

v$.value.$touch();

const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();

const labelValue = computed(() =>
	t(
		`webitelUI.filters.${
			props?.filterConfig?.showFilterName
				? props?.filterConfig.name
				: 'filterValue'
		}`,
	),
);

/** [Claude] the states a trigger run ends up in, for the trigger logs' result filter */
const options = computed(() =>
	Object.values(EngineTriggerJobState).map((value) => ({
		value,
		label: t(`objects.triggerJobState.${value}`),
	})),
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
</script>

<style scoped></style>
