<template>
  <div
    class="chat-message-player"
    @click="emit('open', props.file)"
  >
    <wt-vidstack-player
      v-if="isVideo"
      :size="ComponentSize.SM"
      :src="mediaSrc"
      static
      hide-expand
      stretch
      countdown-time-mode
    />
    <wt-player
      v-else
      :src="mediaSrc"
      :autoplay="false"
      :closable="false"
      hide-volume-slider
      hide-mute-button
      class="chat-message-player__player"
      @initialized="handlePlayerInitialize"
    />
  </div>
</template>

<script setup lang="ts">
import { WtPlayer, WtVidstackPlayer } from '@webitel/ui-sdk/components';
import { ComponentSize } from '@webitel/ui-sdk/enums';
import { computed, defineEmits, defineProps } from 'vue';

import type { ChatMessageFile } from '../../../../types/ChatMessage.types';

const props = defineProps<{
	file: ChatMessageFile;
	type: string;
}>();

const emit = defineEmits<{
	open: [
		ChatMessageFile,
	];
	initialized: [
		object,
	];
}>();

const isVideo = computed(() => {
	return mediaSrc.value?.type?.includes('video');
});
const mediaSrc = computed(() => {
	return {
		src: props.file.streamUrl || props.file.url,
		type: props.type,
	};
});

function handlePlayerInitialize(player) {
	emit('initialized', player);
}
</script>

<style lang="scss" scoped>
.chat-message-player :deep(.wt-vidstack-player) {
  max-height: var(--chat-file-max-height);
  max-width: var(--chat-file-max-width);
}


</style>
