<template>
  <div
    class="wt-indicator"
    :class="[
      `wt-indicator--size-${size}`
    ]"
  >
    <span
      class="wt-indicator__indicator"
      :class="[
        `wt-indicator__indicator--${color}`,
      ]"
    ></span>
    <div v-if="isText" class="wt-indicator__text">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'wt-indicator',
  props: {
    color: {
      type: String,
      default: 'secondary',
      options: ['primary', 'secondary', 'accent', 'disabled', 'success', 'danger', 'transfer', 'break-out', 'job'],
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

<style lang="scss" scoped>
.wt-indicator {
  display: flex;
  align-items: center;
}

.wt-indicator__text {
  @extend %typo-subtitle-2;
  margin-left: var(--indicator-text-margin);
}

.wt-indicator__indicator {
  min-width: var(--indicator-dot-size);
  height: var(--indicator-dot-size);
  margin: var(--indicator-dot-offset);
  background: var(--indicator-disabled-color);
  border-radius: 50%;

  &--primary,
  &--accent {
    background: var(--indicator-primary-color);
  }

  &--secondary {
    background: var(--indicator-secondary-color);
  }

  &--disabled {
    background: var(--indicator-disabled-color);
  }

  &--success {
    background: var(--indicator-true-color);
  }

  &--danger {
    background: var(--indicator-false-color);
  }

  &--transfer {
    background: var(--indicator-transfer-color);
  }

  &--break-out {
    background: var(--indicator-break-out-color);
  }

  &--job {
    background: var(--job-color);
  }
}

.wt-indicator--size {
  &-sm {
    .wt-indicator__indicator {
      min-width: var(--indicator-dot-size--size-sm);
      height: var(--indicator-dot-size--size-sm);
    }
    .wt-indicator__text {
      @extend %typo-caption;
    }
  }
  &-md {
    .wt-indicator__indicator {
      min-width: var(--indicator-dot-size--size-md);
      height: var(--indicator-dot-size--size-md);
    }
    .wt-indicator__text {
      @extend %typo-body-1;
    }
  }
}
</style>
