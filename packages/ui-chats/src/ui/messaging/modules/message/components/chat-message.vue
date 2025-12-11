<template>
  <div
    :class="{
       'chat-message--right' : isSelfSide,
       'chat-message--md': size === ComponentSize.MD
      }"
    class="chat-message"
  >
    <slot name="before-message" />

    <div class="chat-message__content">
      <div class="chat-message__avatar-wrapper">
        <message-avatar
          v-if="props.showAvatar"
          :bot="isBot"
          :username="getClientUsername"
        />
      </div>
      <!--    click.stop prevents focus on textarea and allows to select the message-new text -->
      <message-blocked-error v-if="message.file?.malware" @click.stop />
      <div v-else @click.stop>
        <message-player
          v-if="media"
          :file="media"
          :type="media.mime"
          :size="size"
          @initialized="handlePlayerInitialize"
        />
        <message-image
          v-else-if="image"
          :file="image"
          @open="emit('open-image')"
        />
        <message-document
          v-else-if="document"
          :file="document"
        />
        <message-text
          v-if="props.message?.text"
          :text="props.message.text"
        />
      </div>
      <message-time
        :date="props.message.createdAt"
      />
    </div>

    <slot name="after-message" />
  </div>
</template>

  <script setup lang="ts">
import type { ComponentSize } from "@webitel/ui-sdk/enums";
import { computed, defineEmits, defineProps, inject } from "vue";

import type { ChatMessageType } from "../../../types/ChatMessage.types";
import { useChatMessageFile } from "../composables/useChatMessageFile";

const props = withDefaults(
	defineProps<{
		message: ChatMessageType;
		showAvatar?: boolean;
		username?: string;
	}>(),
	{
		showAvatar: false,
		username: "",
	},
);

const emit = defineEmits<{
	"open-image": [];
	"initialized-player": [
		object,
	];
}>();

const _size = inject<ComponentSize>("size");

const { image, media, document } = useChatMessageFile(props.message.file);

const isSelfMessage = computed(
	() => props.message.member?.self || props.message.member?.type === "webitel",
);

const isBot = computed(
	() =>
		props.message.member?.type === "bot" ||
		(!props.message.member?.type && !props.message.channelId),
);

const isSelfSide = computed(() => isSelfMessage.value || isBot.value);

const _getClientUsername = computed(() => {
	return !isSelfSide.value ? props.username : ""; // need to show username avatar only for client
});

function _handlePlayerInitialize(player) {
	emit("initialized-player", {
		player,
	});
}
</script>

<style scoped>

.chat-message {
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  gap: var(--spacing-2xs);
}

.chat-message:last-child {
  margin-bottom: var(--spacing-xs);
}

.chat-message__content {
  display: flex;
  flex: 1;
  min-width: 0;
  /** prevents height difference from its content */
  line-height: 0;
  gap: var(--spacing-xs);
  margin: 0 var(--spacing-md) 0 var(--spacing-2xs);
}

.chat-message__avatar-wrapper {
  flex: 0 0 var(--spacing-lg);
  width: var(--wt-avatar-size--size-sm);
}

.chat-message-avatar {
  width: 100%;
  flex: 0 0 var(--icon-lg-size);
}

.chat-message--right .chat-message__content {
  flex-direction: row-reverse;
  margin: 0 var(--spacing-2xs) 0 var(--spacing-md);
}

.chat-message--right .chat-message-text {
  background: var(--secondary-light-color);
  color: var(--secondary-on-color);
  place-self: flex-end;
}

</style>
