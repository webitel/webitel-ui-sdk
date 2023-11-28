<template>
  <div
    class="wt-progress-bar"
    :class="[{
               'wt-progress-bar--overflow': isOverflow,
             },
             `wt-progress-bar--${color}`
    ]"
  >
    <span
      class="wt-progress-bar__progress"
      :style="`width: ${progressWidth}%;`"
    />
  </div>
</template>

<script>
export default {
  name: 'WtProgressBar',
  props: {
    max: {
      type: [Number, String],
      default: 100,
    },
    value: {
      type: [Number, String],
      default: 0,
    },
    color: {
      type: String,
      default: 'primary',
      options: ['primary', 'secondary', 'success', 'error'],
    },
  },
  computed: {
    progress() {
      return (this.value * 100) / this.max;
    },
    isOverflow() {
      return this.progress >= 100;
    },
    progressWidth() {
      return this.isOverflow ? 100 : this.progress;
    },
  },
};
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>

.wt-progress-bar {
  box-sizing: border-box;
  width: 100%;
  position: relative;
  padding: var(--wt-progress-bar-padding);
  line-height: 0;
  background: var(--wt-progress-bar-background-color);
  border-radius: var(--border-radius);
  box-shadow: var(--elevation-1);
}

.wt-progress-bar__progress {
  display: inline-block;
  height: var(--wt-progress-bar-height);
  will-change: width;
  background: var(--wt-progress-bar-background-primary-color);
  border-radius: var(--wt-progress-bar-border-radius) 0 0 var(--wt-progress-bar-border-radius);
  transition: var(--transition);
}

.wt-progress-bar--primary .wt-progress-bar__progress {
  background: var(--wt-progress-bar-background-primary-color);
}

.wt-progress-bar--secondary .wt-progress-bar__progress {
  background: var(--wt-progress-bar-background-secondary-color);
}

.wt-progress-bar--success .wt-progress-bar__progress {
  background: var(--wt-progress-bar-background-success-color);
}

.wt-progress-bar--error .wt-progress-bar__progress {
  background: var(--wt-progress-bar-background-error-color);
}

.wt-progress-bar--warning .wt-progress-bar__progress {
  background: var(--wt-progress-bar-background-warning-color);
}

.wt-progress-bar--overflow .wt-progress-bar__progress {
  border-radius: var(--wt-progress-bar-border-radius);
}
</style>
