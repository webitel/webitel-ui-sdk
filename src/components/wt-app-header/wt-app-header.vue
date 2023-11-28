<template>
  <header class="wt-app-header">
    <slot />
  </header>
</template>

<script setup>
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>

.wt-app-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--wt-app-header-content-gap);
  min-height: var(--wt-app-header-min-height); // fixed height because anything can be put inside slot, so padding won't work properly
  padding: var(--wt-app-header-padding);
  box-sizing: border-box;
  background: var(--wt-app-header-background);
}
</style>
