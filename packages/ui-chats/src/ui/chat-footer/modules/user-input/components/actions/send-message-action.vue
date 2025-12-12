<template>
  <wt-rounded-action
    icon="chat-send"
    color="accent"
    :size="size"
    rounded
    wide
    @click="emit(ChatAction.SendMessage)"
  />
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { ComponentSize } from '@webitel/ui-sdk/enums';
import { ChatAction } from '../../types/ChatAction.types';

const size = inject<ComponentSize>('size');

const emit = defineEmits<{
  (e: typeof ChatAction.SendMessage): void;
}>();

</script>
