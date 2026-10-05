<template>
  <div class="message-attachments">
    <div
      v-if="attachments.images.length"
      class="message-attachments__images"
      :class="{ 'message-attachments__images--single': attachments.images.length === 1 }"
    >
      <button
        v-for="{ key, image } of attachments.images"
        :key="key"
        type="button"
        class="message-attachments__image"
        :style="aspectRatio(image)"
        @click="gallery?.open(key)"
      >
        <img
          :src="image.url"
          alt=""
          loading="lazy"
        >
      </button>
    </div>

    <template
      v-for="{ key, document, kind } of attachments.media"
      :key="key"
    >
      <wt-vidstack-player
        v-if="kind === 'video'"
        class="message-attachments__media"
        :src="document.url"
        :mime="document.mime"
        :title="document.name"
        :size="ComponentSize.SM"
        countdown-time-mode
        static
        hide-expand
        stretch
      />
      <wt-player
        v-else
        class="message-attachments__media"
        :src="document.url"
        :autoplay="false"
        :closable="false"
        countdown-time-mode
        hide-volume-slider
        hide-mute-button
      />
    </template>

    <a
      v-for="file of attachments.files"
      :key="file.key"
      class="message-attachments__file"
      :href="file.url"
      target="_blank"
      rel="noopener"
      download
      :title="t('history.download')"
    >
      <wt-icon icon="docs" />
      <span class="message-attachments__file-name typo-body-2">{{ file.name }}</span>
      <span
        v-if="file.size"
        class="message-attachments__file-size typo-caption"
      >{{ prettifyFileSize(file.size) }}</span>
      <wt-icon icon="download" />
    </a>
  </div>
</template>

<script setup lang="ts">
import { WtIcon, WtPlayer, WtVidstackPlayer } from '@webitel/ui-sdk/components';
import { ComponentSize } from '@webitel/ui-sdk/enums';
import { prettifyFileSize } from '@webitel/ui-sdk/scripts';
import { computed, inject } from 'vue';

import { useChatsV2I18n } from '../../../locale/useChatsV2I18n';
import { classifyAttachments } from '../../../scripts/attachments';
import type { ChatImage, MessageModel } from '../../../types';
import { ChatGalleryKey } from '../gallery';

const props = defineProps<{
	message: MessageModel;
}>();

const { t } = useChatsV2I18n();
const gallery = inject(ChatGalleryKey, null);

const attachments = computed(() => classifyAttachments(props.message));

// Reserve the box before the image loads, so a late load cannot shift the
// scroll position.
const aspectRatio = (image: ChatImage) => ({
	aspectRatio:
		image.width && image.height ? `${image.width} / ${image.height}` : '1 / 1',
});
</script>

<style scoped>
.message-attachments {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.message-attachments__images {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--spacing-3xs);
}

.message-attachments__images--single {
  grid-template-columns: minmax(0, 1fr);
}

.message-attachments__image {
  display: block;
  width: 100%;
  max-height: 320px;
  padding: 0;
  border: 0;
  border-radius: var(--border-radius);
  overflow: hidden;
  cursor: zoom-in;
  background: none;
}

.message-attachments__image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-attachments__media {
  width: 100%;
}

.message-attachments__file {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs);
  border-radius: var(--border-radius);
  color: inherit;
  text-decoration: none;
}

.message-attachments__file-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.message-attachments__file-size {
  color: var(--text-disabled-color);
}
</style>
