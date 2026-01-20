<template>
  <wt-chat-emoji
    class="emoji-picker-action"
    :size="size"
    @insert-emoji="uiChatsEmitter!.emit('insertAtCursor', { text: $event })"
  />
</template>

<script setup lang="ts">
import { WtChatEmoji } from "@webitel/ui-sdk/components";
import { ComponentSize } from "@webitel/ui-sdk/enums";
import type { Emitter } from "mitt";
import { inject } from "vue";

import type { UiChatsEmitterEvents } from "../../../../../utils/emitter";

const size = inject<ComponentSize>("size");
const uiChatsEmitter = inject<Emitter<UiChatsEmitterEvents>>("uiChatsEmitter");
</script>

<style lang="scss" scoped>
$input-height: 48px; // https://webitel.atlassian.net/browse/WTEL-6149 (comments)

.emoji-picker-action {
  ::v-deep emoji-picker {
    position: absolute;
    z-index: calc(var(--popup-wrapper-z-index) - 1);
    bottom: calc(100% + $input-height);
    left: 100%;
    transform: translateX(-50%);
  }
}
</style>
