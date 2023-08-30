<template>
  <button
    class="wt-button"
    :class="[
      colorClass,
      `wt-button--size-${size}`,
      {
        'wt-button--contains-icon': containsIcon,
        'wt-button--outline': outline,
        'wt-button--wide': wide,
        'wt-button--rounded': rounded,
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
    <slot v-else></slot>
  </button>
</template>

<script>
export default {
  name: 'wt-button',
  props: {
    color: {
      type: String,
      default: 'accent',
      options: ['accent', 'secondary', 'success', 'danger', 'transfer', 'job'],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
      options: ['sm', 'md'],
    },
    wide: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
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
      if (['success', 'transfer', 'danger', 'job'].includes(this.color)) return 'main';
      return 'contrast';
    },
  },
};
</script>

<style lang="scss" scoped>
@import './variables.scss';

.wt-button {
  @extend %typo-button;
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  min-width: var(--btn-min-width);
  padding: var(--btn-padding);
  color: var(--btn-dark-font-color);
  background-color: var(--btn-accent-color);
  background-clip: padding-box;
  border-radius: var(--border-radius);
  transition: var(--transition);
  cursor: pointer;

  &--wide {
    width: 100%;
  }

  &--rounded {
    border-radius: var(--border-radius--pill);
  }

  // https://stackoverflow.com/a/11126701
  &--contains-icon {
    line-height: 0;
  }

  &--size {
    &-sm {
      padding: var(--btn-padding--size-sm);
    }

    &-md {
      padding: var(--btn-padding--size-md);
    }
  }

  &--loading {
    pointer-events: none;
  }

  &:hover,
  &:active {
    background-color: var(--btn-accent--hover-color);
    border-color: var(--btn-accent--hover-color);
  }

  &.secondary {
    color: var(--btn-dark-font-color);
    border-color: var(--btn-secondary-color);
    background-color: var(--btn-secondary-color);

    &:hover,
    &:active {
      color: var(--btn-dark-font-color);
      border-color: var(--btn-secondary--hover-color);
      background-color: var(--btn-secondary--hover-color);
    }
  }

  &.success {
    color: var(--btn-light-font-color);
    background-color: var(--btn-true-color);
    border-color: var(--btn-true-color);

    &:hover,
    &:active {
      background-color: var(--btn-true--hover-color);
      border-color: var(--btn-true--hover-color);
    }
  }

  &.transfer {
    color: var(--btn-light-font-color);
    background-color: var(--btn-transfer-color);
    border-color: var(--btn-transfer-color);

    &:hover,
    &:active {
      background-color: var(--btn-transfer--hover-color);
      border-color: var(--btn-transfer--hover-color);
    }
  }

  &.job {
    color: var(--btn-light-font-color);
    background-color: var(--btn-job-color);
    border-color: var(--btn-job-color);

    &:hover,
    &:active {
      background-color: var(--btn-job--hover-color);
      border-color: var(--btn-job--hover-color);
    }
  }

  &.danger {
    color: var(--btn-light-font-color);
    background-color: var(--btn-false-color);
    border-color: var(--btn-false-color);

    &:hover,
    &:active {
      background-color: var(--btn-false--hover-color);
      border-color: var(--btn-false--hover-color);
    }
  }

  &.wt-button--outline {
    border: var(--btn-border);
    padding: var(--btn-padding--outline);
    background-color: transparent;
    color: var(--btn-accent-color);
    border-color: var(--btn-accent-color);

    &.wt-button--size {
      &-sm {
        padding: var(--btn-padding--size-sm--outline);
      }

      &-md {
        padding: var(--btn-padding--size-md--outline);
      }
    }

    &:hover,
    &:active {
      color: var(--btn-accent--hover-color);
      border-color: var(--btn-accent--hover-color);
      background-color: transparent;
    }

    &.secondary {
      color: var(--btn-dark-font-color);
      border-color: var(--btn-secondary-color);

      &:hover,
      &:active {
        border-color: var(--btn-secondary--hover-color);
        background-color: transparent;
      }
    }

    &.success {
      color: var(--btn-true-color);
      border-color: var(--btn-true-color);

      &:hover,
      &:active {
        color: var(--btn-true--hover-color);
        border-color: var(--btn-true--hover-color);
        background-color: transparent;
      }
    }

    &.transfer {
      color: var(--btn-transfer-color);
      border-color: var(--btn-transfer-color);

      &:hover,
      &:active {
        color: var(--btn-transfer--hover-color);
        border-color: var(--btn-transfer--hover-color);
        background-color: transparent;
      }
    }

    &.job {
      color: var(--btn-job-color);
      border-color: var(--btn-job-color);

      &:hover,
      &:active {
        color: var(--btn-job--hover-color);
        border-color: var(--btn-job--hover-color);
        background-color: transparent;
      }
    }

    &.danger {
      color: var(--btn-false-color);
      border-color: var(--btn-false-color);

      &:hover,
      &:active {
        color: var(--btn-false--hover-color);
        border-color: var(--btn-false--hover-color);
        background-color: transparent;
      }
    }
  }

  &.wt-button--disabled {
    color: var(--btn-disabled-font-color);
    background-color: var(--btn-disabled-color);
    border-color: var(--btn-disabled-color);
    cursor: auto;
    pointer-events: none;
    box-shadow: none;
  }

  .wt-loader {
    margin: auto;
  }
}
</style>
