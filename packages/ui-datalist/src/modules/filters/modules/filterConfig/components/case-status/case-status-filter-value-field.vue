<template>
  <div>
    <wt-single-select
      :show-clear="false"
      :label="t('cases.status')"
      :search-method="caseStatusesSearchMethod"
      :v="v$.model.selection"
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
      :v="v$.model.conditions"
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
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import {
	caseStatusConditionsSearchMethod,
	caseStatusesSearchMethod,
} from './config.js';

type ModelValue = {
	selection: string;
	conditions: string;
};
const model = defineModel<ModelValue>();
const { t } = useI18n();

const updateSelected = (value) => {
	model.value.selection = value;
	model.value.conditions = '';
};

const getConditionList = (params) => {
	return caseStatusConditionsSearchMethod({
		parentId: model.value.selection,
		...params,
	});
};

const initModel = () => {
	if (!model.value) {
		model.value = {
			selection: '',
			conditions: '',
		};
	}
};
onMounted(() => initModel());

const v$ = useVuelidate(
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
