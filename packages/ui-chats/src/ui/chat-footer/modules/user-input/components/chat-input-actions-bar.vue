<template>
  <section class="chat-input-actions-bar">
    <template
      :name="action"
      v-for="{ action, component: actionComponent, isSlotted } in ShownActionComponentsList"
      :key="action"
    >
      <slot
      v-if="isSlotted"
       :name="action" 
       v-bind="{ size }"
      />
      
      <component
        v-else
        v-if="actionComponent"
       :is="actionComponent"
       :size="size"
      />
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { ComponentSize } from '@webitel/ui-sdk/enums';

import { ChatAction } from '../types/ChatAction.types'; 
import SendMessageAction from './actions/send-message-action.vue';
import AttachFilesAction from './actions/attach-files-action.vue';
import EmojiPickerAction from './actions/emoji-picker-action.vue';
import { ChatActionsBarEmits } from '../types/ChatAction.types';
import { SharedActionSlots } from '../types/ChatAction.types';

const size = inject<ComponentSize>('size');

const props = defineProps<{
  actions: ChatAction[];
}>();


const emit = defineEmits<ChatActionsBarEmits>();

const slots = defineSlots<SharedActionSlots>();

const ShownActionComponentsList = computed(() => {
  /**
   * note! actions order is declared here and cannot be changed from outside
   */
  return [
    {
      action: ChatAction.AttachFiles,
      component: AttachFilesAction,
      isSlotted: !!slots[ChatAction.AttachFiles],
    },
    {
      action: ChatAction.EmojiPicker,
      component: EmojiPickerAction,
      isSlotted: !!slots[ChatAction.EmojiPicker],
    },
    {
      action: ChatAction.QuickReplies,
      component: null, // has no component inside lib, should be provided by pkg-client application
      isSlotted: !!slots[ChatAction.QuickReplies],
    },
    {
      action: ChatAction.SendMessage,
      component: SendMessageAction,
      isSlotted: !!slots[ChatAction.SendMessage],
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