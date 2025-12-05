<template>
    <section class="chat-messages-container">
        <!-- <chat-message-component
            v-for="message in messages"
            :key="message.id"
            :message="message"
        /> -->
    </section>
</template>

<script setup lang="ts">
import type { ChatMessageType } from "../types/ChatMessage.types";

// import ChatMessageComponent from '../modules/message/components/chat-message.vue';

const _props = defineProps<{
	messages: ChatMessageType[];
}>();
</script>