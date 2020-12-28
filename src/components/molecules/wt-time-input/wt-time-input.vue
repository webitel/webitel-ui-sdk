<template>
  <div
    class="wt-time-input"
    :class="{
      'wt-time-input--outline': outline,
      'wt-time-input--disabled': disabled,
    }"
  >
    <wt-label v-if="hasLabel" :for="name" :outline="outline" :disabled="disabled">
      <!-- @slot Custom input label -->
      <slot name="label" v-bind="{ label }">{{ label }}</slot>
    </wt-label>
    <div class="wt-time-input__wrapper">
      <input
        :id="name"
        class="wt-time-input__input"
        :value="value"
        :min="0"
        :max="maxValue"
        :disabled="disabled"
        type="number"
        v-on="listeners"
      >
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wt-time-input',
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
       * Form input name
       */
      name: {
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

      outline: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      hasLabel() {
        return !!(this.label || this.$slots.label);
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

<style lang="scss" scoped>
  .wt-time-input {
    display: inline-block;
    cursor: text;

    &--disabled {
      pointer-events: none;
    }
  }

  .wt-time-input__wrapper {
    position: relative;
  }

  .wt-label {
    text-align: center;
    margin-bottom: var(--label-margin);
    cursor: text;

    .wt-time-input:hover &,
    .wt-time-input:focus-within & {
      color: var(--form-label--hover-color);
    }
  }

  .wt-time-input__input {
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

    .wt-time-input:hover &,
    &:focus {
      border-color: var(--form-border--hover-color);
    }

    .wt-time-input--outline & {
      border-color: var(--form-outline-border-color);
    }

    .wt-time-input--outline:hover &,
    .wt-time-input--outline &:focus {
      border-color: var(--form-outline-border--hover-color);
    }

    .wt-time-input--disabled & {
      background: var(--form-border--disabled-color);
      border-color: var(--form-border--disabled-color);
    }
  }
</style>
