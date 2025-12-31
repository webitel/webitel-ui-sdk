<template>
  <section class="the-chat-container">
    <!-- <slot name="header">
            header goes here
        </slot> -->
        <slot name="main">
          <dropzone
            v-if="!isDropzoneDisabled && isDropzoneVisible"
            @dragenter.prevent
            @dragleave.prevent="handleDragLeave"
            @drop="sendFile"
          />
          <chat-messages-container
            :messages="props.messages"
            :without-avatars="props.withoutAvatars"
            @[ChatAction.AttachFiles]="sendFile"
          />
        </slot>
        <slot name="footer">
          <chat-footer-wrapper>
            <template #default>
              <chat-text-field
                  v-model:text="draft"
              />
              <chat-input-actions-bar
                :actions="props.chatActions"
                @[ChatAction.SendMessage]="sendMessage"
                @[ChatAction.AttachFiles]="sendFile"
              >
              <template
                v-for="action in slottedChatActions"
                :key="action"
                #[action]="{ size }"
              >
                <slot
                  :name="`action:${action}`"
                  v-bind="{ size }"
                />
              </template>
            </chat-input-actions-bar>
            </template>
          </chat-footer-wrapper>
        </slot>
    </section>
</template>

<script setup lang="ts">
import { ComponentSize } from "@webitel/ui-sdk/enums";
import { computed, provide, ref } from "vue";

import ChatFooterWrapper from "./chat-footer/components/chat-footer-wrapper.vue";
import ChatInputActionsBar from "./chat-footer/modules/user-input/components/chat-input-actions-bar.vue";
import ChatTextField from "./chat-footer/modules/user-input/components/chat-text-field.vue";
import {
	ChatAction,
	type SharedActionSlots,
} from "./chat-footer/modules/user-input/enums/ChatAction.enum";
import Dropzone from "./messaging/components/dropzone.vue";
import ChatMessagesContainer from "./messaging/components/the-chat-messages-container.vue";
import { useDropzoneHandlers } from "./messaging/composables/useDropzoneHandlers";
import { MessageAction } from "./messaging/modules/message/enums/MessageAction.enum";
import type { ChatMessageType } from "./messaging/types/ChatMessage.types";
import { createUiChatsEmitter } from "./utils/emitter";
import type { ResultCallbacks } from "./utils/ResultCallbacks.types";

const props = withDefaults(
	defineProps<{
		messages: ChatMessageType[];
		chatActions?: ChatAction[];
		size?: ComponentSize;
		withoutAvatars?: boolean;
	}>(),
	{
		size: ComponentSize.MD,
		withoutAvatars: false,
		chatActions: () => [
			ChatAction.SendMessage,
		],
	},
);

const emit = defineEmits<{
	(
		e: `action:${typeof ChatAction.SendMessage}`,
		text: string,
		options: ResultCallbacks,
	): void;
	(
		e: `action:${typeof ChatAction.AttachFiles}`,
		files: File[],
		options: ResultCallbacks,
	): void;
	(e: typeof MessageAction.ClickOnImage, message: ChatMessageType): void;
}>();

const slots = defineSlots<
	{
		main: () => any;
		footer: () => any;
	} & SharedActionSlots
>();

const uiChatsEmitter = createUiChatsEmitter();

provide("size", props.size);
provide("uiChatsEmitter", uiChatsEmitter);

uiChatsEmitter?.on("clickChatMessageImage", (message) => {
	emit(MessageAction.ClickOnImage, message);
});
const { isDropzoneVisible, handleDragLeave } = useDropzoneHandlers();

const draft = ref<string>("");

const slottedChatActions = computed(() => {
	return Object.keys(slots)
		.filter((key) => key.startsWith("action:"))
		.map((key) => key.replace("action:", ""));
});
const isDropzoneDisabled = computed(
	() => !props.chatActions.includes(ChatAction.AttachFiles),
);

function sendMessage() {
	emit(`action:${ChatAction.SendMessage}`, draft.value, {
		onSuccess: () => (draft.value = ""),
	});
}

function sendFile(files: File[]) {
	emit(`action:${ChatAction.AttachFiles}`, files, {});
}
</script>

<style scoped>
.the-chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
</style>
