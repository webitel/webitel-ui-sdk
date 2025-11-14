<template>
    <wt-textarea
        ref="chatTextFieldInput"
        :value="textModel"
        :size="size"
        autoresize
        @input="textModel = $event"
    />
</template>

<script setup lang="ts">
import { computed, inject, useTemplateRef } from 'vue';
import { WtTextarea } from '@webitel/ui-sdk/components';
import { ComponentSize } from '@webitel/ui-sdk/enums';
import insertTextAtCursor from 'insert-text-at-cursor';
import type { Emitter } from 'mitt';

import type { UiChatsEmitterEvents } from '../../utils/emitter';

const textModel = defineModel<string>('text', { required: true });

const size = inject<ComponentSize>('size');
const uiChatsEmitter = inject<Emitter<UiChatsEmitterEvents>>('uiChatsEmitter');

uiChatsEmitter!.on('insertAtCursor', ({ text }) => insertAtCursor(text));
uiChatsEmitter!.on('focusOnTextField', focus);

const chatTextFieldInputRef = useTemplateRef<HTMLTextAreaElement>('chatTextFieldInput');

const textareaEl = computed(() => chatTextFieldInputRef.value?.$el.querySelector('textarea'));

function focus() {
  textareaEl.value!.focus();
};

function insertAtCursor(text: string) {
  focus();
  insertTextAtCursor(textareaEl.value!, text);
}
</script>