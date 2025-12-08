<template>
    <section class="chat-messages-container" @click="focusOnInput">
      <div
        ref="messages-container"
        @scroll="handleChatScroll"
        @resize="handleChatResize"
      >
        <chat-message-component
          v-for="(message, index) of messages"
          :key="message.id"
          :message="message"
          :show-avatar="showAvatar(index)"
        >
          <template #before-message>
            <chat-date
              v-if="showChatDate(index)"
              :date="message.createdAt"
            />
          </template>
        </chat-message-component>
      </div>
      <scroll-to-bottom-btn
        v-if="showScrollToBottomBtn"
        :new-message-count="newUnseenMessages"
        @scroll="scrollToBottom('smooth')"
      />
    </section>
</template>

<script setup lang="ts">
import { inject, useTemplateRef } from "vue";

import { useChatScroll } from "./composebles/useChatScroll";
import ChatMessageComponent from './modules/message/components/chat-message.vue';
import { useChatMessages } from "./modules/message/composables/useChatMessage";
import type { ChatMessageType } from "./types/ChatMessage.types";
const messagesContainer = useTemplateRef('messages-container');

const eventBus = inject('$eventBus');

const _props = defineProps<{
	messages: ChatMessageType[];
}>();

const {
  showAvatar,
  showChatDate,
} = useChatMessages(_props.messages);

const {
  showScrollToBottomBtn,
  newUnseenMessages,
  scrollToBottom,
  handleChatScroll,
  handleChatResize
} = useChatScroll(messagesContainer, _props.messages);


function focusOnInput() {
  eventBus.$emit('chat-input-focus');
}


</script>
