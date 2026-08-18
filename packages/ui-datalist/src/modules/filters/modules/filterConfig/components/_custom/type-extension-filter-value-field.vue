<template>
  <wt-type-extension-value-input
    v-bind="attrs"
    v-model:model-value="model"
    :field="props.filterConfig.field"
    :required="false"
    :v="v$.model"
  >
    <template #[WtTypeExtensionFieldKind.Boolean]="{ defaultProps }">
      <has-option-filter-value-field v-bind="defaultProps" v-model:model-value="booleanModel"/>
    </template>
    <template #[WtTypeExtensionFieldKind.Select]="{ defaultProps }">
      <wt-single-select
        v-bind="defaultProps"
        :v="v$.model"
        :model-value="
          model ??
          [] /* so that component won't break when model is nullish at init */
        "
        :search-method="searchRecords"
        :required="false /* https://github.com/webitel/webitel-ui-sdk/pull/1359#discussion_r3180877255 */"
        option-value="id"
        @update:model-value="model = $event"
      />
    </template>
    <template #[WtTypeExtensionFieldKind.Multiselect]="{ defaultProps }">
      <wt-multi-select
        v-bind="defaultProps"
        :v="v$.model"
        :model-value="
          model ??
          [] /* so that component won't break when model is nullish at init */
        "
        :search-method="searchRecords"

        :required="false /* https://github.com/webitel/webitel-ui-sdk/pull/1359#discussion_r3180877255 */"
        option-value="id"
        @update:model-value="model = $event"
      />
    </template>
    <template #[WtTypeExtensionFieldKind.Calendar]>
      <date-time-options-filter-value-field v-model:model-value="dateTimeModel" />
    </template>
  </wt-type-extension-value-input>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import {
	WtSingleSelect,
	WtTypeExtensionValueInput,
} from '@webitel/ui-sdk/components';
import {
	type RelativeDatetimeValue,
	WtTypeExtensionFieldKind,
} from '@webitel/ui-sdk/enums'; // DO NOT REMOVE THIS IMPORT!! : Webstorm lies you, import is used for dynamic slot computation
import { computed, useAttrs, watch } from 'vue';

import type { FilterConfigSearchMethodParams } from '../../classes/FilterConfig';
import DateTimeOptionsFilterValueField from '../_shared/date-time-filter/date-time-options/date-time-options-filter-value-field.vue';
import HasOptionFilterValueField from '../_shared/has-options/has-option-filter-value-field.vue';
import { ITypeExtensionFilterConfig } from './index';

const model = defineModel<unknown>();

const props = defineProps<{
	filterConfig: ITypeExtensionFilterConfig;
}>();

const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();

const attrs = useAttrs();

const searchRecords = async (...params: FilterConfigSearchMethodParams) =>
	(await props.filterConfig.searchRecords?.(...params)) ?? {
		items: [],
	};

const booleanModel = computed({
	get: () => model.value as boolean | null | undefined,
	set: (value) => {
		model.value = value;
	},
});

/* the filter value is dynamically shaped by field kind;
   the Calendar branch always stores a datetime value */
const dateTimeModel = computed({
	get: () =>
		model.value as
			| RelativeDatetimeValue
			| {
					from: number;
					to: number;
			  },
	set: (value) => {
		model.value = value;
	},
});

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
