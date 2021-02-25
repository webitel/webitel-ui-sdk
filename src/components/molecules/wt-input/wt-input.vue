<template>
  <div
    class="wt-input"
    :class="{
      'wt-input--outline': outline,
      'wt-input--disabled': disabled,
      'wt-input--invalid': invalid,
    }"
  >
    <wt-label
      v-if="hasLabel"
      :for="name"
      :outline="outline"
      :disabled="disabled"
      :invalid="invalid"
    >
      <!-- @slot Custom input label -->
      <slot name="label" v-bind="{ label }">{{ requiredLabel }}</slot>
    </wt-label>
    <div class="wt-input__wrapper">
      <input
        :id="name"
        class="wt-input__input"
        :class="{
          'wt-input--is-password': isPassword,
        }"
        :value="value"
        :type="inputType"
        :placeholder="placeholder || label"
        :disabled="disabled"
        :min="numberMin"
        :max="numberMax"
        v-on="listeners"
      >
      <slot
        v-if="isPassword"
        name="show-password"
        v-bind="{
          isPasswordVisible,
          switchVisibilityPassword,
        }"
      >
        <wt-icon-btn
          class="wt-input__password-button"
          :icon="showPasswordIcon"
          @click.native="switchVisibilityPassword"
        ></wt-icon-btn>
      </slot>
    </div>
    <wt-input-info
      v-if="isValidation"
      :invalid="invalid"
    ></wt-input-info>
  </div>
</template>

<script>
  import validationMixin from '../../../mixins/validationMixin/validationMixin';

  export default {
    name: 'wt-input',
    mixins: [validationMixin],
    props: {
      /**
       * Current input value (`v-model`)
       */
      value: {
        type: [String, Number],
        default: '',
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
    },

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
        return this.isPasswordVisible ? 'eye-closed' : 'eye-opened';
      },

      listeners() {
        return {
          ...this.$listeners,
          input: this.inputHandler,
        };
      },
    },
    methods: {
      inputHandler(event) {
        this.$emit('input', event.target.value);
      },

      switchVisibilityPassword() {
        this.isPasswordVisible = !this.isPasswordVisible;
        this.inputType = this.isPasswordVisible ? 'text' : 'password';
      },
    },
  };
</script>

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
    margin-bottom: var(--label-margin);
    cursor: text;

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
    @extend %typo-body-lg;

    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: var(--input-padding);
    color: var(--form-input-color);
    border: var(--input-border);
    border-color: var(--form-border-color);
    border-radius: var(--border-radius);
    transition: var(--transition);

    &::placeholder {
      color: var(--form-placeholder-color);
    }

    .wt-input:hover &,
    &:focus {
      border-color: var(--form-border--hover-color);

      &::placeholder {
        color: var(--form-placeholder--hover-color)
      }
    }

    .wt-input--outline & {
      border-color: var(--form-outline-border-color);

      &::placeholder {
        color: var(--form-outline-placeholder-color);
      }
    }

    .wt-input--outline:hover &,
    .wt-input--outline &:focus {
      border-color: var(--form-outline-border--hover-color);

      &::placeholder {
        color: var(--form-outline-placeholder--hover-color)
      }
    }

    .wt-input--invalid &,
    .wt-input--invalid:hover & {
      border-color: var(--false-color);
      outline: none; // prevent outline overlapping false color
    }

    .wt-input--disabled & {
      background: var(--form-border--disabled-color);
      border-color: var(--form-border--disabled-color);

      &::placeholder {
        color: var(--form-placeholder--disabled-color);
      }
    }
  }

  .wt-input__password-button {
    position: absolute;
    top: 50%;
    right: var(--input-icon-margin);
    transform: translateY(-50%);

    .wt-input--disabled & ::v-deep .wt-icon__icon {
      fill: var(--icon--disabled-color);
    }

    .wt-input:hover & ::v-deep .wt-icon__icon,
    .wt-input:focus-within & ::v-deep .wt-icon__icon {
      fill: var(--icon--hover-color);
    }
  }
</style>
