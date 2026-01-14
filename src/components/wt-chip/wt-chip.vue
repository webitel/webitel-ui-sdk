<template>
  <p-chip
    :class="`wt-chip p-chip-${color}`"
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
import { defineProps, withDefaults } from 'vue';

import { ChipColor } from '../../enums';

interface WtProps extends ChipProps {
	/**
	 * Chip color. "main" and "outline" are chip-specific colors
	 * @type {ChipColor}
	 * @default ChipColor.MAIN
	 * @options ['main', 'outline', 'accent', 'secondary', 'secondary-50', 'success', 'danger', 'transfer']
	 */
	color?: ChipColor;
	/**
	 * Makes the chip removable
	 * @type {boolean}
	 * @default false
	 */
	removable?: boolean;
}

withDefaults(defineProps<WtProps>(), {
	color: ChipColor.MAIN,
	removable: false,
});
</script>

<style scoped>
.wt-chip__close-icon {
  cursor: pointer;
}
</style>
