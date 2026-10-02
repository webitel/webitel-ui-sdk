<template>
  <div :class="`wt-content-wrapper--align-${align}`" class="wt-content-wrapper">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * Structural container inside `wt-layout`: owns inner padding, gap and
 * horizontal alignment of its content. No business logic, no own visuals
 * beyond the surface.
 */
interface Props {
	align?: 'left' | 'center' | 'stretch';
}

withDefaults(defineProps<Props>(), {
	align: 'left',
});
</script>

<style scoped>
.wt-content-wrapper {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: var(--wt-content-wrapper-gap);
  box-sizing: border-box;
  border-radius: var(--wt-content-wrapper-border-radius);
  background: var(--wt-content-wrapper-background-color);
  padding: var(--wt-content-wrapper-padding);
  min-width: 0;
}

.wt-content-wrapper--align-left {
  align-items: flex-start;
}

.wt-content-wrapper--align-center {
  align-items: center;
}

.wt-content-wrapper--align-stretch {
  align-items: stretch;
}
</style>
