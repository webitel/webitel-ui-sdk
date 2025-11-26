<template>
  <section class="chat-input-actions-bar">
    <slot
      v-for="{ action, component: actionComponent } in ShownActionComponentsList"
      :key="action"
      :name="action"
      v-bind="{ size }"
    >
      <component
       :is="actionComponent"
       :size="size"
       @sendMessage="emit(ChatAction.SendMessage)"
       @attachFiles="emit(ChatAction.AttachFiles, $event)"
      />
    </slot>
  </section>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { ComponentSize } from '@webitel/ui-sdk/enums';

import { ChatAction } from '../types/ChatAction.types'; 
import SendMessageAction from './actions/send-message-action.vue';
import AttachFilesAction from './actions/attach-files-action.vue';
import EmojiPickerAction from './actions/emoji-picker-action.vue';
import { SharedActionSlots, ChatActionSlotsPrefix } from '../types/ChatAction.types';

const size = inject<ComponentSize>('size');

const props = defineProps<{
  actions: ChatAction[];
}>();

const emit = defineEmits([
  ChatAction.SendMessage,
  ChatAction.AttachFiles,
]);

const slots = defineSlots<SharedActionSlots>();

const ShownActionComponentsList = computed(() => {
  /**
   * note! actions order is declared here and cannot be changed from outside
   */
  return [
    {
      action: ChatAction.AttachFiles,
      component: AttachFilesAction,
    },
    {
      action: ChatAction.EmojiPicker,
      component: EmojiPickerAction,
    },
    {
      action: ChatAction.QuickReplies,
      component: null, // has no component inside lib, should be provided by pkg-client application
    },
    {
      action: ChatAction.SendMessage,
      component: SendMessageAction,
    },
  ].filter(({ action }) => props.actions.includes(action));
});

</script>

<style scoped>
.chat-input-actions-bar {
  display: flex;
  gap: var(--spacing-2xs);

  > * {
    flex: 1;
  }
}
</style>