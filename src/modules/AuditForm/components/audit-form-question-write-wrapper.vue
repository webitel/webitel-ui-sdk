<template>
  <article class="audit-form-question-write">
    <header class="audit-form-question-write-header">
      <wt-switcher
        :disabled="first"
        :label="t('reusable.required')"
        :model-value="question.required"
        @update:model-value="updateQuestion({ path: 'required', value: $event })"
      />
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
        <wt-input
          :label="t('webitelUI.auditForm.question')"
          :v="v.question.question"
          :value="question.question"
          prevent-trim
          required
          @input="updateQuestion({ path: 'question', value: $event })"
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
import cloneDeep from 'lodash/cloneDeep';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { EngineAuditQuestionType, EngineQuestion } from 'webitel-sdk';

import WtIconBtn from '../../../components/wt-icon-btn/wt-icon-btn.vue';
import WtInput from '../../../components/wt-input/wt-input.vue';
import WtSelect from '../../../components/wt-select/wt-select.vue';
import WtSwitcher from '../../../components/wt-switcher/wt-switcher.vue';
import WtTooltip from '../../../components/wt-tooltip/wt-tooltip.vue';
import {updateObject} from '../../../scripts';
import { generateQuestionOptionsSchema } from '../schemas/AuditFormQuestionOptionsSchema.js';
import { generateQuestionScoreSchema } from '../schemas/AuditFormQuestionScoreSchema.js';
import AuditFormQuestionOptions from './form-questions/options/audit-form-question-options.vue';
import AuditFormQuestionScore from './form-questions/score/audit-form-question-score.vue';

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

const emit = defineEmits(['copy', 'delete']);

const { t } = useI18n();

const QuestionType = [
  {
    value: EngineAuditQuestionType.Option,
    locale: 'webitelUI.auditForm.type.options',
  },
  {
    value: EngineAuditQuestionType.Score,
    locale: 'webitelUI.auditForm.type.score',
  },
];

const prettifiedQuestionType = computed(() =>
  QuestionType.find(({ value }) => value === questionModel.value.type),
);

const QuestionTypeComponent = computed(() => {
  if (questionModel.value.type === EngineAuditQuestionType.Option)
    return AuditFormQuestionOptions;
  if (questionModel.value.type === EngineAuditQuestionType.Score)
    return AuditFormQuestionScore;
  return null;
});

function updateQuestion({ path, value }) {
  questionModel.value = updateObject({ obj: questionModel.value, path, value });
}

function handleQuestionTypeChange(type) {
  const question = cloneDeep(questionModel.value);
  if (type === EngineAuditQuestionType.Option) {
    Object.assign(question, generateQuestionOptionsSchema());
  } else if (type === EngineAuditQuestionType.Score) {
    Object.assign(question, generateQuestionScoreSchema());
  }
  questionModel.value = question;
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
