<template>
  <section class="chat-input-actions-wrapper">
    <slot name="actions" />
    <!-- <slot
     :name="action"
     v-for="{ action, component: actionComponent } in ShownActionComponentsList"
     :key="action"
    >
      <component
       v-if="actionComponent"
       :is="actionComponent"
       :size="size"
      />
    </slot> -->
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ComponentSize } from '@webitel/ui-sdk/enums';

import { ChatAction } from '../enums/ChatAction.enum';
import SendMessageAction from './actions/send-message-action.vue';
import AttachFilesAction from './actions/attach-files-action.vue';
import EmojiPickerAction from './actions/emoji-picker-action.vue';

// const ShownActionComponentsList = computed(() => {
//   return [
//     {
//       action: ChatAction.SendMessage,
//       component: SendMessageAction,
//     },
//     {
//       action: ChatAction.AttachFiles,
//       component: AttachFilesAction,
//     },
//     {
//       action: ChatAction.EmojiPicker,
//       component: EmojiPickerAction,
//     },
//   ].filter(({ action }) => props.actions.includes(action));
// });

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