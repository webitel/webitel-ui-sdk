<template>
  <div class="wt-card">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.wt-card {
  min-width: 0;
  border-radius: var(--wt-card-border-radius);
  padding: var(--wt-card-padding);
  box-shadow: var(--elevation-1);
}
</style>
