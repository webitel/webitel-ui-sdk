<template>
  <PToast v-bind="$attrs">
    <template #message="{ message }">
      <wt-icon
        :icon="severityToIconNameMap[message.severity] ?? ''"
        :color="severityToIconColorMap[message.severity] ?? MessageColor.CONTRAST"
        class="p-toast-message-icon"
      />
      <div class="p-toast-message-text">
        <span class="p-toast-summary">{{ message.summary }}</span>
        <div v-if="message.detail" class="p-toast-detail">{{ message.detail }}</div>
      </div>
    </template>
    <template #closeicon>
      <wt-icon icon="close" :size="ComponentSize.SM" />
    </template>
  </PToast>
</template>

<script setup lang="ts">
import { ComponentSize, IconColor, MessageColor } from '../../enums';
import WtIcon from '../wt-icon/wt-icon.vue';

defineOptions({
	name: 'WtToast',
	inheritAttrs: false,
});

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
</script>
