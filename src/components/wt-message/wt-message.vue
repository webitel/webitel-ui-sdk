<template>
  <p-message
    :severity="color"
    :variant="variant"
    :size="primevuqeSizeMap[size]"
    v-bind="$attrs"
  >
    <slot />
  </p-message>
</template>

<script setup lang="ts">
import type { MessageProps } from 'primevue';
import { MessageColor, MessageVariant, ComponentSize } from '../../enums';

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

const primevuqeSizeMap = {
  [ComponentSize.SM]: 'small',
  [ComponentSize.MD]: 'normal',
  [ComponentSize.LG]: 'large',
}
</script>
