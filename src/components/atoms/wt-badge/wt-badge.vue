<template>
  <span class="wt-badge">
    <slot></slot>
  </span>
</template>

<script>
  export default {
    name: 'wt-badge',
  };
</script>

<style lang="scss" scoped>
  .wt-badge {
    @extend %typo-body-md;

    display: inline-block;
    padding: 5px 10px;
    background: var(--badge-bg-color);
    border-radius: 20px;
  }
</style>
