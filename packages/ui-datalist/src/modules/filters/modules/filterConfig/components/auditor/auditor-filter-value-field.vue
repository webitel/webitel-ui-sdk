<template>
  <wt-select
    :close-on-select="false"
    :label="labelValue"
    :search-method="props.filterConfig.searchRecords"
    :value="model"
    :v="!disableValidation && v$.model"
    multiple
    use-value-from-options-by-prop="id"
    @input="handleInput"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { WtSelect } from '@webitel/ui-sdk/components';
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';

type ModelValue = number[];

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

const handleInput = (value: ModelValue) => {
	model.value = value;
};
</script>

<style scoped></style>
