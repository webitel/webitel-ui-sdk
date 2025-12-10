<template>
    <wt-textarea
        ref="chatTextFieldInput"
        v-model="textModel"
        :size="size"
        autoresize
    />
</template>

<script setup lang="ts">
import type { WtTextarea } from "@webitel/ui-sdk/components";
import type { ComponentSize } from "@webitel/ui-sdk/enums";
import insertTextAtCursor from "insert-text-at-cursor";
import type { Emitter } from "mitt";
import { computed, inject, type MaybeRef, useTemplateRef } from "vue";

import type { UiChatsEmitterEvents } from "../../../../utils/emitter";

const textModel = defineModel<MaybeRef<string>>("text", {
	required: true,
});

const size = inject<ComponentSize>("size");
const uiChatsEmitter = inject<Emitter<UiChatsEmitterEvents>>("uiChatsEmitter");

uiChatsEmitter?.on("insertAtCursor", ({ text }) => insertAtCursor(text));
uiChatsEmitter?.on("focusOnTextField", focus);

const chatTextFieldInputRef =
	useTemplateRef<typeof WtTextarea>("chatTextFieldInput");

const textareaEl = computed(() =>
	chatTextFieldInputRef.value?.$el.querySelector("textarea"),
);

function focus() {
	textareaEl.value?.focus();
}

function insertAtCursor(text: string) {
	focus();
	insertTextAtCursor(textareaEl.value!, text);
}
</script>
