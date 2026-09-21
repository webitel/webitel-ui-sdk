<template>
  <div>
    <wt-single-select
      :show-clear="false"
      :label="t('cases.reason')"
      :disabled="!hasReadAccess"
      :search-method="groupsSearchMethod"
      :v="!disableValidation && vSelection"
      :model-value="value.selection"
      data-key="id"
      option-value="id"
      @update:model-value="updateSelected"
    />

    <wt-multi-select
      v-if="value.selection"
      :key="value.selection"

      :disabled="!hasReadAccess || !value.selection"
      :label="t('webitelUI.filters.filterValue')"
      :search-method="conditionsSearchMethod"
      :v="!disableValidation && vConditions"
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
import { WtObject } from '@webitel/ui-sdk/enums';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useFilterReadAccess } from '../../composables/useFilterReadAccess';
import type { CaseCloseReasonGroupsFilterConfig } from './filterConfig';

const props = defineProps<{
	filterConfig: CaseCloseReasonGroupsFilterConfig;
	disableValidation?: boolean;
}>();

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

const { hasReadAccess, gateSearch } = useFilterReadAccess(
	WtObject.CloseReasonGroup,
);

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
	return props.filterConfig.searchConditions({
		parentId: value.value.selection,
		...params,
	});
};

const groupsSearchMethod = gateSearch(props.filterConfig.searchGroups);
const conditionsSearchMethod = gateSearch(getConditionList);

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

if (!props?.disableValidation) v$.value.$touch();
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
