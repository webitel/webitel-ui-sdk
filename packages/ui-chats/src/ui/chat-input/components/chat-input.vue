<template>
  <section class="chat-input">
    <chat-text-field
        v-model:text="draft"
        :size="size"
    />
    <chat-input-actions-bar
      :actions="actions"
      :size="size"
    />
  </section>
</template>

<script setup lang="ts">
import { ChatAction } from '../enums/ChatAction.enum';
import { ComponentSize } from '@webitel/ui-sdk/enums';

import ChatTextField from './chat-text-field.vue';
import ChatInputActionsBar from './chat-input-actions-bar.vue';

const draft = defineModel<string>('draft', { required: true });

const props = defineProps<{
  actions: ChatAction[];
  size: ComponentSize;
}>();


</script>

<style scoped>
.chat-input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xs);
}
</style>