<template>
  <WtToast position="top-right" />
</template>

<script setup>
import { inject, onUnmounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { TypeToSeverityMap } from '../wt-toast/types/index.ts';
import WtToast from '../wt-toast/wt-toast.vue';
import defaultEventBus from '../../scripts/eventBus.js';
import { _wtUiLog as loggr } from '../../scripts/logger.js';

defineOptions({
	name: 'WtNotificationsBar',
});

const DEFAULT_NOTIFICATION_LIFE_MS = 4000;

const injectedEventBus = inject('$eventBus', null);

if (!injectedEventBus) {
	loggr.warn({
		entity: 'component',
		module: 'wt-notification-bar',
	})('no globally provided $eventBus found, using default webitel-ui eventBus');
}

const activeEventBus = injectedEventBus ?? defaultEventBus;

const toast = useToast();

function showNotification({ severity, type, detail, text, life, timeout }) {
	console.log('showNotification');
	toast.add({
		severity: severity ?? TypeToSeverityMap[type] ?? type,
		detail: detail ?? text,
		life:
			life ?? (timeout != null ? timeout * 1000 : DEFAULT_NOTIFICATION_LIFE_MS),
	});
}

activeEventBus.$on('notification', showNotification);

onUnmounted(() => {
	activeEventBus.$off('notification', showNotification);
});
</script>
