<template>
  <div class="wt-indicator">
    <span
      class="wt-indicator__indicator"
      :class="`wt-indicator__indicator--${color}`"
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
    },

    text: {
      type: [String, Number],
    },
  },

  computed: {
    isText() {
      return this.text !== undefined
        || this.text !== null
        || this.text !== '';
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
  @extend %typo-strong-lg;
  margin-left: var(--indicator-text-margin);
}

.wt-indicator__indicator {
  width: var(--indicator-size);
  height: var(--indicator-size);
  background: var(--indicator-disabled-color);
  border-radius: 50%;

  &--primary {
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
}
</style>
