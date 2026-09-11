<template>
  <p-toast v-bind="attrs">
    <template #message="{ message }">
      <div
        v-if="message"
        class="wt-toast-message-body"
        @click="emit('message-click', message)"
      >
        <wt-icon
          :icon="severityToIconNameMap[message.severity] ?? ''"
          :style="getIconColor(message)"
          class="p-toast-message-icon"
        />
        <div class="p-toast-message-text">
          <span class="p-toast-summary">{{ message.summary }}</span>
          <div v-if="message.detail" class="p-toast-detail">{{ message.detail }}</div>
        </div>
      </div>
    </template>
    <template #closeicon>
      <wt-icon icon="close" :size="ComponentSize.SM" />
    </template>
  </p-toast>
</template>

<script setup lang="ts">
import type { ToastMessageOptions } from 'primevue/toast';
import { useAttrs } from 'vue';
import { ComponentSize, MessageColor } from '../../enums';
import WtIcon from '../wt-icon/wt-icon.vue';

const attrs = useAttrs();

defineOptions({
	name: 'WtToast',
	inheritAttrs: false,
});

const emit = defineEmits<{
	'message-click': [
		message: ToastMessageOptions,
	];
}>();

const severityToIconNameMap: Record<string, string> = {
	success: 'done',
	info: 'rounded-info',
	warn: 'warning',
	error: 'error',
};

const severityToIconColorMap: Record<string, string> = {
	success: MessageColor.SUCCESS,
	info: MessageColor.INFO,
	warn: MessageColor.WARN,
	error: MessageColor.ERROR,
	contrast: MessageColor.CONTRAST,
	secondary: MessageColor.SECONDARY,
};

const getIconColor = (message: { severity?: string }) =>
	`fill: var(--p-toast-${message.severity ? severityToIconColorMap[message.severity] : ''}-icon-color)`;
</script>

<style>
.p-toast-close-button:hover {
  background: transparent;
}
.p-toast-close-button:focus-visible {
  outline: none;
}

.wt-toast-message-body {
  display: flex;
  align-items: center;
  gap: var(--p-toast-content-gap);
}

.wt-toast--clickable .wt-toast-message-body {
  cursor: pointer;
}
</style>
