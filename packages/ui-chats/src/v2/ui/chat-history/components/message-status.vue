<template>
  <wt-icon
    class="message-status"
    :class="`message-status--${props.status}`"
    :icon="props.status === 'sent' ? 'tick' : 'chat-message-status-read'"
    size="sm"
    :aria-label="props.status"
  />
</template>

<script setup lang="ts">
import { WtIcon } from '@webitel/ui-sdk/components';

import type { ChatMessageStatus } from '../../../types';

const props = defineProps<{
	status: ChatMessageStatus;
}>();
</script>

<style scoped>
/* wt-icon paints with fill: var(--icon-color) */
.message-status {
  flex-shrink: 0;
  --icon-color: currentColor;
}

.message-status--read {
  --icon-color: var(--info-color);
}
</style>
