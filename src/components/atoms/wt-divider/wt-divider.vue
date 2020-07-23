<template>
  <hr class="wt-divider">
</template>

<script>
  export default {
    name: 'wt-divider',
  };
</script>

<style lang="scss" scoped>
  .divider {
    display: block;
    width: 100%;
    max-width: 100%;
    height: 0;
    max-height: 0;
    padding: 0;
    margin: 0;
    border: var(--divider-border);
    border-color: var(--divider-border-color);
    border-top-width: thin;
  }
</style>
