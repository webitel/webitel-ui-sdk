<template>
  <header class="wt-app-header">
    <slot></slot>
  </header>
</template>

<script>
  export default {
    name: 'wt-app-header',
  };
</script>

<style lang="scss" scoped>
  .wt-app-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: var(--wt-app-header-min-height); // fixed height because anything can be put inside slot, so padding won't work properly
    padding: var(--wt-app-header-padding);
    box-sizing: border-box;
    background: var(--header-color);
  }
</style>
