<template>
    <section
      class="the-chat-messages-container"
      @click="focusOnInput"
    >
      <div
        ref="messages-container"
        class="the-chat-messages-container__wrapper"
        @scroll="handleChatScroll"
        @resize="handleChatResize"
      >
        <div v-if="props.next" class="the-chat-messages-container__observer-wrapper">
          <wt-intersection-observer
            :can-load-more="props.next"
            :loading="props.isLoading"
            @next="emit(ChatAction.LoadNextMessages)"
          />
        </div>
        <chat-message
          v-for="(message, index) of props.messages"
          :key="message.id"
          :message="message"
          :show-avatar="showAvatar(index)"
          :without-avatars="props.withoutAvatars"
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

import type {ResultCallbacks} from "../../../../../../src/types";
import {ChatAction} from "../../chat-footer/modules/user-input/enums/ChatAction.enum";
import type { UiChatsEmitterEvents } from "../../utils/emitter";
import { useChatScroll } from "../composables/useChatScroll";
import ChatMessage from "../modules/message/components/chat-message.vue";
import { useChatMessages } from "../modules/message/composables/useChatMessage";
import type { ChatMessageType } from "../types/ChatMessage.types";
import ChatDateDivider from "./chat-date-divider.vue";
import ScrollToBottomBtn from "./scroll-to-bottom-btn.vue";

const uiChatsEmitter = inject<Emitter<UiChatsEmitterEvents>>("uiChatsEmitter");

const props = withDefaults(
	defineProps<{
		messages: ChatMessageType[];
    next?: boolean; // 'next'
    isLoading?: boolean;
    withoutAvatars?: boolean;
	}>(),
	{
    next: false,
    isLoading: false,
    withoutAvatars: false,
	},
);

const emit = defineEmits<{
  (
    e: typeof ChatAction.LoadNextMessages,
    options: ResultCallbacks,
  ): void;
}>();

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
@use '@webitel/styleguide/scroll' as *;

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

// reserve height for the loader to avoid unnecessary chat height changes https://webitel.atlassian.net/browse/WTEL-5366
.chat-history__observer-wrapper {
  min-height: calc(var(--spacing-lg)*2 + var(--icon-md-size)); // observer loader height
  // to place observer at the bottom of observer wrapper (closer to messages)
  display: flex;
  align-items: flex-end;
}

</style>
