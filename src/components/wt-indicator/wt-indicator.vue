<template>
  <div
    :class="[`wt-indicator--size-${size}`]"
    class="wt-indicator"
  >
    <span
      :class="[`wt-indicator__indicator--${color}`]"
      class="wt-indicator__indicator"
    />
    <div
      v-if="isText"
      class="wt-indicator__text"
    >
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'WtIndicator',
  props: {
    /**
     * The color variant for the component
     * @values 'primary', 'secondary', 'disabled', 'success', 'error', 'transfer', 'break-out', 'info', 'final-status', 'other-status', 'initial-status'
     * @example '<wt-indicator color="primary"></wt-indicator>'
     */
    color: {
      type: String,
      default: 'secondary',
      options: [
        'primary',
        'secondary',
        'disabled',
        'success',
        'error',
        'transfer',
        'break-out',
        'info',
        'final-status',
        'other-status',
        'initial-status',
      ],
    },
    /**
     * The text content for the component
     * Can be a string or a number
     * @example '<wt-indicator text="Sample Text"></wt-indicator>'
     */
    text: {
      type: [String, Number],
    },
    /**
     * The size of the component
     * @values 'sm', 'md'
     * @default 'md'
     * @example '<wt-indicator size="sm"></wt-indicator>'
     */
    size: {
      type: String,
      default: 'md',
      options: ['sm', 'md'],
    },
  },

  computed: {
    isText() {
      return this.text !== undefined && this.text !== null && this.text !== '';
    },
  },
};
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.wt-indicator {
  display: flex;
  align-items: center;
}

.wt-indicator__text {
  @extend %typo-body-1;
  margin-left: var(--wt-indicator-text-margin);
  color: var(--wt-indicator-text-color);
}

.wt-indicator__indicator {
  margin: var(--wt-indicator-dot-offset);
  border-radius: 50%;
  background: var(--wt-indicator-disabled-color);
  min-width: var(--wt-indicator-dot-size);
  height: var(--wt-indicator-dot-size);

  &--primary {
    background: var(--wt-indicator-primary-color);
  }

  &--secondary {
    background: var(--wt-indicator-secondary-color);
  }

  &--disabled {
    background: var(--wt-indicator-disabled-color);
  }

  &--success {
    background: var(--wt-indicator-success-color);
  }

  &--error {
    background: var(--wt-indicator-error-color);
  }

  &--transfer {
    background: var(--wt-indicator-transfer-color);
  }

  &--break-out {
    background: var(--wt-indicator-break-out-color);
  }

  &--info {
    background: var(--wt-indicator-info-color);
  }

  &--final-status {
    background: var(--wt-indicator-final-status-color);
  }

  &--other-status {
    background: var(--wt-indicator-other-status-color);
  }

  &--initial-status {
    background: var(--wt-indicator-initial-status-color);
  }
}

.wt-indicator--size {
  &-sm {
    .wt-indicator__indicator {
      min-width: var(--wt-indicator-dot-size--size-sm);
      height: var(--wt-indicator-dot-size--size-sm);
    }

    .wt-indicator__text {
      @extend %typo-caption;
    }
  }

  &-md {
    .wt-indicator__indicator {
      min-width: var(--wt-indicator-dot-size--size-md);
      height: var(--wt-indicator-dot-size--size-md);
    }

    .wt-indicator__text {
      @extend %typo-body-1;
    }
  }
}
</style>
