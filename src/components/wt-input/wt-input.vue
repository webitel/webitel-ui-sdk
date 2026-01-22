<template>
  <div class="wt-input" :class="{
    'wt-input--disabled': disabled,
    'wt-input--invalid': invalid,
  }">
    <wt-label v-if="hasLabel" :disabled="disabled" :for="name" :invalid="invalid" v-bind="labelProps">
      <!-- @slot Custom input label -->
      <slot name="label" v-bind="{ label }">
        {{ requiredLabel }}
      </slot>
    </wt-label>
    <div class="wt-input__wrapper">
      <input :id="name" ref="WtInput" :class="{
        'wt-input--is-password': isPassword,
      }" :disabled="disabled" :max="numberMax" :min="numberMin" :placeholder="placeholder || label"
        class="wt-input__input typo-body-1" :type="inputType" :value="inputValue" v-bind="$attrs" @input="inputHandler"
        @keyup="$emit('keyup', $event)" />
      <div ref="AfterWrapper" class="wt-input__after-wrapper">
        <slot name="after-input" />
        <slot v-if="isPassword" name="show-password" v-bind="{
          isPasswordVisible,
          switchVisibilityPassword,
        }">
          <wt-icon-btn :disabled="disabled" :icon="showPasswordIcon" @click="switchVisibilityPassword" />
        </slot>
      </div>
    </div>
    <wt-input-info
      v-if="isValidation && validationText"
      :invalid="invalid"
    >
      {{ validationText }}
    </wt-input-info>
  </div>
</template>

<script lang="ts" setup>
import type { RegleFieldStatus } from '@regle/core';
import { computed, onMounted, ref, toRefs, useSlots } from 'vue';

import { useValidation } from '../../mixins/validationMixin/useValidation';

/**
 * @emits {string | number} input - Fires when input value changes. Emits input value (depends on input type)
 * @emits {string | number} update:modelValue - Fires when input value changes (Vue 3 v-model)
 * @emits {KeyboardEvent} keyup - Fires on keyup event
 * @emits {Event} * - Plus all native input events
 * 
 * IMPORTANT: WT-INPUT SHOULD SUPPORT VUE 3 AND VUE 2 V-MODEL INTERFACES SO THAT THERE'S
 * TWO PROPS: VALUE AND MODELVALUE, AND 2 EVENTS: @UPDATE:MODELVALUE AND @INPUT
 */
const props = withDefaults(
	defineProps<{
		/**
		 * Input value (Vue 2 v-model)
		 * @type {string | number}
		 * @default ''
		 */
		value?: string | number;
		/**
		 * Input value (Vue 3 v-model)
		 * @type {string | number}
		 * @default ''
		 * @model modelValue
		 */
		modelValue?: string | number;
		/**
		 * Input label
		 * @type {string}
		 * @default ''
		 */
		label?: string;
		/**
		 * Input placeholder
		 * @type {string}
		 * @default label value
		 */
		placeholder?: string;
		/**
		 * Input id name for label association
		 * @type {string}
		 * @default ''
		 */
		name?: string;
		/**
		 * Input type
		 * @type {string}
		 * @default 'text'
		 */
		type?: string;
		/**
		 * Marks input as required
		 * @type {boolean}
		 * @default false
		 */
		required?: boolean;
		/**
		 * Disables the input
		 * @type {boolean}
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * If type=password and this, shows eye icon
		 * @type {boolean}
		 * @default false
		 */
		hasShowPassword?: boolean;
		/**
		 * Native number input restrictions
		 * @type {number}
		 * @default 0
		 */
		numberMin?: number;
		/**
		 * Native number input restrictions
		 * @type {number}
		 */
		numberMax?: number;
		/**
		 * Object with props, passed down to wt-label as props
		 * @type {Object}
		 */
		labelProps?: Record<string, unknown>;
		/**
		 * Prevents trimming input value
		 * @type {boolean}
		 * @default false
		 */
		preventTrim?: boolean;
		/**
		 * Validation rules
		 * @type {Object}
		 */
		v?: Record<string, unknown>;
		/**
		 * Regle validation status
		 * @type {RegleFieldStatus}
		 */
		regleValidation?: RegleFieldStatus<string>;
		/**
		 * Custom validators array
		 * @type {Array}
		 * @default []
		 */
		customValidators?: unknown[];
	}>(),
	{
		label: '',
		name: '',
		type: 'text',
		required: false,
		disabled: false,
		hasShowPassword: false,
		numberMin: 0,
		preventTrim: false,
		v: null,
		regleValidation: null,
		customValidators: () => [],
	},
);

const emit = defineEmits([
	'update:modelValue',
	'input',
	'keyup',
]);

const slots = useSlots();

// https://stackoverflow.com/questions/72408463/use-props-in-composables-vue3
const { v, customValidators, regleValidation } = toRefs(props);

const { isValidation, invalid, validationText } = useValidation({
	v,
	customValidators,
	regleValidation,
});

// toggles password <-> text at showPassword
const inputType = ref('');
inputType.value = props.type;

// template ref
const AfterWrapper = ref(null);
// template ref
const WtInput = ref(null);

const isPasswordVisible = ref(false);

// FIXME: uncomment and test, because this code was copy-pasted from vue-storefront long ago
// watch: {
//   type: {
//     immediate: true,
//     handler(type) {
//       let inputType = type;
//       // Safari has bug for number input
//       if (typeof window !== 'undefined' || typeof document !== 'undefined') {
//         const ua = navigator.userAgent.toLocaleLowerCase();
//         if (
//           ua.indexOf('safari') !== -1
//           && ua.indexOf('chrome') === -1
//           && type === 'number'
//         ) {
//           inputType = 'text';
//         }
//       }
//       this.inputType = inputType;
//     },
//   },
// },

const inputValue = computed(() => {
	return props.value !== undefined ? props.value : props.modelValue;
});

const hasLabel = computed(() => {
	return !!(props.label || slots.label);
});

const requiredLabel = computed(() => {
	return props.required ? `${props.label}*` : props.label;
});

const isPassword = computed(() => {
	return props.type === 'password' && props.hasShowPassword;
});

const showPasswordIcon = computed(() => {
	return isPasswordVisible.value ? 'eye--closed' : 'eye--opened';
});

function inputHandler(event) {
	const value = props.preventTrim
		? event.target.value
		: event.target.value.trim();
	emit('update:modelValue', value);
	emit('input', value);
}

function switchVisibilityPassword() {
	isPasswordVisible.value = !isPasswordVisible.value;
	inputType.value = isPasswordVisible.value ? 'text' : 'password';
}

function updateInputPaddings() {
	// cant test this thing cause vue test utils doesnt render elements width :/
	const afterWrapperWidth = AfterWrapper.value.offsetWidth;
	const inputEl = WtInput.value;
	const defaultInputPadding = getComputedStyle(
		document.documentElement,
	).getPropertyValue('--input-padding');
	if (afterWrapperWidth >= inputEl.offsetWidth) return; // fixes https://my.webitel.com/browse/WTEL-2635
	inputEl.style.paddingRight = `calc(${defaultInputPadding} * 2 + ${afterWrapperWidth}px)`;
}

function focus() {
	WtInput.value.focus();
}

onMounted(() => {
	updateInputPaddings();
});

defineExpose({
	focus,
});
</script>

<style scoped>
.wt-input {
  cursor: text;
}

.wt-input--disabled {
  pointer-events: none;
}

.wt-input__wrapper {
  position: relative;
}

.wt-input__input {
  display: block;
  transition: var(--transition);
  box-sizing: border-box;
  border: var(--input-border);
  border-color: var(--wt-text-field-input-border-color);
  border-radius: var(--border-radius);
  background: transparent;
  padding: var(--input-padding);
  width: 100%;
  color: var(--wt-text-field-text-color);
}

.wt-input__input::placeholder,
.wt-input__input::-webkit-input-placeholder,
.wt-input__input::-moz-placeholder,
.wt-input__input:-moz-placeholder,
.wt-input__input:-ms-input-placeholder {
  font: inherit;
  transition: var(--transition);
  color: var(--wt-text-field-placeholder-color);
}

.wt-input--invalid .wt-input__input,
.wt-input--invalid:hover .wt-input__input {
  outline: none;
  /* prevent outline overlapping false color */
  border-color: var(--wt-text-field-input-border-error-color);
  color: var(--wt-text-field-error-text-color);
}

.wt-input--invalid .wt-input__input::placeholder,
.wt-input--invalid .wt-input__input::-webkit-input-placeholder,
.wt-input--invalid .wt-input__input::-moz-placeholder,
.wt-input--invalid .wt-input__input:-moz-placeholder,
.wt-input--invalid .wt-input__input:-ms-input-placeholder {
  color: var(--wt-text-field-placeholder-error-color);
}

.wt-input--disabled .wt-input__input {
  border-color: var(--wt-text-field-input-border-disabled-color);
  background: var(--wt-text-field-input-background-disabled-color);
}

.wt-input--disabled .wt-input__input::placeholder,
.wt-input--disabled .wt-input__input::-webkit-input-placeholder,
.wt-input--disabled .wt-input__input::-moz-placeholder,
.wt-input--disabled .wt-input__input:-moz-placeholder,
.wt-input--disabled .wt-input__input:-ms-input-placeholder {
  color: var(--wt-text-field-placeholder-disabled-color);
}

.wt-input__after-wrapper {
  display: flex;
  position: absolute;
  top: 50%;
  right: var(--input-icon-margin);
  align-items: center;
  gap: var(--input-after-wrapper-gap);
  transform: translateY(-50%);
  pointer-events: auto;
  /* override --disabled p-events none */
}
</style>
