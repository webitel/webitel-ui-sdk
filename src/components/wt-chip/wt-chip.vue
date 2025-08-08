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
import { defineProps, withDefaults  } from 'vue';

import { ChipColor } from '../../enums'

interface WtProps extends ChipProps {
  color?: ChipColor;
}

withDefaults(defineProps<WtProps>(), {
  color: ChipColor.MAIN,
  removable: false,
});
</script>

<style lang="scss">
.wt-chip__close-icon {
  cursor: pointer;
}
</style>
