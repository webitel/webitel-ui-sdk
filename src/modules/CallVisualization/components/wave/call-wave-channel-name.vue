<template>
  <div class="call-wave-channel-name">
    <wt-icon
      icon="user"
      :color="color"
    />
    <span>{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
import type { IconColor } from '../../../../enums';

defineProps<{
	name: string;
	color: IconColor;
}>();
</script>

<style scoped>
.call-wave-channel-name {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  box-sizing: border-box;
  min-height: 0;
}
</style>
