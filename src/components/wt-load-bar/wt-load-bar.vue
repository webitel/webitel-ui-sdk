<template>
  <div class="wt-load-bar">
    <span
      :style="`width: ${progressWidth}%;`"
      class="wt-load-bar__progress"
    />
  </div>
</template>

<script>
export default {
  name: 'WtLoadBar',
  props: {
    max: {
      type: [Number, String],
      default: 100,
    },
    value: {
      type: [Number, String],
      default: 0,
    },
  },
  computed: {
    progress() {
      return (this.value * 100) / this.max;
    },
    progressWidth() {
      return this.isOverflow ? 100 : this.progress;
    },
  },
};
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
.wt-load-bar {
  position: relative;
  box-sizing: border-box;
  border: 1px solid var(--wt-load-bar-progress-color);
  border-radius: var(--border-radius);
  padding: var(--load-bar-padding);
  width: 100%;
  line-height: 0;
}

.wt-load-bar__progress {
  display: inline-block;
  transition: var(--transition);
  will-change: width;
  border-radius: var(--load-bar-border-radius);
  background: var(--wt-load-bar-progress-color);
  height: var(--load-bar-height);
}
</style>
