<script setup>
import { ref } from 'vue';

const value = ref('');
</script>

<template>
  <div class="example-collapsible-search-bar">
    <wt-collapsible-search-bar
      :value="value"
      @input="value = $event"
    />
    <wt-icon-btn icon="refresh" />
  </div>
</template>

<style scoped>
.example-collapsible-search-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-sm);
}
</style>
