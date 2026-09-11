<template>
  <wt-toast
    position="top-right"
    @message-click="onMessageClick"
    @close="onToastClose"
    @life-end="onToastClose"
  />
</template>

<script setup>
import { useToast } from 'primevue/usetoast';
import { inject, onUnmounted } from 'vue';
import defaultEventBus from '../../scripts/eventBus.js';
import { TypeToSeverityMap } from '../wt-toast/types';
import WtToast from '../wt-toast/wt-toast.vue';

defineOptions({
	name: 'WtNotificationsBar',
});

const DEFAULT_NOTIFICATION_LIFE_MS = 4000;

const injectedEventBus = inject('$eventBus', null);
const activeEventBus = injectedEventBus ?? defaultEventBus;

const toast = useToast();

const callbacks = new Map();
let callbackUid = 0;

function showNotification({ type, text, timeout, onClick }) {
	const options = {
		severity: TypeToSeverityMap[type],
		detail: text,
		life: timeout != null ? timeout * 1000 : DEFAULT_NOTIFICATION_LIFE_MS,
	};

	if (onClick) {
		const id = `wt-cb-${callbackUid++}`;
		options.id = id;
		options.styleClass = 'wt-toast--clickable';
		callbacks.set(id, onClick);
	}

	toast.add(options);
}

function onMessageClick(message) {
	const cb = callbacks.get(message.id);
	if (!cb) return;
	cb();
	callbacks.delete(message.id);
	toast.remove(message);
}

function onToastClose({ message }) {
	callbacks.delete(message.id);
}

activeEventBus.$on('notification', showNotification);

onUnmounted(() => {
	activeEventBus.$off('notification', showNotification);
});
</script>