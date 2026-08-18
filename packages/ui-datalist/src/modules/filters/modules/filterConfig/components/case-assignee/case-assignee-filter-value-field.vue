<template>
  <wt-multi-select
    :label="t('webitelUI.filters.filterValue')"
    :search-method="props.filterConfig.searchRecords"
    :v="vList"
    :model-value="value.list"
    data-key="id"
    option-value="id"
    @update:model-value="handleInput('list', $event)"
  />
  <wt-checkbox
    :label="t('reusable.showUnassigned')"
    :selected="value.unassigned"
    :v="vUnassigned"
    @update:selected="handleInput('unassigned', !!$event)"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { requiredIf } from '@vuelidate/validators';
import { WtCheckbox, WtMultiSelect } from '@webitel/ui-sdk/components';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { CaseAssigneeFilterConfig } from './index';

type ModelValue = {
	list: string[];
	unassigned: boolean;
};

const model = defineModel<ModelValue>({
	default: (): ModelValue => ({
		list: [],
		unassigned: false,
	}),
});

const value = computed<ModelValue>(
	() =>
		model.value ?? {
			list: [],
			unassigned: false,
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

const props = defineProps<{
	filterConfig: CaseAssigneeFilterConfig;
}>();

const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();

const { t } = useI18n();

const v$ = useVuelidate<{
	model: ModelValue;
}>(
	computed(() => ({
		model: {
			list: {
				required: requiredIf(() => !value.value.unassigned),
			},
			unassigned: {
				required: requiredIf(() => !value.value.list.length),
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

const vList = computed(() => {
	const modelValidation = v$.value.model;
	if (!modelValidation) return undefined;
	return modelValidation.list;
});
const vUnassigned = computed(() => {
	const modelValidation = v$.value.model;
	if (!modelValidation) return undefined;
	return modelValidation.unassigned;
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
