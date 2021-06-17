<template>
  <span class="wt-badge" :class="`wt-badge--${color}-color`">
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: 'wt-badge',
    props: {
      color: {
        type: String,
        default: 'main',
        options: ['main', 'outline', 'accent', 'secondary', 'success', 'danger', 'transfer'],
        notes: '"main" and "outline" are badge-specific colors',
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../../css/components/atoms/wt-badge/wt-badge';
</style>
