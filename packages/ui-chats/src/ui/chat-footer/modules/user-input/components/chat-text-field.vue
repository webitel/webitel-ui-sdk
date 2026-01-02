<template>
  <wt-textarea
    ref="chatTextFieldInput"
    class="chat-text-field"
    :model-value="textModel"
    :size="size"
    autoresize
    @update:model-value="send"
  />
</template>

<script setup lang="ts">
import { WtTextarea } from "@webitel/ui-sdk/components";
import { ComponentSize } from "@webitel/ui-sdk/enums";
import insertTextAtCursor from "insert-text-at-cursor";
import type { Emitter } from "mitt";
import { computed, inject, type MaybeRef, useTemplateRef } from "vue";

import type { UiChatsEmitterEvents } from "../../../../utils/emitter";

const textModel = defineModel<MaybeRef<string>>("text", {
	required: true,
});

const size = inject<ComponentSize>("size");
const uiChatsEmitter = inject<Emitter<UiChatsEmitterEvents>>("uiChatsEmitter");

uiChatsEmitter!.on("insertAtCursor", ({ text }) => insertAtCursor(text));
uiChatsEmitter!.on("focusOnTextField", focus);

const chatTextFieldInputRef =
	useTemplateRef<typeof WtTextarea>("chatTextFieldInput");

const textareaEl = computed(() =>
	chatTextFieldInputRef.value?.$el.querySelector("textarea"),
);

function send(text: string) {
	textModel.value = text;
}

function focus() {
	textareaEl.value!.focus();
}

function insertAtCursor(text: string) {
	focus();
	insertTextAtCursor(textareaEl.value!, text);
}
</script>

<style scoped>
.chat-text-field :deep(textarea) {
  /* https://webitel.atlassian.net/browse/WTEL-7388
   fixed styles after component migrated on vuetify */
  max-height: 100%;
  min-height: auto;
  overflow: auto !important;
}
</style>
