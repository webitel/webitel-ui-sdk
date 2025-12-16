<template>
  <div
    class="chat-message-document"
    :class="{ 'chat-message-document--right': props.selfSide }"
    @click="downloadDocument"
  >
    <div class="chat-message-document__icon-wrapper">
      <wt-icon class="chat-message-document__icon" icon="attach" />
    </div>
    <div class="chat-message-document__info-wrapper">
      <a class="chat-message-document__name" :title="props.file.name">
        {{ props.file.name }}
      </a>
      <div class="chat-message-document__size">
        {{ documentSize }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { prettifyFileSize } from "@webitel/ui-sdk/scripts";
import { computed, defineProps } from "vue";

import type { ChatMessageFile } from "../../../../types/ChatMessage.types";

const props = withDefaults(
	defineProps<{
		file: ChatMessageFile;
		selfSide?: boolean;
	}>(),
	{
		selfSide: false,
	},
);
const documentSize = computed(() => {
	if (!props.file) return "";
	return prettifyFileSize(props.file.size);
});

function downloadDocument() {
	if (!props.file) return;
	const a = document.createElement("a");
	a.href = props.file.url;
	a.target = "_blank";
	a.download = props.file.name;
	a.click();
}
</script>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

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

    .chat-message-new-document__icon-wrapper {
      margin-right: 0;
      margin-left: var(--spacing-xs);
    }
  }
}
</style>
