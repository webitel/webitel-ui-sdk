<template>
  <wt-multi-select
    :label="t('webitelUI.filters.filterValue')"
    :options="AmdResultOptions"
    v-model:model-value="selectValue"
    :v="v$.model"
    data-key="value"
    option-value="value"
  />
  <wt-checkbox
    :label="t('webitelUI.filters.showEmpty')"
    :value="AmdResultEmptyValue"
    v-model:selected="isEmptySelected"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { WtCheckbox, WtMultiSelect } from '@webitel/ui-sdk/components';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { AmdResultOptions } from '../../enums/options/AMDResultOptions';

const AmdResultEmptyValue = 'EMPTY';

const model = defineModel<string[]>();
const { t } = useI18n();

// keeps the select's own model limited to real AmdResultOptions values,
// so it never treats EMPTY as a missing/custom option to reconcile
const selectValue = ref(
	(model.value || []).filter((value) => value !== AmdResultEmptyValue),
);
const isEmptySelected = ref(!!model.value?.includes(AmdResultEmptyValue));

watch(
	[
		selectValue,
		isEmptySelected,
	],
	([select, isEmpty]) => {
		model.value = isEmpty
			? [
					...select,
					AmdResultEmptyValue,
				]
			: select;
	},
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
