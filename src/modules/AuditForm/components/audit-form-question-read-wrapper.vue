<template>
  <article
    class="audit-form-question-read"
    :class="{
      'audit-form-question-read--filled': isResult && result.score != null,
      'audit-form-question-read--readonly': readonly,
    }"
    @keyup.enter="emit('activate')"
    @click="emit('activate')"
  >
    <header class="audit-form-question-read-header">
      <p
        class="audit-form-question-read-text"
        :class="{
          'audit-form-question-read-text--required': question.required,
        }"
      >{{ question.question }}</p>
      <wt-icon
        class="audit-form-question-read__drag-icon"
        v-if="!disableDragging && !first"
        icon="move"
        color="secondary"
      ></wt-icon>
    </header>
    <section class="audit-form-question-read-content">
      <component
        :is="QuestionTypeComponent"
        :question="question"
        :result="result"
        mode="read"
        @change:result="!readonly && emit('change:result', $event)"
      ></component>
    </section>
  </article>
</template>

<script setup>
import { computed } from 'vue';
import { EngineAuditQuestionType } from 'webitel-sdk';
import isEmpty from '../../../scripts/isEmpty';
import AuditFormQuestionOptions from './questions/options/audit-form-question-options.vue';
import AuditFormQuestionScore from './questions/score/audit-form-question-score.vue';
import WtIcon from '../../../components/wt-icon/wt-icon.vue';

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
});

const emit = defineEmits([
  'change:result',
  'activate',
]);

const QuestionTypeComponent = computed(() => {
  if (props.question.type === EngineAuditQuestionType.Option) return AuditFormQuestionOptions;
  if (props.question.type === EngineAuditQuestionType.Score) return AuditFormQuestionScore;
  return null;
});

const isResult = computed(() => !isEmpty(props.result));
</script>

<style lang="scss" scoped>
.audit-form-question-read {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  border: 1px solid transparent;
  transition: var(--transition);

  &:not(.audit-form-question-read--readonly) {
    &:hover,
    &:focus-within {
      border: 1px solid var(--accent-color);
    }
  }

  &--filled {
    background: var(--secondary-color-50);
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
      color: var(--false-color);
    }
  }
}
</style>
