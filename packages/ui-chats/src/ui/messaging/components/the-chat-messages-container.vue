<template>
    <section class="the-chat-messages-container" @click="focusOnInput">
      <div
        ref="messages-container"
        class="the-chat-messages-container__wrapper"
        @scroll="handleChatScroll"
        @resize="handleChatResize"
      >
        <chat-message
          v-for="(message, index) of props.messages"
          :key="message.id"
          :message="message"
          :show-avatar="!props.hideAvatars && showAvatar(index)"
        >
          <template #before-message>
            <chat-date-divider
              v-if="showChatDate(index)"
              :date="message.createdAt"
            />
          </template>
        </chat-message>
      </div>
      <scroll-to-bottom-btn
        v-if="showScrollToBottomBtn"
        :new-message-count="newUnseenMessages"
        @scroll="scrollToBottom('smooth')"
      />
    </section>
</template>

<script setup lang="ts">
import type { Emitter } from "mitt";
import { inject, useTemplateRef } from "vue";

import type { UiChatsEmitterEvents } from "../../utils/emitter";
import { useChatScroll } from "../composebles/useChatScroll";
import ChatMessage from "../modules/message/components/chat-message.vue";
import { useChatMessages } from "../modules/message/composables/useChatMessage";
import type { ChatMessageType } from "../types/ChatMessage.types";
import ChatDateDivider from "./chat-date-divider.vue";
import ScrollToBottomBtn from "./scroll-to-bottom-btn.vue";

const uiChatsEmitter = inject<Emitter<UiChatsEmitterEvents>>("uiChatsEmitter");

const props = withDefaults(
	defineProps<{
		messages: ChatMessageType[];
		hideAvatars?: boolean;
	}>(),
	{
		hideAvatars: false,
	},
);

const messagesContainer = useTemplateRef("messages-container");

const { showAvatar, showChatDate } = useChatMessages(props.messages);

const {
	showScrollToBottomBtn,
	newUnseenMessages,
	scrollToBottom,
	handleChatScroll,
	handleChatResize,
} = useChatScroll(messagesContainer, props.messages);

function focusOnInput() {
	uiChatsEmitter?.on("focusOnTextField", focus);
}
</script>

<style scoped lang="scss">
.the-chat-messages-container {
  position: relative;
  display: flex;
  overflow: hidden;
  height: inherit;
}

.the-chat-messages-container__wrapper {
  @extend %wt-scrollbar;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  padding-right: var(--scrollbar-width); // scrollbar offset
  scrollbar-gutter: stable both-edges;
  gap: var(--spacing-xs);
}
</style>
