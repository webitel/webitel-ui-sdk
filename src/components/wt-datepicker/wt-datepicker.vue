<template>
  <div
:class="{
    'wt-datepicker--disabled': disabled,
    'wt-datepicker--invalid': invalid,
  }" class="wt-datepicker">
    <wt-label :disabled="disabled" v-bind="labelProps" :invalid="invalid">
      <!-- @slot Custom input label -->
      <slot name="label" v-bind="{ label }">
        {{ requiredLabel }}
      </slot>
    </wt-label>
    <vue-datepicker
ref="datepicker" :close-on-auto-apply="false"
      :format="isDateTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy'" :locale="$i18n.locale" :model-value="+value"
      :placeholder="placeholder || (isDateTime ? '00/00/00 00:00' : '00/00/0000')
        " auto-apply class="wt-datepicker__datepicker" v-bind="{ ...$attrs, ...$props }" @closed="isOpened = false"
      @open="isOpened = true" @update:model-value="emit('input', $event.getTime())">
      <template #input-icon>
        <wt-icon :color="disabled ? 'disabled' : 'default'" icon="calendar" />
      </template>
      <template #clear-icon>
        <wt-icon-btn
v-if="clearable && value" :color="disabled ? 'disabled' : 'default'" icon="close"
          @click.stop="clearValue" />
      </template>
      <template #arrow-left>
        <wt-icon-btn icon="arrow-left" />
      </template>
      <template #arrow-right>
        <wt-icon-btn icon="arrow-right" />
      </template>
      <template v-if="isDateTime" #time-picker="{ time, updateTime }">
        <div class="datepicker__timepicker">
          <wt-time-input :value="time.hours" max-value="23" @input="updateTime" />
          :
          <wt-time-input :value="time.minutes" max-value="59" @input="updateTime($event, false)" />
        </div>
      </template>
    </vue-datepicker>
    <wt-input-info v-if="isValidation" :invalid="invalid">
      {{ validationText }}
    </wt-input-info>
  </div>
</template>

<script setup>
import '@vuepic/vue-datepicker/dist/main.css';

import VueDatepicker from '@vuepic/vue-datepicker';
import { useWindowFocus } from '@vueuse/core';
import { computed, ref, toRefs, watch } from 'vue';

import { useValidation } from '../../mixins/validationMixin/useValidation';
import WtInputInfo from '../wt-input-info/wt-input-info.vue';

const props = defineProps({
	/**
	 * [`'date'`, `'datetime'`]
	 * */

	mode: {
		type: String,
		default: 'date',
		options: [
			'date',
			'datetime',
		],
	},
	value: {
		type: [
			String,
			Number,
		],
		default: 'Date.now()',
	},
	/**
	 * label above calendar input
	 */
	label: {
		type: String,
		default: '',
	},
	placeholder: {
		type: String,
		default: '',
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	disabledDates: {
		type: Object,
	},
	lang: {
		type: String,
		default: 'en',
	},

	/**
	 * Object with props, passed down to wt-label as props
	 */

	labelProps: {
		type: Object,
	},

	/**
	 * Native input required attribute
	 */

	required: {
		type: Boolean,
		default: false,
	},

	// validation rules
	// TODO: move to separate file to make it reusable
	v: {
		type: Object,
	},
	customValidators: {
		type: Array,
		default: () => [],
	},
	clearable: {
		type: Boolean,
		default: false,
	},
});
const emit = defineEmits([
	'input',
]);

const isOpened = ref(false);
const datepicker = ref(null); // template ref

const winFocused = useWindowFocus();

const isDateTime = props.mode === 'datetime';

const requiredLabel = computed(() => {
	return props.required ? `${props.label}*` : props.label;
});

// https://stackoverflow.com/questions/72408463/use-props-in-composables-vue3
const { v, customValidators } = toRefs(props);

const { isValidation, invalid, validationText } = useValidation({
	v,
	customValidators,
});

const clearValue = () => {
	emit('input', null);

	closePicker();
};

const closePicker = () => {
	if (isOpened.value) {
		datepicker?.value.closeMenu();
	}

	isOpened.value = false;
};

// close picker when window loses focus(when clicking to iframe)
// https://webitel.atlassian.net/browse/WTEL-5794
watch(winFocused, (focused) => {
	if (!focused && isOpened.value) closePicker();
});
</script>

<style scoped>
.wt-datepicker :deep(.dp__main) .dp__input_icon {
  left: var(--spacing-xs);
  line-height: 0;
}

.wt-datepicker :deep(.dp__main) .dp__clear_icon {
  right: var(--spacing-xs);
  line-height: 0;
}

.wt-datepicker :deep(.dp__main) .dp__input {
  /* Typography: typo-body-1 (14px/400/24px) - cannot add utility class to third-party component */
  font-family: 'Montserrat', monospace;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  text-transform: none;
}

.wt-datepicker :deep(.dp__main) .dp__arrow_top {
  display: none;
}

/* don't know why but month or year selection doesn't work
   suppose its related to compatibility build */
.wt-datepicker :deep(.dp__main) .dp__month_year_wrap {
  pointer-events: none;
}

.wt-datepicker :deep(.dp__main) .dp__month_year_select,
.wt-datepicker :deep(.dp__main) .dp__cell_inner {
  /* Typography: typo-body-2 (12px/400/16px) - cannot add utility class to third-party component */
  font-family: 'Montserrat', monospace;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  text-transform: none;
}

/* reset right/left arrow hover */
.wt-datepicker :deep(.dp__main) .dp__inner_nav:hover {
  background: inherit;
}

.wt-datepicker :deep(.dp__main) .dp__menu {
  box-sizing: border-box;
  box-shadow: var(--elevation-10);
  border-radius: var(--border-radius);
  padding: var(--spacing-xs);
  width: 196px;
  min-width: 196px;
}

.wt-datepicker :deep(.dp__main) .dp__calendar_wrap {
  gap: var(--spacing-2xs);
}

.wt-datepicker :deep(.dp__main) .dp__calendar_header_item {
  /* Typography: typo-subtitle-2 (12px/500/20px) - cannot add utility class to third-party component */
  font-family: 'Montserrat', monospace;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  text-transform: none;
}

.wt-datepicker :deep(.dp__main) .dp__calendar_header_separator {
  background: var(--secondary-color);
}

.wt-datepicker :deep(.dp__main) .dp__calendar_header,
.wt-datepicker :deep(.dp__main) .dp__calendar_row {
  gap: var(--spacing-3xs);
}

/* switch to time view */
.wt-datepicker :deep(.dp__main) .dp__button {
  display: none;
}

.wt-datepicker :deep(.dp__main) .dp__action_row {
  flex-direction: column;
  gap: var(--spacing-xs);
}

.wt-datepicker :deep(.dp__main) .dp__selection_preview,
.wt-datepicker :deep(.dp__main) .dp__action_buttons {
  width: 100%;
}

.wt-datepicker :deep(.dp__main) .dp__selection_preview {
  text-align: center;
}

.wt-datepicker :deep(.dp__main) .dp__action_buttons {
  display: flex;
  gap: var(--spacing-xs);
}

.wt-datepicker--invalid :deep(.dp__main) .dp__input {
  /* prevent outline overlapping false color */
  outline: none;
  border-color: var(--wt-text-field-input-border-error-color);
  color: var(--wt-text-field-error-text-color);
}

.wt-datepicker--invalid :deep(.dp__main) .dp__input_icon {
  --icon-color: var(--wt-text-field-input-border-error-color);
}

.datepicker__timepicker {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-top: var(--spacing-xs);
}

.datepicker__timepicker .wt-time-input {
  flex-grow: 1;
}
</style>
