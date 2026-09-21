<template>
  <wt-multi-select
    v-bind="$attrs"
    :label="labelValue"
    :disabled="!hasReadAccess"
    :search-method="hasReadAccess ? props.filterConfig.searchRecords : undefined"
    :v="!disableValidation && v$?.model"
    :model-value="model"
    option-label="label"
    data-key="label"
    @update:model-value="handleInput"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { WtMultiSelect } from '@webitel/ui-sdk/components';
import { WtObject } from '@webitel/ui-sdk/enums';
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { WtSysTypeFilterConfig } from '../../classes/FilterConfig';
import { useFilterReadAccess } from '../../composables/useFilterReadAccess';

const props = defineProps<{
	filterConfig: WtSysTypeFilterConfig;
	disableValidation?: boolean;
	hideLabel?: boolean;
}>();

type ModelValue = number[];

const model = defineModel<ModelValue>();

const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();
const { t } = useI18n();

const { hasReadAccess } = useFilterReadAccess(WtObject.Contact);

const labelValue = computed(() =>
	props?.hideLabel ? undefined : t('webitelUI.filters.filterValue'),
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

onMounted(() => {
	if (!props?.disableValidation) v$.value.$touch();
});

watch(
	() => v$?.value?.$invalid,
	(invalid) => {
		if (v$?.value) {
			emit('update:invalid', invalid);
		}
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
