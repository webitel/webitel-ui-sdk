<template>
  <div
    :class="{
      'date-time-options-filter-value-field--range': hidePresets,
    }"
    class="date-time-options-filter-value-field"
  >
    <template v-if="!hidePresets">
      <wt-radio
        v-for="value of radioOpts"
        :key="value"
        :selected="selectedRadioValue"
        :label="t(`webitelUI.filters.datetime.${value}`)"
        :value="value"
        @update:selected="handleRadioChange"
      />
    </template>
    <wt-datepicker
      v-if="showDatepickers"
      :model-value="absoluteModel?.from"
      :label="t('reusable.from')"
      show-time
      required
      :v="!disableValidation && v$.from"
      @update:model-value="changeAbsoluteValue($event, 'from')"
    />
    <wt-datepicker
      v-if="showDatepickers"
      :model-value="absoluteModel?.to"
      :label="t('reusable.to')"
      show-time
      required
      :v="!disableValidation && v$.to"
      @update:model-value="changeAbsoluteValue($event, 'to')"
    />
  </div>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { WtRadio } from '@webitel/ui-sdk/components';
import { RelativeDatetimeValue } from '@webitel/ui-sdk/enums';
import { isEmpty, normalizeToTimestamp } from '@webitel/ui-sdk/scripts';
import { endOfToday, startOfToday } from 'date-fns';
import { computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import type { IDateRangeFilterConfig } from '../../../../classes/FilterConfig';

const model = defineModel<
	| RelativeDatetimeValue
	| {
			from: number;
			to: number;
	  }
>();

const props = defineProps<{
	filterConfig?: IDateRangeFilterConfig;
	disableValidation?: boolean;
	/**
	 * @description
	 * Suppresses the preselected preset. The static filters panel lists every
	 * configured filter, so a field that seeds itself would apply a filter the
	 * user never set.
	 */
	disableDefaultValue?: boolean;
	staticView?: boolean;
}>();

const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();

const { t } = useI18n();

const hidePresets = computed(
	() => !!props.staticView && !!props.filterConfig?.hidePresets,
);

const radioOpts = [
	RelativeDatetimeValue.Today,
	RelativeDatetimeValue.ThisWeek,
	RelativeDatetimeValue.ThisMonth,
	RelativeDatetimeValue.Custom,
];

if (!props.disableDefaultValue && isEmpty(model.value)) {
	model.value = radioOpts[0];
}

const selectedRadioValue = computed<string>(() => {
	if (isEmpty(model.value)) return '';

	return typeof model.value === 'string'
		? model.value
		: RelativeDatetimeValue.Custom;
});

const absoluteModel = computed(() => {
	if (isEmpty(model.value)) return undefined;

	if (typeof model.value === 'object') return model.value;

	return {
		from: normalizeToTimestamp(model.value, {
			round: 'start',
		}),
		to: normalizeToTimestamp(model.value, {
			round: 'end',
		}),
	};
});

const showDatepickers = computed(() => {
	return (
		hidePresets.value ||
		selectedRadioValue.value === RelativeDatetimeValue.Custom
	);
});

const v$ = useVuelidate(
	computed(() => ({
		from: showDatepickers.value
			? {
					required,
				}
			: {},
		to: showDatepickers.value
			? {
					required,
				}
			: {},
	})),
	{
		from: computed(() => absoluteModel.value?.from),
		to: computed(() => absoluteModel.value?.to),
	},
	{
		$autoDirty: true,
	},
);

onMounted(() => {
	if (!props.disableValidation) v$.value.$touch();
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

const handleRadioChange = (selected: string | number | boolean | object) => {
	const value = selected as RelativeDatetimeValue;

	if (value === RelativeDatetimeValue.Custom) {
		model.value = {
			from: startOfToday().getTime(),
			to: endOfToday().getTime(),
		};
	} else {
		model.value = value;
	}
};

const changeAbsoluteValue = (value: number, prop: 'from' | 'to') => {
	const newModelValue = {
		...(absoluteModel.value as {
			from: number;
			to: number;
		}),
		[prop]: value,
	};

	model.value = newModelValue;
};
</script>

<style lang="scss" scoped>
.date-time-options-filter-value-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);

  &--range {
    flex-direction: row;
    align-items: start;

    > * {
      flex: 1;
      min-width: 0;
    }
  }
}
</style>
