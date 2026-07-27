<template>
  <div>
    <wt-single-select
      :show-clear="false"
      :label="t('cases.reason')"
      :search-method="caseCloseReasonsGroupsSearchMethod"
      :v="vSelection"
      :model-value="model?.selection"
      data-key="id"
      option-value="id"
      @update:model-value="updateSelected"
    />

    <wt-multi-select
      v-if="model?.selection"
      :key="model.selection"

      :disabled="!model.selection"
      :label="t('webitelUI.filters.filterValue')"
      :search-method="getConditionList"
      :v="vConditions"
      v-model:model-value="model.conditions"
      data-key="id"
      option-value="id"
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
	caseCloseReasonsGroupsSearchMethod,
	caseCloseReasonsSearchMethod,
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

const updateSelected = (value) => {
	model.value.selection = value;
	model.value.conditions = '';
};

const getConditionList = (params) => {
	return caseCloseReasonsSearchMethod({
		parentId: model.value.selection,
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
