<template>
  <section class="audit-form">
    <div
      class="audit-form__sortable-wrapper"
      ref="sortableWrapper"
      v-if="!reloadSortable"
    >
      <audit-form-question
        v-for="(question, key) of questions"
        :key="key"
        :question="question"
        :result="(result && result[key]) ? result[key] : null"
        :mode="mode"
        :disable-delete="questions.length <= 1"
        @copy="copyQuestion({ question, key })"
        @delete="deleteQuestion({ question, key})"
        @update:question="handleQuestionUpdate({ key, value: $event })"
        @update:result="handleResultUpdate({ key, value: $event })"
      ></audit-form-question>
    </div>
    <wt-button
      class="audit-form__add-button"
      v-if="mode === 'create'"
      :disabled="isInvalidForm"
      @click="addQuestion"
    >{{ $t('webitelUI.auditForm.addQuestion') }}
    </wt-button>
  </section>
</template>

<script setup>
import cloneDeep from 'lodash/cloneDeep';
import {
  watch, watchEffect, ref, computed,
} from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { useDestroyableSortable } from '../composables/useDestroyableSortable';
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

const emit = defineEmits([
  'update:questions',
  'update:result',
  'update:validation',
]);

const v$ = useVuelidate();

const isInvalidForm = computed(() => !!v$.value.$errors.length);

function addQuestion({ index, question } = {}) {
  const questions = [...props.questions];
  const newQuestion = question || generateQuestionSchema();
  if (index != null) questions.splice(index, 0, newQuestion);
  else questions.push(newQuestion);
  emit('update:questions', questions);
}

function handleQuestionUpdate({ key, value }) {
  const questions = [...props.questions];
  questions[key] = value;
  emit('update:questions', questions);
}

function copyQuestion({ question, key }) {
  const questions = [...props.questions];
  questions.splice(key + 1, 0, cloneDeep(question));
  emit('update:questions', questions);
}

function deleteQuestion({ key }) {
  const questions = [...props.questions];
  questions.splice(key, 1);
  emit('update:questions', questions);
}

function changeQuestionsOrder({ oldIndex, newIndex }) {
  const questions = [...props.questions];
  const [el] = questions.splice(oldIndex, 1);
  questions.splice(newIndex, 0, el);
  emit('update:questions', questions);
}

function handleResultUpdate({ key, value }) {
  const result = [...props.result];
  result[key] = value;
  emit('update:result', result);
}

function initResult() {
  const result = props.questions.map(() => null);
  emit('update:result', result);
}

const sortableWrapper = ref(null);

const { reloadSortable } = useDestroyableSortable(sortableWrapper, {
  handle: '.audit-form-question-read__drag-icon',
  disabled: props.mode !== 'create',
  onEnd: ({ newIndex, oldIndex }) => {
    if (newIndex === oldIndex) return;
    changeQuestionsOrder({ oldIndex, newIndex });
  },
});

watch(v$, () => emit('update:validation', v$));
watchEffect(initResult);
</script>

<style lang="scss" scoped>
.audit-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  &__sortable-wrapper {
    display: contents;
  }
}

.audit-form__add-button {
  align-self: flex-end;
}
</style>
