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
.message-status {
  flex-shrink: 0;
}

.message-status--sent,
.message-status--delivered {
  color: var(--icon-color-secondary);
}

.message-status--read {
  color: var(--icon-color-accent);
}
</style>
