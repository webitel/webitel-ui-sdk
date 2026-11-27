<template>
  <ul class="audit-rate-answers">
    <audit-rate-answer-item
      v-for="(question, index) of rate.questions"
      :key="index"
      :question="question"
      :answer="rate.answers?.[index] ?? {}"
    />
  </ul>
</template>

<script lang="ts" setup>
import type { EngineAuditRate } from '@webitel/api-services/gen/models';

import AuditRateAnswerItem from './audit-rate-answer-item.vue';

defineProps<{
	rate: EngineAuditRate;
}>();
</script>

<style scoped>
.audit-rate-answers {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xs);
}
</style>
