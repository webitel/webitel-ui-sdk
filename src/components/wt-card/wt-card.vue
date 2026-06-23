<template>
  <div class="wt-card">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineOptions({
	name: 'WtCard',
});
</script>

<style lang="scss" scoped>
@use '../../css/main' as *;

.wt-card {
  border-radius: var(--wt-card-border-radius);
  padding: var(--wt-card-padding);
  box-shadow: var(--elevation-5);
}
</style>
