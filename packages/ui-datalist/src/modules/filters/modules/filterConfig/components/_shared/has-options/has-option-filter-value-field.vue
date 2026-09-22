<template>
  <wt-single-select
    :options="BooleanOptions"
    v-model:model-value="strModel"
    class="has-option-filter-value-field"
    data-key="value"
    option-value="value"
    v-bind="attrs"
    :label="labelValue"
  />
</template>

<script lang="ts" setup>
import { WtSingleSelect } from '@webitel/ui-sdk/components';
import { computed, useAttrs } from 'vue';
import { useI18n } from 'vue-i18n';

import { WtSysTypeFilterConfig } from '../../../classes/FilterConfig';
import { BooleanOptions } from '../../../enums/options/BooleanFilterOptions';

const props = defineProps<{
	filterConfig?: WtSysTypeFilterConfig;
	hideLabel?: boolean;
	// declared so the generic label the dynamic filter form always sends
	// doesn't leak through $attrs and clobber the name-aware labelValue below
	label?: string;
}>();

const model = defineModel<boolean | null>();

const attrs = useAttrs();

const { t } = useI18n();

const labelValue = computed(() => {
	if (props?.hideLabel) return;
	const value = props?.filterConfig?.showFilterName
		? props?.filterConfig.name
		: 'filterValue';
	return t(`webitelUI.filters.${value}`);
});

const strModel = computed({
	get: () => {
		return typeof model.value === 'boolean' ? String(model.value) : model.value;
	},
	set: (value: string) => {
		if (!value) model.value = null;
		else model.value = value === 'true';
	},
});
</script>

<style scoped></style>
