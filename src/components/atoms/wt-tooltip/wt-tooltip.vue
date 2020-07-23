<template>
  <span
    class="wt-tooltip"
    :class="{
      'wt-tooltip--visible': visible,
      'wt-tooltip--contrast': contrast
    }"
  >
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: 'wt-tooltip',
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      contrast: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .wt-tooltip {
    @extend %typo-body-lg;
    display: inline-block;
    min-width: 0;
    padding: var(--tooltip-padding);
    color: var(--tooltip-light-text-color);
    background: var(--tooltip-light-bg-color);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    transition: var(--transition);
    opacity: 0;
    pointer-events: none;
    z-index: var(--tooltip-z-index);

    &--contrast {
      color: var(--tooltip-dark-text-color);
      background: var(--tooltip-dark-bg-color);
    }

    &--visible, &:hover {
      opacity: 1;
      pointer-events: auto;
    }
  }
</style>
