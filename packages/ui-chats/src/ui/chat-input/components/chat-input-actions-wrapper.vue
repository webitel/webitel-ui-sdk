<template>
  <section class="chat-input-actions-wrapper">
    <slot name="actions" />
  </section>
</template>

<script setup lang="ts">


</script>

<style scoped>
.chat-input-actions-wrapper {
  display: flex;
  gap: var(--spacing-2xs);

  > * {
    flex: 1;
  }
}
</style>