<template>
  <div class="date-time-options-filter-value-field">
    <wt-radio
      v-for="value of radioOpts"
      :key="value"
      :selected="selectedRadioValue"
      :label="t(`webitelUI.filters.datetime.${value}`)"
      :value="value"
      @update:selected="handleRadioChange"
    />
    <wt-datepicker
      v-if="showDatepickers"
      :model-value="absoluteModel?.from"
      :label="t('reusable.from')"
      show-time
      required
			:v="v$.from"
      @update:model-value="changeAbsoluteValue($event, 'from')"
    />
    <wt-datepicker
      v-if="showDatepickers"
      :model-value="absoluteModel?.to"
      :label="t('reusable.to')"
      show-time
      required
			:v="v$.to"
      @update:model-value="changeAbsoluteValue($event, 'to')"
    />
  </div>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { WtRadio } from '@webitel/ui-sdk/components';
import { RelativeDatetimeValue } from '@webitel/ui-sdk/enums';
import { isEmpty } from '@webitel/ui-sdk/scripts';
import { endOfToday, startOfToday } from 'date-fns';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const model = defineModel<
	| RelativeDatetimeValue
	| {
			from: number;
			to: number;
	  }
>();

const emit = defineEmits<{
	'update:invalid': [
		boolean,
	];
}>();

const { t } = useI18n();

const radioOpts = [
	RelativeDatetimeValue.Today,
	RelativeDatetimeValue.ThisWeek,
	RelativeDatetimeValue.ThisMonth,
	RelativeDatetimeValue.Custom,
];

const selectedRadioValue = ref();

const initialize = () => {
	if (!model.value) {
		/* initialize */
		selectedRadioValue.value = radioOpts[0];
		model.value = selectedRadioValue.value;
	} else if (typeof model.value === 'string') {
		/* RelativeDatetimeValue */
		selectedRadioValue.value = model.value;
	} else {
		/* { from, to } */
		selectedRadioValue.value = RelativeDatetimeValue.Custom;
	}
};

initialize();

const absoluteModel = computed(() => {
	return !isEmpty(model.value) && typeof model.value === 'object'
		? model.value
		: undefined;
});

const showDatepickers = computed(() => {
	return selectedRadioValue.value === RelativeDatetimeValue.Custom;
});

const from = computed(() => absoluteModel.value?.from);
const to = computed(() => absoluteModel.value?.to);

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
		from,
		to,
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

const handleRadioChange = (selected: string | number | boolean | object) => {
	const value = selected as RelativeDatetimeValue;
	selectedRadioValue.value = value;
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
		...(model.value as {
			from: number;
			to: number;
		}),
		[prop]: value,
	};

	model.value = newModelValue;
};
</script>

<style scoped>
.date-time-options-filter-value-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
</style>
