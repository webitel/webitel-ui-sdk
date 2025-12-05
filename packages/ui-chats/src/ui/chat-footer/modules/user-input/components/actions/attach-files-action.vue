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
import type { ComponentSize } from "@webitel/ui-sdk/enums";
import { inject, useTemplateRef } from "vue";
import { ChatAction } from "../../types/ChatAction.types";

const _size = inject<ComponentSize>("size");

const emit =
	defineEmits<(e: typeof ChatAction.AttachFiles, files: File[]) => void>();

const _attachFilesInputRef = useTemplateRef("attachFilesInput");

const _handleAttachmentInputChange = (event: Event) => {
	const files = (event.target as HTMLInputElement).files;
	if (!files) return;
	emit(ChatAction.AttachFiles, Array.from(files) as File[]);
};
</script>

<style scoped></style>