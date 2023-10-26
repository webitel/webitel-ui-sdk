<template>
  <div
    :class="{
      'wt-input--outline': outline,
      'wt-input--disabled': disabled,
      'wt-input--invalid': invalid,
    }"
    class="wt-input"
  >
    <wt-label
      v-if="hasLabel"
      :disabled="disabled"
      :for="name"
      :invalid="invalid"
      :outline="outline"
      v-bind="labelProps"
    >
      <!-- @slot Custom input label -->
      <slot
        name="label"
        v-bind="{ label }"
      >{{ requiredLabel }}
      </slot>
    </wt-label>
    <div class="wt-input__wrapper">
      <input
        :id="name"
        ref="wt-input"
        :class="{
          'wt-input--is-password': isPassword,
        }"
        :disabled="disabled"
        :max="numberMax"
        :min="numberMin"
        :placeholder="placeholder || label"
        :type="inputType"
        :value="inputValue"
        class="wt-input__input"
        v-bind="$attrs"
        @input="inputHandler"
        @keyup="$emit('keyup', $event)"
      >
      <div
        ref="after-wrapper"
        class="wt-input__after-wrapper"
      >
        <slot
          name="after-input"
        ></slot>
        <slot
          v-if="isPassword"
          name="show-password"
          v-bind="{
          isPasswordVisible,
          switchVisibilityPassword,
        }"
        >
          <wt-icon-btn
            :icon="showPasswordIcon"
            class="wt-input__password-button"
            @click="switchVisibilityPassword"
          ></wt-icon-btn>
        </slot>
      </div>
    </div>
    <wt-input-info
      v-if="isValidation"
      :invalid="invalid"
    >{{ validationText }}
    </wt-input-info>
  </div>
</template>

<script>
import validationMixin from '../../mixins/validationMixin/validationMixin';

/*
* IMPORTANT: WT-INPUT SHOULD SUPPORT VUE 3 AND VUE 2 V-MODEL INTERFACES SO THAT THERE'S
* TWO PROPS: VALUE AND MODELVALUE, AND 2 EVENTS: @UPDATE:MODELVALUE AND @INPUT
* */
export default {
  name: 'wt-input',
  mixins: [validationMixin],
  props: {
    value: {
      type: [String, Number],
    },
    /**
     * Current input modelValue (`v-model`)
     */
    modelValue: {
      type: [String, Number],
    },
    /**
     * Form input label
     */
    label: {
      type: String,
      default: '',
    },
    /**
     * Form input placeholder
     */
    placeholder: {
      type: String,
    },
    /**
     * Form input name
     */
    name: {
      type: String,
      default: '',
    },
    /**
     * Form input type
     */
    type: {
      type: String,
      default: 'text',
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
    /**
     * Status of show password icon display
     */
    hasShowPassword: {
      type: Boolean,
      default: false,
    },

    /**
     * Native number input restrictions
     */
    numberMin: {
      type: Number,
      default: 0,
    },

    /**
     * Native number input restrictions
     */
    numberMax: {
      type: Number,
    },

    outline: {
      type: Boolean,
      default: false,
    },

    labelProps: {
      type: Object,
      description: 'Object with props, passed down to wt-label as props',
    },

    preventTrim: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'input', 'keyup'],
  data: () => ({
    inputType: '',
    isPasswordVisible: false,
  }),

  watch: {
    type: {
      immediate: true,
      handler(type) {
        let inputType = type;
        // Safari has bug for number input
        if (typeof window !== 'undefined' || typeof document !== 'undefined') {
          const ua = navigator.userAgent.toLocaleLowerCase();
          if (
            ua.indexOf('safari') !== -1
            && ua.indexOf('chrome') === -1
            && type === 'number'
          ) {
            this.isNumberTypeSafari = true;
            inputType = 'text';
          }
        }
        this.inputType = inputType;
      },
    },
  },

  computed: {
    inputValue() {
      return this.value !== undefined ? this.value : this.modelValue;
    },

    hasLabel() {
      return !!(this.label || this.$slots.label);
    },

    requiredLabel() {
      return this.required ? `${this.label}*` : this.label;
    },

    isPassword() {
      return this.type === 'password' && this.hasShowPassword;
    },

    showPasswordIcon() {
      return this.isPasswordVisible ? 'eye--closed' : 'eye--opened';
    },
  },
  methods: {
    inputHandler(event) {
      const value = this.preventTrim ? event.target.value : event.target.value.trim();
      this.$emit('update:modelValue', value);
      this.$emit('input', value);
    },

    switchVisibilityPassword() {
      this.isPasswordVisible = !this.isPasswordVisible;
      this.inputType = this.isPasswordVisible ? 'text' : 'password';
    },

    async updateInputPaddings() {
      // cant test this thing cause vue test utils doesnt render elements width :/
      const afterWrapperWidth = this.$refs['after-wrapper'].offsetWidth;
      const inputEl = this.$refs['wt-input'];
      const defaultInputPadding = getComputedStyle(document.documentElement)
      .getPropertyValue('--input-padding');
      if (afterWrapperWidth >= inputEl.offsetWidth) return; // fixes https://my.webitel.com/browse/WTEL-2635
      inputEl.style.paddingRight = `calc(${defaultInputPadding} * 2 + ${afterWrapperWidth}px)`;
    },
  },
  mounted() {
    this.updateInputPaddings();
  },
};
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>

.wt-input {
  cursor: text;

  &--disabled {
    pointer-events: none;
  }
}

.wt-input__wrapper {
  position: relative;
}

.wt-label {
  .wt-input:hover &,
  .wt-input:focus-within & {
    color: var(--form-label--hover-color);
  }

  .wt-input--invalid:hover &,
  .wt-input--invalid:focus-within & {
    color: var(--label--invalid-color);
  }
}

.wt-input__input {
  @extend %typo-body-1;
  @include wt-placeholder;

  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: var(--input-padding);
  transition: var(--transition);
  color: var(--form-input-color);
  border: var(--input-border);
  border-color: var(--form-border-color);
  border-radius: var(--border-radius);

  &:focus {
    @include wt-placeholder('focus');
    border-color: var(--form-border--hover-color);
  }

  .wt-input--outline & {
    border-color: var(--form-outline-border-color);
  }

  .wt-input--outline:hover &,
  .wt-input--outline &:focus {
    border-color: var(--form-outline-border--hover-color);
  }

  .wt-input--invalid &,
  .wt-input--invalid:hover & {
    border-color: var(--false-color);
    outline: none; // prevent outline overlapping false color
  }

  .wt-input--disabled & {
    @include wt-placeholder('disabled');
    border-color: var(--form-border--disabled-color);
    background: var(--form-border--disabled-color);
  }
}

.wt-input__after-wrapper {
  position: absolute;
  top: 50%;
  right: var(--input-icon-margin);
  display: flex;
  align-items: center;
  transform: translateY(-50%);
  pointer-events: auto; // override --disabled p-events none
  gap: var(--input-after-wrapper-gap);

  .wt-input__password-button {
    .wt-input--disabled & ::v-deep .wt-icon__icon {
      fill: var(--icon-disabled-color);
    }
  }
}
</style>
