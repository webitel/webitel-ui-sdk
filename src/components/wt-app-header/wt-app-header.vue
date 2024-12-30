<template>
  <header class="wt-app-header">
    <slot />
  </header>
</template>

<script setup>
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
.wt-app-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-sizing: border-box;
  min-height: var(--wt-app-header-min-height); // fixed height because anything can be put inside slot, so padding won't work properly
  padding: var(--wt-app-header-padding);
  background: var(--wt-app-header-background);
  gap: var(--wt-app-header-content-gap);
}
</style>
