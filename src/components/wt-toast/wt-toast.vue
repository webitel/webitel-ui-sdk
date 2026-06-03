<template>
  <PToast v-bind="$attrs">
    <template #message="{ message }">
      <wt-icon
        :icon="severityToIconNameMap[message.severity] ?? 'done'"
        :color="severityToIconColorMap[message.severity] ?? IconColor.DEFAULT"
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
import WtIcon from '../wt-icon/wt-icon.vue';
import { ComponentSize, IconColor } from '../../enums';

defineOptions({
	name: 'WtToast',
	inheritAttrs: false,
});

const severityToIconNameMap: Record<string, string> = {
	success: 'done',
	info: 'rounded-info',
	warn: 'attention',
	error: 'attention',
};

const severityToIconColorMap: Record<string, string> = {
	success: IconColor.SUCCESS,
	info: IconColor.INFO,
	warn: IconColor.WARNING,
	error: IconColor.ERROR,
};
</script>
