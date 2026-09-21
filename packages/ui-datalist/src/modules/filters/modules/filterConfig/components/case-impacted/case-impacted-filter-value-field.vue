<template>
  <wt-multi-select
    :label="t('webitelUI.filters.filterValue')"
    :disabled="!hasReadAccess"
    :search-method="hasReadAccess ? searchMethod : undefined"
    :v="!disableValidation && v$.model"
    :model-value="model"
    option-value="id"
    @update:model-value="handleInput"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { WtMultiSelect } from '@webitel/ui-sdk/components';
import { WtObject } from '@webitel/ui-sdk/enums';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useFilterReadAccess } from '../../composables/useFilterReadAccess';

import { searchMethod } from './config.js';

type ModelValue = number[];

const props = defineProps<{
	disableValidation?: boolean;
}>();

const model = defineModel<ModelValue>();

const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();
const { t } = useI18n();

const { hasReadAccess } = useFilterReadAccess(WtObject.Contact);

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
if (!props?.disableValidation) v$.value.$touch();
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
