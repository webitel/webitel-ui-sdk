<template>
  <wt-button
    :size="size"
    icon="chat-send"
    color="secondary"
    variant="outlined"
    rounded
    wide
    @click="emit(ChatAction.SendMessage)"
  />
</template>

<script setup lang="ts">
import { WtButton } from '@webitel/ui-sdk/components';
import { ComponentSize } from '@webitel/ui-sdk/enums';
import { inject } from 'vue';

import { ChatAction } from '../../enums/ChatAction.enum';

const size = inject<ComponentSize>('size');

const emit = defineEmits<(e: typeof ChatAction.SendMessage) => void>();
</script>
