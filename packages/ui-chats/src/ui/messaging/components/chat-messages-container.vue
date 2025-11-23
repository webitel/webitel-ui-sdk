<template>
    <section 
    class="chat-messages-container"
    v-element-size="handleMessagesContainerResize"
    @click="focusOnTextField"
    >
        <wt-intersection-observer
            :canLoadMore="hasMoreMessages"
            :loading="isLoading"
            @next="loadMore"
        />
        <chat-message-component
            v-for="message in messages"
            :key="message.id"
            :message="message"
        />
    </section>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import type { Emitter } from 'mitt';
import { WtIntersectionObserver } from '@webitel/ui-sdk/components';
import { vElementSize } from '@vueuse/components'; // for chat resize observer, when chat-messages-container size changes

import { ChatMessageType } from '../types/ChatMessage.types';
import ChatMessageComponent from '../modules/message/components/chat-message.vue';
import { UiChatsEmitterEvents } from '../../utils/emitter';
import type { ResultCallbacks } from '../../utils/ResultCallbacks.types';


const uiChatsEmitter = inject<Emitter<UiChatsEmitterEvents>>('uiChatsEmitter');

const props = defineProps<{
    messages: ChatMessageType[];
    hasMoreMessages: boolean;
}>();

 const emit = defineEmits<{
    'loadMore': [ResultCallbacks];
 }>();

 const isLoading = ref(false);

 function loadMore() {
    isLoading.value = true;
    emit('loadMore', {
        onSuccess: () => {
            isLoading.value = false;
        },
        onError: () => {
            isLoading.value = false;
        },
    });
 }

function focusOnTextField() {
    uiChatsEmitter!.emit('focusOnTextField');
}

function handleMessagesContainerResize() {
    console.log('handleMessagesContainerResize');
}
</script>