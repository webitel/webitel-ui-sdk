<template>
  <ul class="audit-rate-summary-info">
    <li
      v-for="{ title, value } in rows"
      :key="title"
      class="audit-rate-summary-info__row"
    >
      <h5 class="typo-subtitle-1">
        {{ title }}
      </h5>
      <span class="typo-body-1">
        {{ value }}
      </span>
    </li>

    <li
      v-if="rate.comment"
      class="audit-rate-summary-info__row audit-rate-summary-info__row--comment"
    >
      <span class="typo-subtitle-1">
        {{ t('reusable.comment') }}
      </span>
      <p class="audit-rate-summary-info__comment typo-body-1">
        {{ rate.comment }}
      </p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { EngineAuditRate } from '@webitel/api-services/gen/models';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { FormatDateMode } from '../../../enums/FormatDateMode/FormatDateMode';
import { formatDate } from '../../../utils/formatDate';

const props = defineProps<{
	rate: EngineAuditRate;
}>();

const { t } = useI18n();

const rows = computed(() => [
	{
		title: t('objects.ratedBy'),
		value: props.rate.createdBy?.name,
	},
	{
		title: t('objects.agent.agent', 1),
		value: props.rate.ratedUser?.name,
	},
	{
		title: t('webitelUI.auditRate.date'),
		value: formatDate(Number(props.rate.createdAt), FormatDateMode.DATETIME),
	},
	{
		title: t('webitelUI.auditRate.scorecard'),
		value: props.rate.form?.name,
	},
]);
</script>

<style scoped>
.audit-rate-summary-info__row {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-sm);
  border-bottom: 1px solid var(--secondary-color);
  padding: var(--spacing-xs) 0;
}

.audit-rate-summary-info__row--comment {
  flex-direction: column;
}

.audit-rate-summary-info__comment {
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
