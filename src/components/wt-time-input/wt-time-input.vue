<template>
  <div
    :class="{
      'wt-time-input--disabled': disabled,
      'wt-time-input--invalid': invalid,
    }"
    class="wt-time-input"
  >
    <wt-label
      v-if="hasLabel"
      :disabled="disabled"
      :invalid="invalid"
      v-bind="labelProps"
    >
      <!-- @slot Custom input label -->
      <slot
        name="label"
        v-bind="{ label }"
      >
        {{ label }}
      </slot>
    </wt-label>
    <div class="wt-time-input__wrapper">
      <input
        :disabled="disabled"
        :max="maxValue"
        :min="0"
        :value="value"
        class="wt-time-input__input typo-body-1"
        type="number"
        v-on="listeners"
      />
    </div>
    <wt-input-info
      v-if="showInfo"
      :invalid="invalid"
    >
      {{ validationText }}
    </wt-input-info>
  </div>
</template>

<script>
import validationMixin from '../../mixins/validationMixin/validationMixin.js';

export default {
	name: 'WtTimeInput',
	mixins: [
		validationMixin,
	],
	/**
	 * @emits {number} input - Fires when input value changes. Emits value
	 * @emits {Event} * - Plus all native input events
	 */
	props: {
		/**
		 * Current input value (v-model)
		 * @type {number}
		 * @default 0
		 * @model value
		 */
		value: {
			type: Number,
			default: 0,
		},
		/**
		 * Form input label
		 * @type {string}
		 * @default ''
		 */
		label: {
			type: String,
			default: '',
		},
		/**
		 * Input id name for label association
		 * @type {string}
		 * @default ''
		 */
		name: {
			type: String,
			default: '',
		},
		/**
		 * Time type: day, minute, second
		 * @type {number}
		 */
		maxValue: {
			type: Number,
		},
		/**
		 * Native input required attribute
		 * @type {boolean}
		 * @default false
		 */
		required: {
			type: Boolean,
			default: false,
			description: 'Native input required attribute',
		},
		/**
		 * Native input disabled attribute
		 * @type {boolean}
		 * @default false
		 */
		disabled: {
			type: Boolean,
			default: false,
			description: 'Native input disabled attribute',
		},
		/**
		 * Object with props, passed down to wt-label as props
		 * @type {Object}
		 */
		labelProps: {
			type: Object,
			description: 'Object with props, passed down to wt-label as props',
		},
		/**
		 * Hides input info section
		 * @type {boolean}
		 * @default false
		 */
		hideInputInfo: {
			type: Boolean,
			default: false,
		},
	},
	emits: [
		'input',
	],
	computed: {
		hasLabel() {
			return !!(this.label || this.$slots.label);
		},
		showInfo() {
			return this.isValidation && !this.hideInputInfo;
		},
		listeners() {
			return {
				...this.$listeners,
				input: (event) => this.$emit('input', event.target.value),
			};
		},
	},
};
</script>

<style scoped>
.wt-time-input {
  display: inline-block;
  cursor: text;
}

.wt-time-input--disabled {
  pointer-events: none;
}

.wt-time-input__input {
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

.wt-time-input--invalid .wt-time-input__input,
.wt-time-input--invalid:hover .wt-time-input__input {
  outline: none; /* prevent outline overlapping false color */
  border-color: var(--wt-text-field-input-border-error-color);
  color: var(--wt-text-field-error-text-color);
}

.wt-time-input--invalid .wt-time-input__input::placeholder,
.wt-time-input--invalid .wt-time-input__input::-webkit-input-placeholder,
.wt-time-input--invalid .wt-time-input__input::-moz-placeholder,
.wt-time-input--invalid .wt-time-input__input:-moz-placeholder,
.wt-time-input--invalid .wt-time-input__input:-ms-input-placeholder {
  color: var(--wt-text-field-placeholder-error-color);
}

.wt-time-input--disabled .wt-time-input__input {
  border-color: var(--wt-text-field-input-border-disabled-color);
  background: var(--wt-text-field-input-background-disabled-color);
}

.wt-time-input--disabled .wt-time-input__input::placeholder,
.wt-time-input--disabled .wt-time-input__input::-webkit-input-placeholder,
.wt-time-input--disabled .wt-time-input__input::-moz-placeholder,
.wt-time-input--disabled .wt-time-input__input:-moz-placeholder,
.wt-time-input--disabled .wt-time-input__input:-ms-input-placeholder {
  color: var(--wt-text-field-placeholder-disabled-color);
}

.wt-time-input__wrapper {
  position: relative;
}

.wt-time-input .wt-label {
  text-align: center;
}
</style>
