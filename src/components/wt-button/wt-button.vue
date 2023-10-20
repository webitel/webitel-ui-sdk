<template>
  <button
    class="wt-button"
    :class="[
      colorClass,
      `wt-button--size-${size}`,
      {
        'wt-button--contains-icon': containsIcon,
        'wt-button--wide': wide,
        'wt-button--disabled': disabled,
        'wt-button--loading': loading,
      }
    ]"
    type="button"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <wt-loader
      v-if="loading"
      size="sm"
      :color="loaderColor"
    ></wt-loader>
    <slot v-else>no content provided</slot>
  </button>
</template>

<script>
export default {
  name: 'wt-button',
  props: {
    /**
     * @values 'primary', 'secondary', 'success', 'error', 'transfer', 'job', 'info'
     * @example <wt-button color="success"></wt-button>
     */
    color: {
      type: String,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    /**
     * @values 'sm', 'md'
     * @example <wt-button size="sm"></wt-button>
     */
    size: {
      type: String,
      default: 'md',
      options: ['sm', 'md'],
    },
    /**
     * Stretches button to all available width
     */
    wide: {
      type: Boolean,
      default: false,
    },
    /**
     * sets wt-button line-height to 0 to prevent height changing: [stack overflow](https://stackoverflow.com/a/11126701)
     */
    containsIcon: {
      type: Boolean,
      default: false,
      description: 'https://stackoverflow.com/a/11126701',
    },
  },
  emits: ['click'],
  computed: {
    colorClass() {
      if (!this.disabled) return `${this.color}`;
      return '';
    },
    loaderColor() {
      if (['success', 'transfer', 'error', 'job'].includes(this.color)) return 'main';
      return 'contrast';
    },
  },
};
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>
.wt-button {
  @extend %typo-button;
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  min-width: var(--btn-min-width);
  padding: var(--btn-padding);
  color: var(--btn-primary-text-color);
  background-color: var(--btn-primary-color);
  background-clip: padding-box;
  border-radius: var(--border-radius);
  transition: var(--transition);
  cursor: pointer;

  &--wide {
    width: 100%;
  }

  // https://stackoverflow.com/a/11126701
  &--contains-icon {
    line-height: 0;
  }

  &--loading {
    pointer-events: none;
  }

  &--size {
    &-sm {
      padding: var(--btn-padding--size-sm);
    }

    &-md {
      padding: var(--btn-padding);
    }
  }

  &:hover,
  &:active {
    background-color: var(--btn-primary-hover-color);
  }

  &.secondary {
    color: var(--btn-secondary-text-color);
    background-color: var(--btn-secondary-color);

    &:hover,
    &:active {
      background-color: var(--btn-secondary-hover-color);
    }
  }

  &.success {
    color: var(--btn-success-text-color);
    background-color: var(--btn-success-color);

    &:hover,
    &:active {
      background-color: var(--btn-success-hover-color);
    }
  }

  &.info {
    color: var(--btn-info-text-color);
    background-color: var(--btn-info-color);

    &:hover,
    &:active {
      background-color: var(--btn-info-hover-color);
    }
  }

  &.job {
    color: var(--btn-job-text-color);
    background-color: var(--btn-job-color);

    &:hover,
    &:active {
      background-color: var(--btn-job-hover-color);
    }
  }

  &.transfer {
    color: var(--btn-transfer-text-color);
    background-color: var(--btn-transfer-color);

    &:hover,
    &:active {
      background-color: var(--btn-transfer-hover-color);
    }
  }

  &.error {
    color: var(--btn-error-text-color);
    background-color: var(--btn-error-color);

    &:hover,
    &:active {
      background-color: var(--btn-error-hover-color);
    }
  }

  &.wt-button--disabled {
    color: var(--btn-disabled-text-color);
    background-color: var(--btn-disabled-color);
    cursor: auto;
    pointer-events: none;
    box-shadow: none;
  }

  .wt-loader {
    margin: auto;
  }
}
</style>
