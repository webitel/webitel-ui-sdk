<template>
  <p-message
    :severity="color"
    :variant="variant"
    :size="primevueSizeMap[size]"
    v-bind="$attrs"
  >
    <template #icon>
      <slot name="icon" />
    </template>
    <slot />
    <template #closeicon>
      <wt-icon 
        icon="close"
        :size="ComponentSize.SM"
      />
    </template>
  </p-message>
</template>

<script setup lang="ts">
import type { MessageProps } from 'primevue';

import { ComponentSize, MessageColor, MessageVariant } from '../../enums';

interface WtMessageProps extends /* @vue-ignore */ MessageProps {
	color?: MessageColor;
	variant?: MessageVariant;
	size?: ComponentSize;
}

withDefaults(defineProps<WtMessageProps>(), {
	color: MessageColor.SECONDARY,
	variant: MessageVariant.FILLED,
	size: ComponentSize.MD,
});

const primevueSizeMap: Record<string, string> = {
	[ComponentSize.SM]: 'small',
	[ComponentSize.MD]: 'normal',
	[ComponentSize.LG]: 'large',
};
</script>
