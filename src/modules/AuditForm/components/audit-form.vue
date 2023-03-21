<template>
  <section class="audit-form">
    <audit-form-question
      v-for="(question, key) of questions"
      :key="key"
      :question="question"
      :result="(result && result[key]) ? result[key] : null"
      :mode="mode"
      @copy="copyQuestion({ question, key })"
      @delete="deleteQuestion({ question, key})"
      @update:question="handleQuestionUpdate({ key, value: $event })"
      @update:result="handleResultUpdate({ key, value: $event })"
    ></audit-form-question>
    <wt-button
      class="audit-form__add-button"
      v-if="props.mode === 'create'"
      @click="addQuestion"
    >{{ $t('webitelUI.auditForm.addQuestion') }}
    </wt-button>
    {{ v$ }}
  </section>
</template>

<script setup>
import cloneDeep from 'lodash/cloneDeep';
import { watchEffect } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import AuditFormQuestion from './audit-form-question.vue';
import WtButton from '../../../components/atoms/wt-button/wt-button.vue';
import { generateQuestionSchema } from '../schemas/AuditFormQuestionSchema';

const props = defineProps({
  mode: {
    type: String,
    required: true,
    /*
    * Available options: ['create', 'fill']
    *  */
  },
  questions: {
    type: Array,
    required: true,
  },
  result: {
    type: Array,
  },
});

const emits = defineEmits([
  'update:questions',
  'update:result',
]);

const v$ = useVuelidate();

function addQuestion({ index, question } = {}) {
  const questions = [...props.questions];
  const newQuestion = question || generateQuestionSchema();
  if (index != null) questions.splice(index, 0, newQuestion);
  else questions.push(newQuestion);
  emits('update:questions', questions);
}

function handleQuestionUpdate({ key, value }) {
  const questions = [...props.questions];
  questions[key] = value;
  emits('update:questions', questions);
}

function copyQuestion({ question, key }) {
  const questions = [...props.questions];
  questions.splice(key + 1, 0, cloneDeep(question));
  emits('update:questions', questions);
}

function deleteQuestion({ key }) {
  const questions = [...props.questions];
  questions.splice(key, 1);
  emits('update:questions', questions);
}

function handleResultUpdate({ key, value }) {
  const result = [...props.result];
  result[key] = value;
  emits('update:result', result);
}

function initResult() {
  const result = props.questions.map(() => null);
  emits('update:result', result);
}

watchEffect(initResult);
</script>

<style lang="scss" scoped>
.audit-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.audit-form__add-button {
  align-self: flex-end;
}
</style>
