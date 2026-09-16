<template>
  <div>
    <wt-single-select
      :show-clear="false"
      :label="t('cases.status')"
      :search-method="caseStatusesSearchMethod"
      :v="vSelection"
      :model-value="value.selection"
      data-key="id"
      option-value="id"
      @update:model-value="updateSelected"
    />

    <wt-multi-select
      v-if="value.selection"
      :key="value.selection"
      :disabled="!value.selection"
      :label="t('webitelUI.filters.filterValue')"
      :search-method="getConditionList"
      :v="vConditions"
      :model-value="value.conditions"
      data-key="id"
      option-value="id"
      @update:model-value="handleInput('conditions', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { WtMultiSelect, WtSingleSelect } from '@webitel/ui-sdk/components';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import {
	caseStatusConditionsSearchMethod,
	caseStatusesSearchMethod,
} from './config.js';

type ModelValue = {
	selection: string;
	conditions: string;
};
const model = defineModel<ModelValue>({
	default: (): ModelValue => ({
		selection: '',
		conditions: '',
	}),
});
const { t } = useI18n();

const value = computed<ModelValue>(
	() =>
		model.value ?? {
			selection: '',
			conditions: '',
		},
);

const handleInput = <K extends keyof ModelValue>(
	key: K,
	newFieldValue: ModelValue[K],
) => {
	model.value = {
		...value.value,
		[key]: newFieldValue,
	};
};

const updateSelected = (selection: string) => {
	model.value = {
		selection,
		conditions: '',
	};
};

const getConditionList = (params: Record<string, unknown>) => {
	return caseStatusConditionsSearchMethod({
		parentId: value.value.selection,
		...params,
	});
};

const v$ = useVuelidate<{
	model: ModelValue;
}>(
	computed(() => ({
		model: {
			selection: {
				required,
			},
			conditions: {
				required,
			},
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

const vSelection = computed(() => {
	const modelValidation = v$.value.model;
	if (!modelValidation) return undefined;
	return modelValidation.selection;
});
const vConditions = computed(() => {
	const modelValidation = v$.value.model;
	if (!modelValidation) return undefined;
	return modelValidation.conditions;
});

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
