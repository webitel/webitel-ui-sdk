<template>
  <span class="wt-chip" :class="`wt-chip--${color}-color`">
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: 'wt-chip',
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

<style lang="scss" scoped>
  @import '../../../css/components/atoms/wt-chip/wt-chip';
</style>
