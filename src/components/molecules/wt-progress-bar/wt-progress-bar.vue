<template>
  <div class="wt-progress-bar" :class="[{
      'wt-progress-bar--overflow': isOverflow,
     },
     `wt-progress-bar--${color}`
     ]">
    <span class="wt-progress-bar__progress" :style="`width: ${this.progressWidth}%;`"></span>
  </div>
</template>

<script>
export default {
  name: 'wt-progress-bar',
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
      options: ['primary', 'secondary', 'success', 'danger'],
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

<style lang="scss" scoped>
.wt-progress-bar {
  box-sizing: border-box;
  width: 100%;
  position: relative;
  padding: var(--progress-bar-padding);
  line-height: 0;
  border-radius: var(--border-radius);
  box-shadow: var(--elevation-1);
}

.wt-progress-bar__progress {
  display: inline-block;
  height: var(--progress-bar-height);
  will-change: width;
  background: var(--accent-color);
  border-radius: var(--progress-bar-border-radius) 0 0 var(--progress-bar-border-radius);
  transition: var(--transition);
}

.wt-progress-bar--primary .wt-progress-bar__progress {
  background: var(--progress-bar-bg-color--primary);
}
.wt-progress-bar--secondary .wt-progress-bar__progress {
  background: var(--progress-bar-bg-color--secondary);
}
.wt-progress-bar--success .wt-progress-bar__progress {
  background: var(--progress-bar-bg-color--success);
}
.wt-progress-bar--danger .wt-progress-bar__progress {
  background: var(--progress-bar-bg-color--danger);
}

.wt-progress-bar--overflow .wt-progress-bar__progress {
  border-radius: var(--progress-bar-border-radius);
}
</style>
