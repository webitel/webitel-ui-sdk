<template>
  <section
    class="the-chat-messages-container"
    @click="focusOnInput"
  >
    <div
      ref="messages-container"
      class="the-chat-messages-container__wrapper wt-scrollbar"
      @scroll="handleChatScroll"
    >
      <div
        ref="chat-content"
        class="the-chat-messages-container__content"
      >
        <chat-observer
          v-if="props.next"
          :next="props.next"
          :loading="props.isLoading"
          @[ChatAction.LoadNextMessages]="handleLoadNextMessages"
        />
        <chat-message
          v-for="(message, index) of props.messages"
          :key="message.id"
          :message="message"
          :agent-name="props.agentName"
          :show-avatar="showAvatar(index)"
          :without-avatars="props.withoutAvatars"
          :username="props.contact?.name"
          @[MessageAction.ClickOnImage]="clickOnImage(message)"
        >
          <template #before-message>
            <chat-date-divider
              v-if="showChatDate(index)"
              :date="message.createdAt"
            />
          </template>
        </chat-message>
      </div>
    </div>
    <scroll-to-bottom-btn
      v-if="showScrollToBottomBtn"
      :new-message-count="newUnseenMessagesCount"
      @scroll="scrollToBottom('smooth')"
    />
  </section>
</template>

<script
  setup
  lang="ts"
>
import { WebitelContactsContact } from '@webitel/api-services/gen/models';
import type { Emitter } from 'mitt';
import { computed, defineProps, inject, useTemplateRef } from 'vue';
import { ChatAction } from '../../chat-footer/modules/user-input/enums/ChatAction.enum';
import type { UiChatsEmitterEvents } from '../../utils/emitter';
import { useChatScroll } from '../composables/useChatScroll';
import { useObserveHeightUntilStable } from '../composables/useObserveHeightUntilStable';
import ChatMessage from '../modules/message/components/chat-message.vue';
import { useChatMessages } from '../modules/message/composables/useChatMessage';
import { MessageAction } from '../modules/message/enums/MessageAction.enum';
import type { ChatMessageType } from '../types/ChatMessage.types';
import ChatDateDivider from './chat-date-divider.vue';
import ChatObserver from './chat-observer.vue';
import ScrollToBottomBtn from './scroll-to-bottom-btn.vue';

const uiChatsEmitter = inject<Emitter<UiChatsEmitterEvents>>('uiChatsEmitter');

const props = withDefaults(
	defineProps<{
		messages: ChatMessageType[];
		next?: boolean;
		isLoading?: boolean;
		withoutAvatars?: boolean;
		agentName?: string;
		contact?: WebitelContactsContact;
		chatId?: string;
		isChatClosed?: boolean;
	}>(),
	{
		next: false,
		isLoading: false,
		withoutAvatars: false,
		chatId: '',
		isChatClosed: false,
	},
);

const emit = defineEmits<(e: typeof ChatAction.LoadNextMessages) => void>();

const chatContainer = useTemplateRef('messages-container');
const chatContent = useTemplateRef('chat-content');

const { showAvatar, showChatDate } = useChatMessages(
	computed(() => props.messages),
); // props values reactivity https://stackoverflow.com/questions/72408463/use-props-in-composables-vue3 @author ye.pohranichna

const {
	showScrollToBottomBtn,
	newUnseenMessagesCount,
	scrollToBottom,
	loadNextMessages,
	handleChatScroll,
} = useChatScroll({
	chatContainer,
	chatContent,
	messages: computed(() => props.messages), // props values reactivity https://stackoverflow.com/questions/72408463/use-props-in-composables-vue3 @author ye.pohranichna
	chatId: computed(() => props.chatId),
	isChatClosed: computed(() => props.isChatClosed),
	isLoading: computed(() => props.isLoading),
	onBeforeStart: ({ scrollToBottom }) => {
		scrollToBottom();
		startObserve();
	},
});

const { startObserve } = useObserveHeightUntilStable(chatContainer, () =>
	scrollToBottom('instant'),
);

function handleLoadNextMessages() {
	loadNextMessages(props.next, () => emit(ChatAction.LoadNextMessages));
}

function focusOnInput() {
	uiChatsEmitter?.on('focusOnTextField', focus);
}

function clickOnImage(message: ChatMessageType) {
	uiChatsEmitter?.emit('clickChatMessageImage', message);
}

// TODO: add loader for all chats(in the-chat-container or in calling component?)
</script>

<style
  scoped
  lang="scss"
>
.the-chat-messages-container {
  position: relative;
  display: flex;
  overflow: hidden;
  height: inherit;
}

.the-chat-messages-container__wrapper {
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  padding-right: var(--scrollbar-width); // scrollbar offset
  scrollbar-gutter: stable both-edges;
}

.the-chat-messages-container__content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
</style>
