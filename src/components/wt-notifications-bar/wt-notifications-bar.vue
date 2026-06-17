<template>
  <wt-toast position="top-right" />
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

function showNotification({ severity, type, detail, text, life, timeout }) {
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
