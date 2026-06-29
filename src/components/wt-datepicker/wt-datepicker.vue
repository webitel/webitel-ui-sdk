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
			ref="datepicker"
			:id="datepickerId"
			v-model="modelValue"
			date-format="dd/mm/yy"
			:required="required"
			:disabled="disabled"
			:show-time="showTime"
			:min-date="minDate"
			:max-date="maxDate"
			:placeholder="placholder"
			:show-clear="clearable && modelValue"
			show-button-bar
      fluid
			:pt="{
				selectMonth: {
					class: 'typo-subtitle-1'
				},
				selectYear: {
					class: 'typo-subtitle-1'
				},
				tableHeaderCell: {
					class: 'typo-body-2-bold'
				},
				day: {
					class: 'typo-body-2'
				},
				hour: {
					class: 'typo-body-2'
				},
				minute: {
					class: 'typo-body-2'
				}
			}"
			@show="onPanelShow"
    >
			<template #buttonbar="{ todayCallback, clearCallback }">
				<div class="wt-datepicker__button-bar">
					<wt-button 
						:color="ButtonColor.SECONDARY"
						:variant="ButtonVariant.OUTLINED"
						:size="ComponentSize.SM"
						@click="todayCallback"
					>
						{{ t('reusable.today') }}
					</wt-button>
					<wt-button 
						v-show="clearable && modelValue"
						:color="ButtonColor.SECONDARY"
						:variant="ButtonVariant.OUTLINED"
						:size="ComponentSize.SM"
						@click="clearCallback"
					>
						{{ t('reusable.clear') }}
					</wt-button>
				</div>
			</template>

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
import PDatepicker, {
	DatePickerEmitsOptions,
	DatePickerProps,
} from 'primevue/datepicker';
import {
	computed,
	defineModel,
	defineProps,
	nextTick,
	toRefs,
	useTemplateRef,
} from 'vue';
import {
	ButtonColor,
	ButtonVariant,
	ComponentSize,
	MessageVariant,
} from '../../enums';
import { useI18n } from 'vue-i18n';
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
	labelProps: () => ({}),
	customValidators: () => [],
});

const emit = defineEmits<DatePickerEmitsOptions>();

const model = defineModel<number | null>({
	default: null,
});

const { t } = useI18n();

const modelValue = computed({
	get() {
		if (!model.value) return null;
		const date = new Date(+model.value);
		return props.timezone ? toZonedTime(date, props.timezone) : date;
	},
	set(value) {
		if (!value) {
			model.value = null;
			return;
		}
		const utc = props.timezone ? fromZonedTime(value, props.timezone) : value;
		model.value = utc.getTime();
	},
});

const datepicker = useTemplateRef<HTMLDivElement>('datepicker');

const datepickerId = `datepicker-${Math.random().toString(36).slice(2, 11)}`;

// PrimeVue initializes its internal currentHour/currentMinute from new Date() when the
// overlay opens, ignoring the model value. Re-assigning the same value forces a re-sync.
const onPanelShow = () => {
	if (props.showTime && modelValue.value) {
		const currentDate = modelValue.value as Date;
		nextTick(() => {
			modelValue.value = new Date(currentDate.getTime());
		});
	}

	// align overlay, because on first render it is not aligned correctly
	setTimeout(() => {
		datepicker.value?.alignOverlay();
	}, 0);
};

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

.wt-datepicker__button-bar {
	width: 100%;
	display: flex;
	justify-content: space-between;
}
</style>
