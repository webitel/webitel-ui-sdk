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
                @action:sendMessage="sendMessage"
                @action:attachFiles="sendFile"
              ></chat-input-actions-bar>
            </template>
          </chat-footer-wrapper>
        </slot>
    </section>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import { ComponentSize } from '@webitel/ui-sdk/enums';
import ChatMessagesContainer from './messaging/components/chat-messages-container.vue';

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
  'sendMessage': [draft: string, options: { onSuccess: () => void }];
  'sendFile': [files: File[]];
}>();

const slots = defineSlots<{
  main: () => any;
  footer: () => any;
} & SharedActionSlots>();

const uiChatsEmitter = createUiChatsEmitter();

provide('size', props.size);
provide('uiChatsEmitter', uiChatsEmitter);

const draft = ref<string>('');

// const slottedActions = computed(() => {
//   return Object.keys(slots).filter((key) => key in ChatAction);
// });

function sendMessage() {
  emit('sendMessage', draft.value, {
    onSuccess: () => draft.value = '',
  });
}

function sendFile(files: File[]) {
  emit('sendFile', files);
}

</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
}
</style>