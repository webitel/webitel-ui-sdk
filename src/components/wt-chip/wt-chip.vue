<template>
  <p-chip
    class="wt-chip typo-body-2"
    :class="[
      `p-chip-${color}`,
      {
        'p-chip--constrained': constrained
      }
    ]"
    :removable="removable"
  >
    <div class="wt-chip__label">
      <slot />
    </div>
    <template #removeicon>
      <wt-icon-btn
				class="wt-chip__close-icon" 
				icon="close--filled" 
				:size="ComponentSize.SM"
				:color="ChipColor.ON_PRIMARY"
				@click="emit('remove')"
			/>
    </template>
  </p-chip>
</template>

<script setup lang="ts">
import type { ChipProps } from 'primevue/chip';

import { ChipColor, ComponentSize } from '../../enums';

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
	constrained?: boolean;
}

withDefaults(defineProps<WtProps>(), {
	color: ChipColor.MAIN,
	removable: false,
	constrained: false,
});

const emit = defineEmits<{
	remove: [];
}>();
</script>

<style scoped>
.wt-chip__close-icon {
  cursor: pointer;
}
</style>
