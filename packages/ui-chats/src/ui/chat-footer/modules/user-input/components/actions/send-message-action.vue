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
import type { ComponentSize } from "@webitel/ui-sdk/enums";
import { inject } from "vue";

import type { ChatAction } from "../../types/ChatAction.types";

const _size = inject<ComponentSize>("size");

const _emit = defineEmits<(e: typeof ChatAction.SendMessage) => void>();
</script>
