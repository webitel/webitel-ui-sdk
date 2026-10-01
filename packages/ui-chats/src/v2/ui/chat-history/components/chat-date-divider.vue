<template>
  <div class="chat-date-divider">
    <span class="chat-date-divider__label typo-caption">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useChatsV2I18n } from '../../../locale/useChatsV2I18n';
import { formatDividerDate } from '../../../scripts/formatDate';

const props = defineProps<{
	date: number;
}>();

const { t, locale } = useChatsV2I18n();

const label = computed(() =>
	formatDividerDate(props.date, {
		locale: locale.value,
		todayLabel: t('history.today'),
	}),
);
</script>

<style scoped>
.chat-date-divider {
  display: flex;
  justify-content: center;
  padding: var(--spacing-xs) 0;
}

.chat-date-divider__label {
  padding: var(--spacing-3xs) var(--spacing-sm);
  border-radius: var(--border-radius--pill);
  background: var(--wt-ws-chat-window-colors-message-item-chat-message-agent-background);
  color: var(--text-disabled-color);
}
</style>
