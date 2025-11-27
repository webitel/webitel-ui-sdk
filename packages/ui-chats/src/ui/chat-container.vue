<template>
  <section class="chat-container">
    <!-- <slot name="header">
            header goes here
        </slot> -->
        <slot name="main">
            <chat-messages-container :messages="messages" />
        </slot>
        <slot name="footer">
          <chat-footer-wrapper>
            <template #default>
              <chat-text-field
                  v-model:text="draft"
              />
              <chat-input-actions-bar
                :actions="chatActions"
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
import { provide, ref, computed } from 'vue';
import { ComponentSize } from '@webitel/ui-sdk/enums';
import ChatMessagesContainer from './messaging/components/chat-messages-container.vue';

import { ResultCallbacks } from './utils/ResultCallbacks.types';
import ChatFooterWrapper from './chat-footer/components/chat-footer-wrapper.vue';
import ChatTextField from './chat-footer/modules/user-input/components/chat-text-field.vue';
import ChatInputActionsBar from './chat-footer/modules/user-input/components/chat-input-actions-bar.vue';
import { createUiChatsEmitter } from './utils/emitter';
import { ChatMessageType } from './messaging/types/ChatMessage.types';
import { ChatAction, SharedActionSlots } from './chat-footer/modules/user-input/types/ChatAction.types';

const props = withDefaults(defineProps<{
  messages: ChatMessageType[];
  chatActions?: ChatAction[];
  size?: ComponentSize;
}>(), {
  size: ComponentSize.MD,
  chatActions: () => [ChatAction.SendMessage],
});

const emit = defineEmits<{
  (e: `action:${typeof ChatAction.SendMessage}`, text: string, options: ResultCallbacks): void;
  (e: `action:${typeof ChatAction.AttachFiles}`, files: File[], options: ResultCallbacks): void;
}>();

const slots = defineSlots<{
  main: () => any;
  footer: () => any;
} & SharedActionSlots>();

const uiChatsEmitter = createUiChatsEmitter();

provide('size', props.size);
provide('uiChatsEmitter', uiChatsEmitter);

const draft = ref<string>('');

const slottedChatActions = computed(() => {
  return Object.keys(slots)
  .filter((key) => key.startsWith('action:'))
  .map((key) => key.replace('action:', ''));
});

function sendMessage() {
  emit(`action:${ChatAction.SendMessage}`, 
    draft.value, 
    {
    onSuccess: () => draft.value = '',
  });
}

function sendFile(files: File[]) {
  emit(`action:${ChatAction.AttachFiles}`, files, {
  });
}

</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
}
</style>