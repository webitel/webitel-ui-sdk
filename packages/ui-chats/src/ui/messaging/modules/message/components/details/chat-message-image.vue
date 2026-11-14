<template>
  <div
    class="chat-message-image"
    @click="emit('open', props.file)"
  >
    <img
      class="chat-message-image__img typo-body-1"
      :src="safeSrc"
      :alt="props.file.name"
      draggable="false"
    >
  </div>
</template>


<script
  setup
  lang="ts"
>
import { computed } from 'vue';
import { toSafeAttachmentUrl } from '../../../../../../shared/scripts/isSafeAttachmentUrl';
import type { ChatMessageFile } from '../../../../types/ChatMessage.types';

const props = defineProps<{
	file: ChatMessageFile;
}>();

const safeSrc = computed(() => toSafeAttachmentUrl(props.file.url));
const emit = defineEmits<{
	open: [
		ChatMessageFile,
	];
}>();
</script>


<style
  scoped
>
.chat-message-image {
  cursor: pointer;
}

.chat-message-image__img {
  max-height: var(--chat-file-max-height);
  max-width: var(--chat-file-max-width);
  width: 100%;
}
</style>
