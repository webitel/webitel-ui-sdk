<template>
    <section class="chat-container">
        <!-- <slot name="header">
            header goes here
        </slot> -->
        <slot name="main">
            main goes here
        </slot>
        <slot name="footer">
            <chat-input
                v-model:draft="draft"
            >
            <template #actions>
                <send-message-action
                    @click="sendMessage"
                />
                <attach-files-action
                    @attach-files="emit('sendFile', $event as File[])"
                />
                <emoji-picker-action />
            </template>
            </chat-input>
        </slot>
    </section>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import { ComponentSize } from '@webitel/ui-sdk/enums';

import ChatInput from './chat-input/components/chat-input.vue';
import SendMessageAction from './chat-input/components/actions/send-message-action.vue';
import AttachFilesAction from './chat-input/components/actions/attach-files-action.vue';
import EmojiPickerAction from './chat-input/components/actions/emoji-picker-action.vue';
import { createUiChatsEmitter } from './utils/emitter';

const props = withDefaults(defineProps<{
    size?: ComponentSize;
}>(), {
    size: ComponentSize.MD,
});

const emit = defineEmits<{
    'sendMessage': [draft: string, options: { onSuccess: () => void }];
    'sendFile': [files: File[]];
}>();

const uiChatsEmitter = createUiChatsEmitter();

provide('size', props.size);
provide('uiChatsEmitter', uiChatsEmitter);

const draft = ref<string>('');

function sendMessage() {
    emit('sendMessage', draft.value, {
        onSuccess: () => draft.value = '',
    });
}

</script>

<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
}
</style>