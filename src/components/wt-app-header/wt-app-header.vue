<template>
  <header class="wt-app-header">
    <slot />
  </header>
</template>

<script setup></script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
.wt-app-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--wt-app-header-content-gap);
  box-sizing: border-box;
  background: var(--wt-app-header-background);
  padding: var(--wt-app-header-padding);
  min-height: var(
    --wt-app-header-min-height
  ); // fixed height because anything can be put inside slot, so padding won't work properly
}
</style>
