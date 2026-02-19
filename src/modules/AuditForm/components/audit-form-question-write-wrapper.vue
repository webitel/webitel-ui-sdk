<template>
  <article class="audit-form-question-write">
    <header class="audit-form-question-write-header">
      <div class="audit-form-question-write-header__switchers">
        <wt-switcher
          :disabled="first"
          :label="t('reusable.required')"
          :model-value="question.required"
          @update:model-value="updateQuestion({ path: 'required', value: $event })"
        />
        <wt-switcher
          v-if="question.type === EngineAuditQuestionType.QuestionYes"
          :label="t('webitelUI.auditForm.criticalViolation')"
          :model-value="question.criticalViolation || false"
          @update:model-value="updateQuestion({ path: 'criticalViolation', value: $event })"
        />
      </div>
      <div class="audit-form-question-write-header__actions">
        <wt-icon-btn
          v-tooltip="t('reusable.copy')"
          icon="copy"
          @click="emit('copy')"
        />

        <wt-icon-btn
          v-tooltip="t('reusable.delete')"
          :disabled="first"
          icon="bucket"
          @click="emit('delete')"
        />
      </div>
    </header>
    <section class="audit-form-question-write-content">
      <div class="audit-form-question-write-content-question">
        <wt-input-text
          :label="t('webitelUI.auditForm.question')"
          :v="v.question.question"
          :model-value="question.question"
          prevent-trim
          required
          @update:model-value="updateQuestion({ path: 'question', value: $event })"
        />
        <wt-select
          :clearable="false"
          :label="t('webitelUI.auditForm.answerType')"
          :options="QuestionType"
          :value="prettifiedQuestionType"
          track-by="value"
          @input="handleQuestionTypeChange($event.value)"
        />
      </div>
      <component
        :is="QuestionTypeComponent"
        v-model:question="questionModel"
        mode="write"
      />
    </section>
  </article>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { EngineQuestion } from '@webitel/api-services/gen/models';
import { EngineAuditQuestionType } from '@webitel/api-services/gen/models';

import WtIconBtn from '../../../components/wt-icon-btn/wt-icon-btn.vue';
import WtSelect from '../../../components/wt-select/wt-select.vue';
import WtSwitcher from '../../../components/wt-switcher/wt-switcher.vue';
import WtTooltip from '../../../components/wt-tooltip/wt-tooltip.vue';
import { updateObject } from '../../../scripts';
import { generateQuestionOptionsSchema } from '../schemas/AuditFormQuestionOptionsSchema';
import { generateQuestionScoreSchema } from '../schemas/AuditFormQuestionScoreSchema';
import { generateQuestionYesSchema } from '../schemas/AuditFormQuestionYesSchema';
import AuditFormQuestionOptions from './form-questions/options/audit-form-question-options.vue';
import AuditFormQuestionScore from './form-questions/score/audit-form-question-score.vue';
import AuditFormQuestionYes from './form-questions/yes/audit-form-question-yes.vue';

const questionModel = defineModel<EngineQuestion>('question');

defineProps({
	first: {
		type: Boolean,
		default: false,
	},
	v: {
		type: Object,
	},
});

const emit = defineEmits([
	'copy',
	'delete',
]);

const { t } = useI18n();

const QuestionType = [
	{
		value: EngineAuditQuestionType.QuestionOption,
		locale: 'webitelUI.auditForm.type.options',
	},
	{
		value: EngineAuditQuestionType.QuestionScore,
		locale: 'webitelUI.auditForm.type.score',
	},
	{
		value: EngineAuditQuestionType.QuestionYes,
		locale: 'webitelUI.auditForm.type.yes',
	},
];

const prettifiedQuestionType = computed(() =>
	QuestionType.find(({ value }) => value === questionModel.value.type),
);

const QuestionTypeComponent = computed(() => {
	if (questionModel.value.type === EngineAuditQuestionType.QuestionOption)
		return AuditFormQuestionOptions;
	if (questionModel.value.type === EngineAuditQuestionType.QuestionScore)
		return AuditFormQuestionScore;
	if (questionModel.value.type === EngineAuditQuestionType.QuestionYes)
		return AuditFormQuestionYes;
	return null;
});

function updateQuestion({ path, value }) {
	questionModel.value = updateObject({
		obj: questionModel.value,
		path,
		value,
	});
}

function handleQuestionTypeChange(type) {
	const commonFields = {
		question: questionModel.value.question,
		required: questionModel.value.required,
		description: questionModel.value.description,
		criticalViolation: questionModel.value.criticalViolation,
	};

	if (type === EngineAuditQuestionType.QuestionOption) {
		questionModel.value = {
			...commonFields,
			...generateQuestionOptionsSchema(),
		};
	} else if (type === EngineAuditQuestionType.QuestionScore) {
		questionModel.value = {
			...commonFields,
			...generateQuestionScoreSchema(),
		};
	} else if (type === EngineAuditQuestionType.QuestionYes) {
		questionModel.value = {
			...commonFields,
			...generateQuestionYesSchema(),
		};
	}
}
</script>

<style lang="scss" scoped>
.audit-form-question.audit-form-question-write {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  box-shadow: var(--elevation-3);
}

.audit-form-question-write-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__switchers {
    display: flex;
    gap: var(--spacing-md);
  }

  &__actions {
    display: flex;
    gap: var(--spacing-sm);
  }
}

.audit-form-question-write-content-question {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: var(--spacing-sm);
  margin-right: calc(
    24px + var(--spacing-sm)
  ); // delete icon action for type "options"
  margin-bottom: var(--spacing-sm);
}
</style>
