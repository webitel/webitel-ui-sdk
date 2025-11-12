<template>
  <wt-chat-emoji
    :size="size"
    @insert-emoji="emit('insertEmoji', $event)"
  />
</template>

<script setup lang="ts">
import { WtChatEmoji } from '@webitel/ui-sdk/components';
import { ComponentSize } from '@webitel/ui-sdk/enums';

const props = defineProps<{
  size: ComponentSize;
}>();

const emit = defineEmits<{
  'insertEmoji': [unicode: string];
}>();

</script>