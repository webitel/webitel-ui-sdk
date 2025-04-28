<template>
  <article
    :class="{
      'audit-form-question-read--filled': isResult && result.score != null,
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
        :question="question"
        :result="result"
        mode="read"
        @change:result="!readonly && emit('change:result', $event)"
      />
      <div
        v-show="isResult"
        class="audit-form-question--clear"
        @click="emit('change:result', {})"
      >
        {{ $t('webitelUI.auditForm.clearSelection') }}
      </div>
    </section>
    <wt-input
      v-if="showQuestionComment && !readonly"
      v-model="comment"
      class="audit-form-question-comment"
      :label="$t('webitelUI.auditForm.comment')"
    />
  </article>
</template>

<script setup>
import { computed } from 'vue';
import { EngineAuditQuestionType } from 'webitel-sdk';

import WtIcon from '../../../components/wt-icon/wt-icon.vue';
import isEmpty from '../../../scripts/isEmpty.js';
import AuditFormQuestionOptions from './questions/options/audit-form-question-options.vue';
import AuditFormQuestionScore from './questions/score/audit-form-question-score.vue';
import { WtInput } from '../../../components/index.js';

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  result: {
    type: [Object, null],
    required: true,
  },
  disableDragging: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  first: {
    type: Boolean,
    default: false,
  },
  showQuestionComment: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['change:result', 'activate']);

const comment = computed({
  get: () => props.result?.comment ?? '',
  set: (v) => {
    const next = { ...(props.result || {}), comment: v };
    emit('change:result', next);
  },
});

const QuestionTypeComponent = computed(() => {
  if (props.question.type === EngineAuditQuestionType.Option)
    return AuditFormQuestionOptions;
  if (props.question.type === EngineAuditQuestionType.Score)
    return AuditFormQuestionScore;
  return null;
});

const isResult = computed(() => !isEmpty(props.result));
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

.audit-form-question--clear {
  cursor: pointer;
  margin-top: var(--spacing-sm);
  color: var(--info-color);
}
</style>
