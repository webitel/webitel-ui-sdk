<template>
  <wt-chat-emoji
    :size="size"
    @insert-emoji="uiChatsEmitter!.emit('insertAtCursor', { text: $event })"
  />
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { WtChatEmoji } from '@webitel/ui-sdk/components';
import { ComponentSize } from '@webitel/ui-sdk/enums';
import type { Emitter } from 'mitt';

import type{ UiChatsEmitterEvents } from '../../../../../utils/emitter';

const size = inject<ComponentSize>('size');
const uiChatsEmitter = inject<Emitter<UiChatsEmitterEvents>>('uiChatsEmitter');

</script>