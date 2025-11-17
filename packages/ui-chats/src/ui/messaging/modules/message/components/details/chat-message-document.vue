<template>
  <div v-if="documentFile" class="chat-message-document" :class="{ 'chat-message-document--right': agent }"
    @click="downloadDocument">
    <div class="chat-message-document__icon-wrapper">
      <wt-icon class="chat-message-document__icon" icon="attach" />
    </div>
    <div class="chat-message-document__info-wrapper">
      <a class="chat-message-document__name" :title="documentFile.name">
        {{ documentFile.name }}
      </a>
      <div class="chat-message-document__size">
        {{ documentSize }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue';
import { prettifyFileSize } from '@webitel/ui-sdk/scripts';

import { useChatMessageFile } from '../../composables/useChatMessageFile';

const props = defineProps({
  file: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  agent: {
    type: Boolean,
    default: false,
  },
});

const { document: documentFile } = useChatMessageFile(props.file);

const documentSize = computed(() => {
  if (!documentFile.value) return '';
  return prettifyFileSize(documentFile.value.size);
});

function downloadDocument() {
  if (!documentFile.value) return;
  const a = document.createElement('a');
  a.href = documentFile.value.url;
  a.target = '_blank';
  a.download = documentFile.value.name;
  a.click();
}
</script>

<style lang="scss" scoped>
.chat-message-document {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  padding: var(--spacing-xs);
  background: var(--primary-light-color);
  border-radius: var(--border-radius);

  &__icon-wrapper {
    display: flex;
    justify-content: center;
    margin-right: var(--spacing-xs);
    padding: var(--spacing-2xs);
  }

  &__info-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 0;
  }

  &__name {
    @extend %typo-subtitle-2;
    cursor: pointer;
    overflow-wrap: break-word;
    color: var(--text-main-color);
  }

  &__size {
    @extend %typo-caption;
    color: var(--text-main-color);
  }

  &--right {
    flex-direction: row-reverse;
    background: var(--secondary-light-color);

    .chat-message-document__icon-wrapper {
      margin-right: 0;
      margin-left: var(--spacing-xs);
    }
  }
}
</style>
