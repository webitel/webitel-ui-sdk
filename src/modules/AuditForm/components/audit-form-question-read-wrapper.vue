<template>
  <article
    class="audit-form-question-read"
    :class="{
      'audit-form-question-read--filled': result && result.score != null,
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
        v-if="!disableDragging"
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
        @change:result="emit('change:result', $event)"
      ></component>
    </section>
  </article>
</template>

<script setup>
import { computed } from 'vue';
import { EngineAuditQuestionType } from 'webitel-sdk';
import AuditFormQuestionOptions from './questions/audit-form-question-options.vue';
import AuditFormQuestionScore from './questions/audit-form-question-score.vue';
import WtIcon from '../../../components/atoms/wt-icon/wt-icon.vue';

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  result: {
    type: Object,
    required: true,
  },
  disableDragging: {
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
</script>

<style lang="scss" scoped>
.audit-form-question-read {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

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
