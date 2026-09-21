<template>
  <wt-multi-select
    v-bind="$attrs"
    :label="labelValue"
    :disabled="!hasReadAccess"
    :search-method="hasReadAccess ? props.filterConfig.searchRecords : undefined"
    :v="!disableValidation && vList"
    :model-value="value.list"
    data-key="id"
    option-value="id"
    @update:model-value="changeListValue"
  />
  <wt-checkbox
    v-if="!props.filterConfig?.hideUnassigned"
    :label="t('reusable.showUnassigned')"
    :selected="!!value.unassigned"
    :v="!disableValidation && vUnassigned"
    @update:selected="handleInput('unassigned', !!$event)"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { requiredIf } from '@vuelidate/validators';
import { WtCheckbox, WtMultiSelect } from '@webitel/ui-sdk/components';
import { WtObject } from '@webitel/ui-sdk/enums';
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useFilterReadAccess } from '../../composables/useFilterReadAccess';
import { IContactGroupFilterConfig } from './index';

type ModelValue = {
	list?: string[];
	unassigned?: boolean | null;
};

const model = defineModel<ModelValue>({
	default: (): ModelValue => ({
		list: [],
		unassigned: null,
	}),
});

const value = computed<ModelValue>(
	() =>
		model.value ?? {
			list: [],
			unassigned: null,
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

const changeListValue = (event: string[]) => {
	if (!event.length && !value.value.unassigned) {
		model.value = {};
		return;
	}
	handleInput('list', event);
};

const props = defineProps<{
	filterConfig: IContactGroupFilterConfig;
	disableValidation?: boolean;
	hideLabel?: boolean;
}>();

const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();

const { t } = useI18n();

const { hasReadAccess } = useFilterReadAccess(WtObject.ContactGroup);

const labelValue = computed(() =>
	props?.hideLabel ? undefined : t('webitelUI.filters.filterValue'),
);

const v$ = useVuelidate<{
	model: ModelValue;
}>(
	computed(() => ({
		model: {
			list: {
				required: requiredIf(() => !value.value.unassigned),
			},
			unassigned: {
				required: requiredIf(
					() =>
						!!props.filterConfig?.hideUnassigned && !value.value.list?.length,
				),
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
