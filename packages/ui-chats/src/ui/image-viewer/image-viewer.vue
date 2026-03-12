<template>
  <aside
    v-if="media"
    class="media-viewer"
    @click="close"
  >
    <div class="media-viewer__shadow" />
    <div class="media-viewer__content-wrapper">
      <img
        class="media-viewer__content-img"
        :src="media.url"
        :alt="media.name"
      >
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { ChatMessageFile } from '../messaging/types/ChatMessage.types';

defineProps<{
	media: ChatMessageFile | null;
}>();

const emit = defineEmits<{
	close: [];
}>();

function close() {
	emit('close');
}
</script>

<style scoped>
.media-viewer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--popup-wrapper-z-index);
  display: flex;
  align-items: center;
  justify-content: center;
}

.media-viewer__shadow {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: var(--wt-popup-shadow-color);
}

.media-viewer__content-wrapper {
  position: relative;
  z-index: 1;
}

.media-viewer__content-img {
  /* like on web telegram preview */
  display: block;
  max-width: 100vw;
  max-height: 90vh;
  object-fit: contain;
  margin: auto;
}
</style>
