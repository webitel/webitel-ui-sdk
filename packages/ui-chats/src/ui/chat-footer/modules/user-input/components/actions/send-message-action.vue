<template>
  <wt-rounded-action
    icon="chat-send"
    color="accent"
    :size="size"
    rounded
    wide
    @click="emit('click')"
  />
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { ComponentSize } from '@webitel/ui-sdk/enums';
import { SendMessageChatActionEmits } from '../../types/ChatAction.types';

const size = inject<ComponentSize>('size');

const emit = defineEmits<SendMessageChatActionEmits>();

</script>