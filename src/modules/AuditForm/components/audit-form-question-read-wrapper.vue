<template>
  <article
    :class="{
      'audit-form-question-read--filled': isAnswer && answerModel.score != null,
      'audit-form-question-read--readonly': readonly,
    }"
    class="audit-form-question-read"
    @click="emit('activate')"
    @keyup.enter="emit('activate')"
  >
    <header class="audit-form-question-read-header">
      <p
        :class="{
          'audit-form-question-read-text--required': question.required,
        }"
        class="audit-form-question-read-text"
      >
        {{ question.question }}
      </p>
      <wt-icon
        v-if="!disableDragging && !first"
        class="audit-form-question-read__drag-icon"
        icon="move"
      />
    </header>
    <section class="audit-form-question-read-content">
      <component
        :is="QuestionTypeComponent"
        v-model:answer="answerModel"
        :question="question"
        mode="read"
      />
      <div
        v-show="isAnswer"
        class="audit-form-question--clear"
        @click="resetAnswer"
      >
        {{ t('webitelUI.auditForm.clearSelection') }}
      </div>
      <wt-input
        v-if="answerModel?.createdAt"
        :model-value="answerModel.comment"
        :label="t('reusable.comment')"
        @update:model-value="updateAnswer({ comment: $event })"
      />
    </section>

    <template v-if="answerModel?.updatedAt">
      <wt-divider />
      <audit-form-answer-editing-info
        :answer="answerModel"
      />
    </template>
  </article>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';
import {useI18n} from "vue-i18n";
import {EngineAuditQuestionType, EngineQuestion, EngineQuestionAnswer} from 'webitel-sdk';

import { WtDivider,WtIcon, WtInput } from '../../../components';
import isEmpty from '../../../scripts/isEmpty.js';
import AuditFormAnswerEditingInfo from "./form-answers/answer-editing-info/audit-form-answer-editing-info.vue";
import AuditFormQuestionOptions from './form-questions/options/audit-form-question-options.vue';
import AuditFormQuestionScore from './form-questions/score/audit-form-question-score.vue';

const readonly = inject('readonly');

const answerModel = defineModel<EngineQuestionAnswer | null>('answer');

const props = defineProps<{
  question: EngineQuestion;
  disableDragging?: boolean;
  first?: boolean;
}>();

const emit = defineEmits<{
  'activate': [];
}>();

const { t } = useI18n();

const QuestionTypeComponent = computed(() => {
  if (props.question.type === EngineAuditQuestionType.Option)
    return AuditFormQuestionOptions;
  if (props.question.type === EngineAuditQuestionType.Score)
    return AuditFormQuestionScore;
  return null;
});

const isAnswer = computed(() => !isEmpty(answerModel.value));

const updateAnswer = (value: EngineQuestionAnswer) => {
  if (readonly.value) return; // if ... then in preview mode

  // coz only some properties of answer may be patched
  const newAnswer = { ...answerModel.value, value };
  answerModel.value = newAnswer;
};

const resetAnswer = () => {
  answerModel.value = {
    ...answerModel.value,
    score: null, // reset only score field
  };
};
</script>

<style lang="scss" scoped>
.audit-form-question-read {
  display: flex;
  position: relative;
  flex-direction: column;
  gap: var(--spacing-sm);
  transition: var(--transition);
  border: 1px solid transparent;

  &:not(.audit-form-question-read--readonly) {
    &:hover,
    &:focus-within {
      border: 1px solid var(--primary-color);
    }
  }

  &--filled {
    background: var(--secondary-color);
  }
}

.audit-form-question-read__drag-icon {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.audit-form-question-read-header {
  margin-bottom: var(--spacing-xs);
}

.audit-form-question-read-text {
  &--required {
    &:after {
      content: '*';
      color: var(--error-color);
    }
  }
}

.audit-form-question-read-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.audit-form-question--clear {
  cursor: pointer;
  margin-top: var(--spacing-sm);
  color: var(--info-color);
}
</style>
