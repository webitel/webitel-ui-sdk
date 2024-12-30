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
        class="wt-time-input__input"
        type="number"
        @input="$emit('input', $event.target.value)"
      >
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
  mixins: [validationMixin],
  props: {
    /**
     * Current input value (`v-model`)
     */
    value: {
      type: Number,
      default: 0,
    },
    /**
     * Form input label
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * Time type: day, minute, second
     */
    maxValue: {
      type: Number,
    },
    /**
     * Native input required attribute
     */
    required: {
      type: Boolean,
      default: false,
      description: 'Native input required attribute',
    },
    /**
     * Native input disabled attribute
     */
    disabled: {
      type: Boolean,
      default: false,
      description: 'Native input disabled attribute',
    },
    labelProps: {
      type: Object,
      description: 'Object with props, passed down to wt-label as props',
    },
    hideInputInfo: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    /**
     * Emits on input value change
     * @param {string} value
     */
    'input',
  ],
  computed: {
    hasLabel() {
      return !!(this.label || this.$slots.label);
    },
    showInfo() {
      return this.isValidation && !this.hideInputInfo;
    },
  },
};
</script>

<style lang="scss" scoped>
@use '../../../src/css/main' as *;

.wt-time-input {
  display: inline-block;
  cursor: text;

  &--disabled {
    pointer-events: none;
  }

  .wt-time-input__input {
    @extend %typo-body-1;

    display: block;
    box-sizing: border-box;
    width: 100%;
    padding: var(--input-padding);
    transition: var(--transition);
    color: var(--wt-text-field-text-color);
    border: var(--input-border);
    border-color: var(--wt-text-field-input-border-color);
    border-radius: var(--border-radius);
    background: transparent;

    .wt-time-input--invalid &,
    .wt-time-input--invalid:hover & {
      color: var(--wt-text-field-error-text-color);
      border-color: var(--wt-text-field-input-border-error-color);
      outline: none; // prevent outline overlapping false color
      @include wt-placeholder('error');
    }

    .wt-time-input--disabled & {
      border-color: var(--wt-text-field-input-border-disabled-color);
      background: var(--wt-text-field-input-background-disabled-color);
      @include wt-placeholder('disabled');
    }
  }
}


.wt-time-input__wrapper {
  position: relative;
}

.wt-label {
  text-align: center;
}
</style>
