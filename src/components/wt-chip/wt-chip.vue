<template>
  <span
    :class="`wt-chip--${color}-color`"
    class="wt-chip"
  >
    <slot />
  </span>
</template>

<script>
export default {
  name: 'WtChip',
  props: {
    /**
     * The color of the chip
     * @values main, primary, secondary, success, warning, error, transfer
     */
    color: {
      type: String,
      default: 'main',
    },
  },
};
</script>

<style lang="scss">
@import './wt-chip.scss';
//@import './variables.scss';
</style>
