<template>
  <wt-multi-select
    :label="labelValue"
    :search-method="props.filterConfig.searchRecords"
    :model-value="selectedOptions"
    :v="!disableValidation && v$.model"
    chips-view
    data-key="name"
    option-label="name"
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

/**
 * Queue tags are free-form strings, so the filter stores names rather than ids
 * and there is nothing to look up on restore — a name is its own label.
 */
interface TagOption {
	name: string;
}

type ModelValue = string[];

const props = defineProps<{
	filterConfig: WtSysTypeFilterConfig;
	disableValidation?: boolean;
}>();

const model = defineModel<ModelValue>();

const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();
const { t } = useI18n();

const labelValue = computed(() =>
	t(
		`webitelUI.filters.${
			props?.filterConfig?.showFilterName
				? props?.filterConfig.name
				: 'filterValue'
		}`,
	),
);

const selectedOptions = computed<TagOption[]>(() =>
	(model.value ?? []).map((name) => ({
		name,
	})),
);

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

const handleInput = (value: Array<TagOption | string>) => {
	model.value = value.map((tag) => (typeof tag === 'string' ? tag : tag.name));
};
</script>

<style scoped></style>
