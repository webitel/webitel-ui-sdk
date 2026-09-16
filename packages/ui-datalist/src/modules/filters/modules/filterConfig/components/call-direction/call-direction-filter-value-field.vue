<template>
  <wt-single-select
    :clearable="false"
    :label="t('webitelUI.filters.filterValue')"
    :options="CallDirectionFilterOptions"
    v-model:model-value="model"
    :v="v$.model"
    data-key="value"
    option-value="value"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { WtSingleSelect } from '@webitel/ui-sdk/components';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { CallDirectionFilterOptions } from '../../enums/options/CallDirectionFilterOptions';

const model = defineModel<string>();
const { t } = useI18n();

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
