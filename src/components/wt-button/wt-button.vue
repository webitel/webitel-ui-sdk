<template>
  <button
    :class="[
      colorClass,
      `wt-button--size-${size}`,
      {
        'wt-button--width-by-content': widthByContent,
        'wt-button--contains-icon': containsIcon,
        'wt-button--wide': wide,
        'wt-button--disabled': disabled,
        'wt-button--loading': showLoader,
      }
    ]"
    :disabled="disabled"
    class="wt-button"
    type="button"
    @click="$emit('click', $event)"
  >
    <!--  Show loader and button contents at the same time to prevent width shift if content > min-width of button -->
    <wt-loader
      v-if="showLoader"
      :color="loaderColor"
      size="sm"
    />
    <div class="wt-button__contents">
      <slot>
        no content provided
      </slot>
    </div>
  </button>
</template>

<script>
export default {
  name: 'WtButton',
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
     * Shrinks button to content width
     */
    widthByContent: {
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
  data: () => ({
    showLoader: false,
  }),
  computed: {
    colorClass() {
      if (!this.disabled) return `${this.color}`;
      return '';
    },
    loaderColor() {
      return 'on-dark';
      // if (['success', 'transfer', 'error', 'job'].includes(this.color)) return 'on-dark';
      // return 'on-light';
    },
  },
  watch: {
    loading: {
      immediate: true,
      handler(value) {
        if (value) {
          this.showLoader = true;
        } else {
          setTimeout(() => {
            this.showLoader = value;
          }, 1000); // why 1s? https://ux.stackexchange.com/a/104782
        }
      },
    },

  },
};
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>
@import '../../../src/css/main.scss';

.wt-button {
  @extend %typo-button;
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  min-width: var(--btn-min-width);
  padding: var(--btn-padding);
  cursor: pointer;
  transition: var(--transition);
  color: var(--btn-primary-text-color);
  border-radius: var(--border-radius);
  background-color: var(--btn-primary-color);
  background-clip: padding-box;

  &__contents {
    display: contents;
  }

  .wt-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &--wide {
    width: 100%;
  }

  &--width-by-content{
    min-width: 0;
  }

  // https://stackoverflow.com/a/11126701
  &--contains-icon {
    line-height: 0;
  }

  &--loading {
    pointer-events: none;

    .wt-button__contents {
      visibility: hidden;
    }
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
    cursor: auto;
    pointer-events: none;
    color: var(--btn-disabled-text-color);
    background-color: var(--btn-disabled-color);
    box-shadow: none;
  }

  .wt-loader {
    margin: auto;
  }
}
</style>
