<template>
  <div
    class="wt-textarea"
    :class="{
      'wt-textarea--disabled': disabled,
      }"
  >
    <wt-label
      :for="name"
      :disabled="disabled"
      v-bind="labelProps"
    >
      <!-- @slot Custom input label -->
      <slot name="label" v-bind="{ label }">{{ label }}</slot>
    </wt-label>
    <div class="wt-textarea__wrapper">
      <textarea
        :id="name"
        class="wt-textarea__textarea"
        :value="value"
        :placeholder="placeholder || label"
        :disabled="disabled"
        v-on="listeners"
      ></textarea>
      <wt-icon-btn
        class="wt-textarea__reset-icon-btn"
        :class="{ 'hidden': !value }"
        icon="remove-rounded"
        size="sm"
        :disabled="disabled"
        @click="$emit('input', '')"
      ></wt-icon-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wt-textarea',
    props: {
      /**
       * Current textarea value (`v-model`)
       */
      value: {
        type: String,
        default: '',
      },
      /**
       * textarea label
       */
      label: {
        type: String,
        default: '',
      },
      /**
       * textarea placeholder
       */
      placeholder: {
        type: String,
      },
      /**
       * Native textarea disabled attribute
       */
      disabled: {
        type: Boolean,
        default: false,
        description: 'Native textarea disabled attribute',
      },
      /**
       * textarea name
       */
      name: {
        type: String,
        default: '',
      },
      chatMode: {
        type: Boolean,
        default: false,
      },
      labelProps: {
        type: Object,
        description: 'Object with props, passed down to wt-label as props',
      },
    },

    computed: {
      listeners() {
        return {
          ...this.$listeners,
          input: (event) => this.$emit('input', event.target.value),
          keypress: (event) => this.handleKeypress(event),
        };
      },
    },

    methods: {
      handleKeypress(event) {
        if (!this.chatMode) return;
        if (event.key === 'Enter' && !event.shiftKey) {
          this.$emit('enter');
          event.preventDefault();
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .wt-textarea {
    cursor: text;

    &--disabled {
      pointer-events: none;
    }
  }

  .wt-textarea__wrapper {
    position: relative;
  }

  .wt-label {
    margin-bottom: var(--label-margin);
    cursor: text;

    .wt-textarea:hover &,
    .wt-textarea:focus-within & {
      color: var(--form-label--hover-color);
    }
  }

  .wt-textarea__reset-icon-btn {
    position: absolute;
    top: var(--input-icon-margin);
    right: var(--input-icon-margin);

    .wt-textarea:not(:focus-within) & {
      opacity: 0;
      pointer-events: none;
    }
  }

  .wt-textarea__textarea {
    @extend %typo-body-lg;

    display: block;
    width: 100%;
    min-height: var(--textarea-min-height);
    box-sizing: border-box;
    padding: var(--textarea-padding);
    color: var(--form-input-color);
    border: var(--input-border);
    border-color: var(--form-border-color);
    border-radius: var(--border-radius);
    transition: var(--transition);
    resize: none;

    &::placeholder {
      color: var(--form-placeholder-color)
    }

    .wt-textarea:hover &,
    &:focus {
      border-color: var(--form-border--hover-color);

      &::placeholder {
        color: var(--form-placeholder--hover-color)
      }
    }

    .wt-textarea--disabled & {
      background: var(--form-border--disabled-color);
      border-color: var(--form-border--disabled-color);

      &::placeholder {
        color: var(--form-placeholder--disabled-color);
      }
    }
  }

  /* make icons black */
  .wt-textarea:hover ::v-deep .wt-icon__icon,
  .wt-textarea:focus-within ::v-deep .wt-icon__icon {
    fill: var(--icon--hover-color);
  }
</style>
