<template>
  <p-chip
    :class="`p-chip-${color}`"
    :removable="removable"
  >
    <slot />
    <template #removeicon>
      <wt-icon class="wt-chip__close-icon" icon="close--filled" />
    </template>
  </p-chip>
</template>

<script setup lang="ts">
import type { ChipProps } from 'primevue/chip';
import { defineProps, withDefaults  } from 'vue';

interface WtProps extends ChipProps {
  color?: 'main' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'transfer';
}

withDefaults(defineProps<WtProps>(), {
  color: 'main',
  removable: false,
});
</script>

<style lang="scss">
@use './variables.scss';
@use './wt-chip.scss';

.wt-chip__close-icon {
  cursor: pointer;
}
</style>
