<template>
  <div class="audit-rate-summary">
    <audit-rate-summary-info :rate="rate" />

    <audit-rate-summary-scores
      :score-required="rate.scoreRequired"
      :score-optional="rate.scoreOptional"
      :select-yes-display="selectYesDisplay"
      :critical-display="criticalDisplay"
    />
  </div>
</template>

<script lang="ts" setup>
import type { EngineAuditRate } from '@webitel/api-services/gen/models';
import { EngineAuditQuestionType } from '@webitel/api-services/gen/models';
import { computed } from 'vue';

import AuditRateSummaryInfo from './audit-rate-summary-info.vue';
import AuditRateSummaryScores from './audit-rate-summary-scores.vue';

const props = defineProps<{
	rate: EngineAuditRate;
}>();

function getScoreDisplay(
	questions: EngineAuditRate['questions'],
	answers: EngineAuditRate['answers'],
	includeQuestion: (
		question: NonNullable<EngineAuditRate['questions']>[number],
		index: number,
	) => boolean,
): string | null {
	const normalizedQuestions = questions ?? [];
	const normalizedAnswers = answers ?? [];

	const { total, hits } = normalizedQuestions.reduce(
		(accumulator, question, index) => {
			if (!includeQuestion(question, index)) return accumulator;

			const isHit = normalizedAnswers[index]?.score === 1;

			return {
				total: accumulator.total + 1,
				hits: accumulator.hits + (isHit ? 1 : 0),
			};
		},
		{
			total: 0,
			hits: 0,
		},
	);

	if (total === 0) return null;

	return `${hits}/${total}`;
}

const selectYesDisplay = computed(() =>
	getScoreDisplay(
		props.rate.questions,
		props.rate.answers,
		(question) => question.type === EngineAuditQuestionType.QuestionYes,
	),
);

const criticalDisplay = computed(() =>
	getScoreDisplay(
		props.rate.questions,
		props.rate.answers,
		(question) => question.criticalViolation === true,
	),
);
</script>

<style scoped>
.audit-rate-summary {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
</style>
