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
      >{{ question.text }}</p>
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
import AuditFormQuestionOptions from './questions/audit-form-question-options.vue';
import AuditFormQuestionScore from './questions/audit-form-question-score.vue';

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  result: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits([
  'change:result',
  'activate',
]);

const QuestionTypeComponent = computed(() => {
  if (props.question.type === 'options') return AuditFormQuestionOptions;
  if (props.question.type === 'score') return AuditFormQuestionScore;
  return null;
});
</script>

<style lang="scss" scoped>
.audit-form-question-read {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  &--filled {
    background: var(--secondary-color-50);
  }
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
