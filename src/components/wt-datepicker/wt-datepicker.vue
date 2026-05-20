<template>
  <div
    class="wt-datepicker"
  >
    <wt-label :disabled="disabled" v-bind="labelProps" :for="datepickerId" :invalid="invalid">
      <!-- @slot Custom input label -->
      <slot name="label" v-bind="{ label }">
        {{ requiredLabel }}
      </slot>
    </wt-label>
    <p-datepicker
			:id="datepickerId"
			v-model="modelValue"
			dateFormat="dd/mm/yy"
			:disabled="disabled"
			:show-time="showTime"
			:min-date="minDate"
			:max-date="maxDate"
			:placeholder="placholder"
			:show-clear="clearable && modelValue"
      fluid
      :manual-input="false"
    >
			<template #prevbutton="{ actionCallback }">
				<wt-icon-btn 
					icon="arrow-left"
					@click="actionCallback"
				/>
			</template>

			<template #nextbutton="{ actionCallback }">
				<wt-icon-btn 
					icon="arrow-right"
					@click="actionCallback"
				/>
			</template>

			<template #clearicon="{ clearCallback }">
				<wt-icon-btn
					icon="close"
					class="wt-datepicker__clear-icon"
					@click="clearCallback"
				/>
			</template>

			<template #hourincrementbutton="{ callbacks }">
				<span @mousedown="callbacks.mousedown" @mouseup="callbacks.mouseup" @mouseleave="callbacks.mouseleave">
					<wt-icon-btn icon="arrow-up" />
				</span>
			</template>

			<template #hourdecrementbutton="{ callbacks }">
				<span @mousedown="callbacks.mousedown" @mouseup="callbacks.mouseup" @mouseleave="callbacks.mouseleave">
					<wt-icon-btn icon="arrow-down" />
				</span>
			</template>

			<template #minuteincrementbutton="{ callbacks }">
				<span @mousedown="callbacks.mousedown" @mouseup="callbacks.mouseup" @mouseleave="callbacks.mouseleave">
					<wt-icon-btn icon="arrow-up" />
				</span>
			</template>

			<template #minutedecrementbutton="{ callbacks }">
				<span @mousedown="callbacks.mousedown" @mouseup="callbacks.mouseup" @mouseleave="callbacks.mouseleave">
					<wt-icon-btn icon="arrow-down" />
				</span>
			</template>
    </p-datepicker>
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
import { fromZonedTime, toZonedTime } from 'date-fns-tz';
import PDatepicker, { DatePickerProps } from 'primevue/datepicker';
import { computed, defineModel, defineProps, ref, toRefs, watch } from 'vue';
import { ComponentSize, MessageVariant } from '../../enums';
import { useValidation } from '../../mixins/validationMixin/useValidation';

interface Props extends DatePickerProps {
	showTime?: boolean;
	minDate?: Date;
	maxDate?: Date;
	label?: string;
	labelProps?: Record<string, unknown>;
	placholder?: string;
	disabled?: boolean;
	required?: boolean;
	clearable?: boolean;
	timezone?: string;
	v?: Record<string, unknown>;
	customValidators?: unknown[];
}

const props = withDefaults(defineProps<Props>(), {
	showTime: false,
	minDate: undefined,
	maxDate: undefined,
	label: '',
	labelProps: () => ({}),
	placholder: '',
	disabled: false,
	required: false,
	clearable: false,
	timezone: undefined,
	v: undefined,
	customValidators: () => [],
});

const emit = defineEmits([
	'update:modelValue',
]);

const model = defineModel<number | null>({
	default: null,
});

const modelValue = computed({
	get() {
		if (!model.value) return null;
		const date = new Date(model.value);
		return props.timezone ? toZonedTime(date, props.timezone) : date;
	},
	set(value) {
		if (!value) return emit('update:modelValue', null);
		const utc = props.timezone ? fromZonedTime(value, props.timezone) : value;
		emit('update:modelValue', utc.getTime());
	},
});

const datepickerId = `datepicker-${Math.random().toString(36).slice(2, 11)}`;

const requiredLabel = computed(() => {
	return props.required ? `${props.label}*` : props.label;
});

// https://stackoverflow.com/questions/72408463/use-props-in-composables-vue3
const { v, customValidators } = toRefs(props);

const { isValidation, invalid, validationText, validationTextColor } =
	useValidation({
		v,
		customValidators,
	});
</script>

<style scoped>
.wt-datepicker__clear-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  inset-inline-end: var(--p-form-field-padding-x);
  cursor: pointer;
}
</style>
