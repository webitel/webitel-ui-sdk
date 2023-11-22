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
@import './variables.scss';
</style>

<style lang="scss" scoped>

.wt-load-bar {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: var(--load-bar-padding);
  line-height: 0;
  border: 1px solid var(--primary-color);
  border-radius: var(--border-radius);
}

.wt-load-bar__progress {
  display: inline-block;
  height: var(--load-bar-height);
  transition: var(--transition);
  border-radius: var(--load-bar-border-radius);
  background: var(--primary-color);
  will-change: width;
}
</style>
