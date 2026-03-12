<template>
  <div
    class="chat-message-player"
    @click="emit('open', props.file)"
  >
    <wt-vidstack-player
      v-if="isVideo"
      static
      hide-expand
      stretch
      :size="ComponentSize.SM"
      :src="mediaSrc"
    />
    <wt-player
      v-else
      :src="mediaSrc"
      :autoplay="false"
      :closable="false"
      :id="ringtone.name"
      hide-volume-slider
      class="chat-message-player__player"
      @initialized="handlePlayerInitialize"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';
import { WtVidstackPlayer, WtPlayer } from '@webitel/ui-sdk/components';
import { ComponentSize } from '@webitel/ui-sdk/enums';

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
