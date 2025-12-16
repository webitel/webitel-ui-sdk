<template>
  <section class="chat-footer-wrapper">
    <slot />
  </section>
</template>

<script setup lang="ts">
const slots = defineSlots<{
	default: () => any;
}>();
</script>

<style scoped>
.chat-footer-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xs);
}
</style>