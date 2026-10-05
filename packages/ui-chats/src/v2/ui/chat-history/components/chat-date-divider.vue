<template>
  <div class="chat-date-divider">
    <wt-chip :color="ChipColor.SECONDARY">
      {{ label }}
    </wt-chip>
  </div>
</template>

<script setup lang="ts">
import { WtChip } from '@webitel/ui-sdk/components';
import { ChipColor } from '@webitel/ui-sdk/enums';
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
}

/* DES-730 draws the chip a step lighter than the default secondary; the
   surface palette does not flip with the theme, so dark keeps the default */
:global(:root:not(.theme--dark)) .chat-date-divider {
  --p-chip-secondary-background: var(--p-surface-50);
}
</style>
