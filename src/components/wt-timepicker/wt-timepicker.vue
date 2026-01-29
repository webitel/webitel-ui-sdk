<template>
  <div
    :class="{ 'wt-timepicker--invalid': invalid }"
    class="wt-timepicker"
  >
    <wt-label
      v-if="label || !noLabel"
      :invalid="invalid"
      v-bind="labelProps"
    >
      <!-- @slot Custom input label -->
      <slot
        name="label"
        v-bind="{ label }"
      >
        {{ requiredLabel }}
      </slot>
    </wt-label>
    <div class="wt-timepicker__wrapper">

<!--      [https://webitel.atlassian.net/browse/WTEL-6651]-->

<!--      <wt-time-input-->
<!--        v-if="isDay"-->
<!--        :disabled="disabled"-->
<!--        :label="labelDays"-->
<!--        :max-value="dateMode ? null : 365"-->
<!--        :v="v"-->
<!--        :value="day"-->
<!--        hide-input-info-->
<!--        @input="day = $event"-->
<!--      />-->
      <wt-time-input
        v-if="isHour"
        v-model:model-value="hour"
        :disabled="disabled"
        :label="labelHours"
        :max-value="dateMode ? null : 23"
        :v="v"
        hide-input-info
        @blur="onHoursBlurEvent"
      />
      <wt-time-input
        v-if="isMin"
        v-model:model-value="min"
        :disabled="disabled"
        :label="labelMin"
        :max-value="59"
        :v="v"
        hide-input-info
      />
      <wt-time-input
        v-if="isSec"
        v-model:model-value="sec"
        :disabled="disabled"
        :label="labelSec"
        :max-value="59"
        :v="v"
        hide-input-info
      />
    </div>
    <wt-message
      v-if="isValidation && validationText"
      :color="validationTextColor"
      :variant="MessageVariant.SIMPLE"
      :size="ComponentSize.SM"
    >
      {{ validationText }}
    </wt-message>
  </div>
</template>

<script setup lang="ts">
import type { RegleFieldStatus } from '@regle/core';
import { computed, nextTick, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';

import { ComponentSize, MessageVariant } from '../../enums';
import { useValidation } from '../../mixins/validationMixin/useValidation';

// const SEC_IN_DAY = 60 * 60 * 24;
const SEC_IN_HOUR = 60 * 60;
const SEC_IN_MIN = 60;

interface WtTimepickerProps {
	/**
	 * Time value in seconds (not milliseconds!)
	 */
	modelValue?: string | number;
	/**
	 * If dateMode is true, timepicker asserts value is timestamp and displays/changes timestamp value
	 */
	dateMode?: boolean;
	/**
	 * if passed, replaces "day", "hour", "min", "sec" with a single label + format prop value
	 */
	label?: string;
	/**
	 * Time format, can be "hh:mm:ss", "mm:ss", "ss"
	 */
	format?: string;
	/**
	 * Native input disabled attribute
	 */
	disabled?: boolean;
	/**
	 * Object with props, passed down to wt-label as props
	 */
	labelProps?: Record<string, unknown>;
	/**
	 * Hide label
	 */
	noLabel?: boolean;
	/**
	 * Native input required attribute
	 */
	required?: boolean;
	/**
	 * Vuelidate validation object
	 */
	v?: Record<string, unknown>;
	/**
	 * Regle validation object
	 */
	regleValidation?: RegleFieldStatus<number>;
	/**
	 * Custom validators for vuelidate
	 */
	customValidators?: unknown[];
}

const props = withDefaults(defineProps<WtTimepickerProps>(), {
	modelValue: 0,
	dateMode: false,
	label: '',
	format: 'hh:mm:ss',
	disabled: false,
	labelProps: () => ({}),
	noLabel: false,
	required: false,
	v: null,
	regleValidation: null,
	customValidators: () => [],
});

const emit = defineEmits<{
	'update:modelValue': [
		value: number,
	];
}>();

const { t } = useI18n();

const { v, customValidators, regleValidation } = toRefs(props);

const { isValidation, invalid, validationText, validationTextColor } =
	useValidation({
		v,
		customValidators,
		regleValidation,
	});

// isDay() {
//   return this.format.includes('dd');
// },
const isHour = computed(() => props.format.includes('hh'));
const isMin = computed(() => props.format.includes('mm'));
const isSec = computed(() => props.format.includes('ss'));

// labelDays() {
//   if (this.noLabel) return null;
//   return this.label ? null : this.$t('webitelUI.timepicker.day');
// },
const labelHours = computed(() => {
	if (props.noLabel) return null;
	return props.label ? null : t('webitelUI.timepicker.hour');
});

const labelMin = computed(() => {
	if (props.noLabel) return null;
	return props.label ? null : t('webitelUI.timepicker.min');
});

const labelSec = computed(() => {
	if (props.noLabel) return null;
	return props.label ? null : t('webitelUI.timepicker.sec');
});

// https://webitel.atlassian.net/browse/WTEL-6651?focusedCommentId=664296
// There is no need to enter days at the moment, but functionality is reserved for future

// day: {
//   get() {
//     return this.dateMode
//       ? new Date(+this.value).getDay()
//       : Math.floor(this.value / SEC_IN_DAY);
//   },
//   set(value) {
//     const newValue = this.dateMode
//       ? new Date(this.value).setDate(value)
//       : this.value - this.day * SEC_IN_DAY + value * SEC_IN_DAY;
//     this.$emit('input', newValue);
//   },
// },

const hour = computed({
	get() {
		return props.dateMode
			? new Date(+props.modelValue).getHours()
			: Math.floor(+props.modelValue / SEC_IN_HOUR);
		//      : Math.floor((this.value % SEC_IN_DAY) / SEC_IN_HOUR);
	},
	set(value: number) {
		const newValue = props.dateMode
			? new Date(+props.modelValue).setHours(value)
			: +props.modelValue - hour.value * SEC_IN_HOUR + value * SEC_IN_HOUR;
		emit('update:modelValue', newValue);
	},
});

const min = computed({
	get() {
		return props.dateMode
			? new Date(+props.modelValue).getMinutes()
			: Math.floor((+props.modelValue / SEC_IN_MIN) % 60);
	},
	set(value: number) {
		const newValue = props.dateMode
			? new Date(+props.modelValue).setMinutes(value)
			: +props.modelValue - min.value * SEC_IN_MIN + value * SEC_IN_MIN;
		emit('update:modelValue', newValue);
	},
});

const sec = computed({
	get() {
		return props.dateMode
			? new Date(+props.modelValue).getSeconds()
			: Math.floor(+props.modelValue % 60);
	},
	set(value: number) {
		const newValue = props.dateMode
			? new Date(+props.modelValue).setSeconds(value)
			: +props.modelValue - sec.value + +value;
		emit('update:modelValue', newValue);
	},
});

const requiredLabel = computed(() => {
	return props.required
		? `${props.label} (${props.format})*`
		: `${props.label} (${props.format})`;
});

const onHoursBlurEvent = () => {
	const newValue = props.dateMode
		? new Date(+props.modelValue).setHours(hour.value)
		: +props.modelValue - hour.value * SEC_IN_HOUR + hour.value * SEC_IN_HOUR;

	emit('update:modelValue', 0);
	nextTick(() => {
		emit('update:modelValue', newValue);
	});
};
</script>

<style scoped>
.wt-timepicker {
  display: flex;
  flex-direction: column;
}

.wt-timepicker__wrapper {
  display: flex;
}

.wt-timepicker__wrapper > * {
  width: var(--timepicker-input-width);
  margin-right: var(--timepicker-input-margin);
}

.wt-timepicker__wrapper > *:last-child {
  margin-right: 0;
}
</style>
