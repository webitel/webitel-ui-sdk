<template>
  <div
    :class="[
      `wt-indicator--size-${size}`
    ]"
    class="wt-indicator"
  >
    <span
      :class="[
        `wt-indicator__indicator--${color}`,
      ]"
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
      ],
    },
    text: {
      type: [String, Number],
    },
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
@import './variables.scss';
</style>

<style lang="scss" scoped>
@import '../../../src/css/main.scss';

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
  min-width: var(--wt-indicator-dot-size);
  height: var(--wt-indicator-dot-size);
  margin: var(--wt-indicator-dot-offset);
  border-radius: 50%;
  background: var(--wt-indicator-disabled-color);

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
