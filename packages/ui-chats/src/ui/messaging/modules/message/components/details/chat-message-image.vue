<template>
  <div class="chat-message-image" @click="emit('open', props.file)">
    <img
      class="chat-message-image__img"
      :src="props.file.url"
      :alt="props.file.name"
      draggable="false"
    >
  </div>
</template>


<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

import type { ChatMessageFile } from "../../../../types/ChatMessage.types";

const props = defineProps<{
	file: ChatMessageFile;
}>();
const _emit = defineEmits<{
	open: [
		ChatMessageFile,
	];
}>();
</script>


<style lang="scss" scoped>
.chat-message-image {
  cursor: pointer;

  &__img {
    @extend %typo-body-1;
    max-height: var(--chat-file-max-height);
    max-width: var(--chat-file-max-width);
    width: 100%;
  }
}
</style>
