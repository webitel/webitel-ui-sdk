<template>
  <wt-rounded-action
    icon="attach"
    color="secondary"
    :size="size"
    rounded
    wide
    @click="attachFilesInputRef!.click()"
  />
  <input
    ref="attachFilesInput"
    style="display: none;"
    type="file"
    multiple
    @change="handleAttachmentInputChange"
  />
</template>

<script setup lang="ts">
import { inject, useTemplateRef } from 'vue';
import { WtRoundedAction } from '@webitel/ui-sdk/components';
import { ComponentSize } from '@webitel/ui-sdk/enums';
import { AttachFilesChatActionEmits } from '../../types/ChatAction.types';

const size = inject<ComponentSize>('size');

const emit = defineEmits<AttachFilesChatActionEmits>();

const attachFilesInputRef = useTemplateRef('attachFilesInput');

const handleAttachmentInputChange = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (!files) return;
  emit('attachFiles', Array.from(files) as File[]);
};
</script>

<style scoped></style>