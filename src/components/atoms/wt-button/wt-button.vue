<template>
  <button
    class="wt-button"
    :class="[
      colorClass,
      {
        'wt-button--outline': outline,
        'wt-button--wide': wide,
        'wt-button--large': large,
        'wt-button--disabled': disabled,
      }
    ]"
    type="button"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <wt-loader v-if="loading" size="sm" :color="loaderColor"/>
    <slot v-else></slot>
  </button>
</template>

<script>
  export default {
    name: 'wt-button',
    props: {
      color: {
        type: String,
        default: '',
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
      large: {
        type: Boolean,
        default: false,
      },
      wide: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      colorClass() {
        if (!this.disabled) return `${this.color}`;
        return '';
      },
      loaderColor() {
        if (['success', 'transfer', 'danger'].includes(this.color)) return 'main';
        return 'contrast';
      },
    },
  };
</script>

<style lang="scss" scoped>
  .wt-button {
    @extend %typo-button;
    position: relative;
    display: inline-block;
    padding: var(--btn-padding);
    border: var(--btn-border);
    color: var(--btn-dark-font-color);
    background: var(--btn-primary-color);
    border-color: var(--btn-primary-color);
    border-radius: var(--border-radius);
    transition: var(--transition);
    cursor: pointer;

    &--wide {
      width: 100%;
    }

    &--large {
      padding: var(--btn-lg-padding); // 16px 30px - border
    }

    &--disabled {
      color: var(--disabled-color);
      background: var(--btn-disabled-bg-color);
      border-color: var(--disabled-color);
      cursor: auto;
      pointer-events: none;
    }

    &:hover,
    &:active {
      background: var(--btn-primary--hover-color);
      border-color: var(--btn-primary--hover-color);
    }

    &:not(&--outline) {
      &.secondary {
        color: var(--btn-dark-font-color);
        border-color: var(--btn-secondary-color);
        background: var(--btn-secondary-color);

        &:hover,
        &:active {
          color: var(--btn-dark-font-color);
          border-color: var(--btn-secondary--hover-color);
          background: var(--btn-secondary-color);
        }
      }

      &.success {
        color: var(--btn-light-font-color);
        background: var(--btn-true-color);
        border-color: var(--btn-true-color);

        &:hover,
        &:active {
          background: var(--btn-true--hover-color);
          border-color: var(--btn-true--hover-color);
        }
      }

      &.transfer {
        color: var(--btn-light-font-color);
        background: var(--btn-transfer-color);
        border-color: var(--btn-transfer-color);

        &:hover,
        &:active {
          background: var(--btn-transfer--hover-color);
          border-color: var(--btn-transfer--hover-color);
        }
      }

      &.danger {
        color: var(--btn-light-font-color);
        background: var(--btn-false-color);
        border-color: var(--btn-false-color);

        &:hover,
        &:active {
          background: var(--btn-false--hover-color);
          border-color: var(--btn-false--hover-color);
        }
      }
    }

    &--outline {
      &:not(.wt-button--disabled) {
        color: var(--btn-primary-color);
        border-color: var(--btn-primary-color);
        background: transparent;
      }

      &:hover,
      &:active {
        color: var(--btn-primary--hover-color);
        border-color: var(--btn-primary--hover-color);
        background: transparent;
      }

      &.secondary {
        color: var(--btn-secondary-color);
        border-color: var(--btn-secondary-color);

        &:hover,
        &:active {
          color: var(--btn-secondary--hover-color);
          border-color: var(--btn-secondary--hover-color);
        }
      }

      &.success {
        color: var(--btn-true-color);
        border-color: var(--btn-true-color);

        &:hover,
        &:active {
          color: var(--btn-true--hover-color);
          border-color: var(--btn-true--hover-color);
        }
      }

      &.transfer {
        color: var(--btn-transfer-color);
        border-color: var(--btn-transfer-color);

        &:hover,
        &:active {
          color: var(--btn-transfer--hover-color);
          border-color: var(--btn-transfer--hover-color);
        }
      }

      &.danger {
        color: var(--btn-false-color);
        border-color: var(--btn-false-color);

        &:hover,
        &:active {
          color: var(--btn-false--hover-color);
          border-color: var(--btn-false--hover-color);
        }
      }
    }
  }
</style>
