<template>
  <span
    class="wt-chip"
    :class="`wt-chip--${color}-color`"
  >
    <slot />
  </span>
</template>

<script>
export default {
  name: 'WtChip',
  props: {
    color: {
      type: String,
      default: 'main',
      options: ['main', 'outline', 'accent', 'secondary', 'secondary-50', 'success', 'danger', 'transfer'],
      notes: '"main" and "outline" are chip-specific colors',
    },
  },
};
</script>

<style lang="scss">
@import './wt-chip.scss';
@import './variables.scss';
</style>
