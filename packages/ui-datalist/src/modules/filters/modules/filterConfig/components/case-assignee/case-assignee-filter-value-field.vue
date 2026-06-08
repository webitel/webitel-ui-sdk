<template>
  <wt-multi-select
    :label="t('webitelUI.filters.filterValue')"
    :search-method="props.filterConfig.searchRecords"
    :v="v$.model.list"
    v-model:model-value="model.list"
    data-key="id"
    option-value="id"
  />
  <wt-checkbox
    :label="t('reusable.showUnassigned')"
    :selected="model?.unassigned"
    :v="v$.model.unassigned"
    @update:selected="model.unassigned = $event"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { requiredIf } from '@vuelidate/validators';
import { WtCheckbox, WtMultiSelect } from '@webitel/ui-sdk/components';
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { CaseAssigneeFilterConfig } from './index';

type ModelValue = {
	list: string[];
	unassigned: boolean;
};

const model = defineModel<ModelValue>();

const props = defineProps<{
	filterConfig: CaseAssigneeFilterConfig;
}>();

const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();

const { t } = useI18n();

const initModel = () => {
	if (!model.value) {
		model.value = {
			list: [],
			unassigned: false,
		};
	}
};
onMounted(() => initModel());

const v$ = useVuelidate(
	computed(() => ({
		model: {
			list: {
				required: requiredIf(() => !model.value.unassigned),
			},
			unassigned: {
				required: requiredIf(() => !model.value.list.length),
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
