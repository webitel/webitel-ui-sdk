<template>
  <section class="audit-form">
    <div
      class="audit-form__sortable-wrapper"
      ref="sortableWrapper"
      v-if="!reloadSortable"
    >
      <audit-form-question
        v-for="(question, key) of questions"
        ref="auditQuestions"
        :key="key"
        :question="question"
        :result="(result && result[key]) ? result[key] : null"
        :mode="mode"
        :first="key === 0"
        :readonly="readonly"
        @copy="copyQuestion({ question, key })"
        @delete="deleteQuestion({ question, key})"
        @update:question="handleQuestionUpdate({ key, value: $event })"
        @update:result="handleResultUpdate({ key, value: $event })"
      ></audit-form-question>
    </div>
    <wt-button
      class="audit-form__add-button"
      v-if="mode === 'create' && !readonly"
      :disabled="isInvalidForm"
      @click="addQuestion"
    >{{ $t('webitelUI.auditForm.addQuestion') }}
    </wt-button>
  </section>
</template>

<script setup>
import cloneDeep from 'lodash/cloneDeep';
import {
  watch, watchEffect, ref, computed, onMounted,
  reactive, nextTick,
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
  readonly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  'update:questions',
  'update:result',
  'update:validation',
]);

const v$ = useVuelidate();

const isInvalidForm = computed(() => !!v$.value.$errors.length);
const auditQuestions = ref(null);
const isQuestionAdded = reactive({ value: false, index: null });

async function addQuestion({ index, question } = {}) {
  const questions = [...props.questions];
  const newQuestion = question || generateQuestionSchema();
  if (index != null) questions.splice(index, 0, newQuestion);
  else questions.push(newQuestion);
  isQuestionAdded.value = true;
  isQuestionAdded.index = index || 'last';
  await emit('update:questions', questions);
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
  if (newIndex === 0) return;
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
  const result = props.questions.map(() => ({}));
  emit('update:result', result);
}

function initQuestions() {
  if (props.mode === 'create' && !props.questions.length) {
    addQuestion({ question: generateQuestionSchema({ required: true }) });
  } else if (props.questions.length) auditQuestions.value.at(0).activateQuestion();
}

// https://my.webitel.com/browse/WTEL-3451, https://my.webitel.com/browse/WTEL-3436
// at new question added, activate this question
async function atQuestionAdded() {
  // wait for new question to render
  await nextTick();
  const index = isQuestionAdded.index && isQuestionAdded.index === 'last'
    ? -1
    : isQuestionAdded.index;
  auditQuestions.value.at(index).activateQuestion();

  isQuestionAdded.value = false;
  isQuestionAdded.index = null;
}

const sortableWrapper = ref(null);

const { reloadSortable } = useDestroyableSortable(sortableWrapper, {
  handle: '.audit-form-question-read__drag-icon',
  disabled: props.mode !== 'create',
  filter: '.audit-form-question--sort-ignore',
  onEnd: ({ newIndex, oldIndex }) => {
    if (newIndex === oldIndex) return;
    changeQuestionsOrder({ oldIndex, newIndex });
  },
});

watch(v$, () => emit('update:validation', { invalid: isInvalidForm.value, v$: v$.value }));
watchEffect(initResult);
watch(() => props.questions, () => {
  if (!isQuestionAdded.value) return;
  atQuestionAdded();
});

onMounted(() => {
  initQuestions();
});
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
