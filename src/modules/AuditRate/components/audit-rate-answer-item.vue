<template>
  <li class="audit-rate-answer-item">
    <h4
      class="audit-rate-answer-item__question typo-subtitle-1"
      :class="{ 'audit-rate-answer-item__question--required': question.required }"
    >
      <span class="audit-rate-answer-item__question-text">
        <wt-icon
          v-if="question.criticalViolation"
          class="audit-rate-answer-item__critical-icon"
          :color="answer.score ? 'error' : null"
          icon="violation--filled"
          size="sm"
        />
        {{ question.question }}
      </span>
    </h4>

    <div
      v-if="isAnswerVisible"
      class="audit-rate-answer-item__answer"
    >
      <p class="audit-rate-answer-item__answer-name typo-body-1">
        {{ displayName }}
      </p>

      <div class="audit-rate-answer-item__score">
        <wt-icon
          color="primary"
          icon="star--filled"
          size="md"
        />
        <wt-chip v-if="!isYesQuestion">
          {{ answer.score }}
        </wt-chip>
        <wt-icon
          v-else
          color="success"
          icon="tick"
          size="md"
        />
      </div>
    </div>

    <audit-form-answer-editing-info
      v-if="answer.updatedAt"
      :answer="answer"
      collapsible
    />
  </li>
</template>

<script setup lang="ts">
import type {
	EngineQuestion,
	EngineQuestionAnswer,
} from '@webitel/api-services/gen/models';
import { EngineAuditQuestionType } from '@webitel/api-services/gen/models';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import AuditFormAnswerEditingInfo from '../../AuditForm/components/form-answers/answer-editing-info/audit-form-answer-editing-info.vue';

const props = defineProps<{
	question: EngineQuestion;
	answer: EngineQuestionAnswer;
}>();

const { t } = useI18n();

const isYesQuestion = computed(
	() => props.question.type === EngineAuditQuestionType.QuestionYes,
);

const isAnsweredYesQuestion = computed(
	() => isYesQuestion.value && (props.answer.score ?? 0) > 0,
);

const isAnswerVisible = computed(
	() =>
		(!isYesQuestion.value && (props.answer.score ?? -1) >= 0) ||
		isAnsweredYesQuestion.value,
);

const answerName = computed(() => {
	const answeredOption = props.question.options?.find(
		({ score }) => score === props.answer.score,
	);
	return answeredOption?.name || '';
});

const displayName = computed(() =>
	isYesQuestion.value ? t('vocabulary.yes') : answerName.value,
);
</script>

<style scoped>
.audit-rate-answer-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid var(--secondary-color);
}

.audit-rate-answer-item__question {
  overflow-wrap: anywhere;
  padding: var(--spacing-2xs) 0 var(--spacing-3xs);
}

.audit-rate-answer-item__question-text {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2xs);
}

.audit-rate-answer-item__critical-icon {
  flex-shrink: 0;
}

.audit-rate-answer-item__question--required::after {
  content: '*';
  color: var(--error-color);
}

.audit-rate-answer-item__answer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-2xs) 0;
}

.audit-rate-answer-item__answer-name {
  padding-right: var(--spacing-2xs);
}

.audit-rate-answer-item__score {
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-2xs);
}
</style>
