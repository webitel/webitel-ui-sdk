<template>
  <section class="audit-form">
    <div
      v-if="!reloadSortable"
      ref="sortableWrapper"
      class="audit-form__sortable-wrapper"
    >
      <audit-form-question
        v-for="(question, key) of questions"
        :key="key"
        ref="auditQuestions"
        :first="key === 0"
        :mode="mode"
        :question="question"
        :readonly="readonly"
        :answer="answers && answers[key] ? answers[key] : null"
        @copy="copyQuestion({ question, key })"
        @delete="deleteQuestion({ question, key })"
        @update:question="handleQuestionUpdate({ key, value: $event })"
        @update:answer="handleAnswerUpdate({ key, value: $event })"
      />
    </div>
    <footer class="audit-form-footer">
      <template
        v-if="mode === 'fill'"
      >
        <wt-button
          :disabled="isInvalidForm"
          @click="saveEvaluation"
        >
          {{ t('reusable.save') }}
        </wt-button>
        <wt-button
          color="secondary"
          @click="cancelEvaluation"
        >
          {{ t('reusable.cancel') }}
        </wt-button>
      </template>


      <wt-button
        v-else-if="mode === 'create' && !readonly"
        class="audit-form-footer-create-question-action"
        :disabled="isInvalidForm"
        @click="addQuestion"
      >
        {{ t('webitelUI.auditForm.addQuestion') }}
      </wt-button>
    </footer>
  </section>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import cloneDeep from 'lodash/cloneDeep.js';
import {
  computed,
  nextTick,
  onMounted,
  provide,
  reactive,
  useTemplateRef,
  watch,
} from 'vue';
import { useI18n } from 'vue-i18n';
import {EngineAuditRate,EngineQuestion, EngineQuestionAnswer} from 'webitel-sdk';

import WtButton from '../../../components/wt-button/wt-button.vue';
import { useDestroyableSortable } from '../../../composables/useDestroyableSortable/useDestroyableSortable.js';
import { generateQuestionSchema } from '../schemas/AuditFormQuestionSchema.js';
import AuditFormQuestion from './audit-form-question.vue';

const answersModel = defineModel<EngineQuestionAnswer[]>('answers');

/**
 * todo: rename to questionsModel and use instead of 'update:questions' event
 */
const questions = defineModel<EngineQuestion[]>('questions', {});

const AuditFormMode = {
  Create: 'create',
  Fill: 'fill',
} as const;

type AuditFormMode = typeof AuditFormMode[keyof typeof AuditFormMode];

const props = defineProps<{
  mode: AuditFormMode;
  readonly?: boolean;
  /**
   * @readonly
   * @description
   * Source of info about existing evaluation result, if any
   */
  evaluationResult?: EngineAuditRate;
}>();

const emit = defineEmits([
  /**
   * todo: remove and use questions model
   */
  'update:questions',
  'update:validation',
  'save:evaluation',
  'cancel:evaluation',
]);

const { t } = useI18n();
const v$ = useVuelidate();

const auditQuestions = useTemplateRef('auditQuestions');
const isQuestionAdded = reactive({ value: false, index: null });
const isEditingAnswers = computed(() => {
  return props.evaluationResult?.id;
});

provide('isEditingAnswers', isEditingAnswers);

const isInvalidForm = computed(() => !!v$.value.$errors.length);

async function addQuestion({ index, question } = {}) {
  const questions = [...(props.questions || [])];
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

function handleAnswerUpdate({ key, value }) {
  const answer = [...answersModel.value];
  answer[key] = value;
  answersModel.value = answer;
}

function initAnswers() {
  if (!answersModel.value || !answersModel.value.length) {
    answersModel.value = props.questions.map(() => ({}));
  }
}

function initQuestions() {
  if (!props.questions?.length) {
    addQuestion({ question: generateQuestionSchema({ required: true }) });
  } else if (props.questions.length)
    auditQuestions.value.at(0).activateQuestion();
}

function saveEvaluation() {
  emit('save:evaluation');
}

function cancelEvaluation() {
  emit('cancel:evaluation');
}

// https://my.webitel.com/browse/WTEL-3451, https://my.webitel.com/browse/WTEL-3436
// at new question added, activate this question
async function atQuestionAdded() {
  // wait for new question to render
  await nextTick();
  const index =
    isQuestionAdded.index && isQuestionAdded.index === 'last'
      ? -1
      : isQuestionAdded.index;
  auditQuestions.value.at(index).activateQuestion();

  isQuestionAdded.value = false;
  isQuestionAdded.index = null;
}

const sortableWrapper = useTemplateRef('sortableWrapper');

const { reloadSortable } = useDestroyableSortable(sortableWrapper, {
  handle: '.audit-form-question-read__drag-icon',
  disabled: props.mode !== 'create',
  filter: '.audit-form-question--sort-ignore',
  onEnd: ({ newIndex, oldIndex }) => {
    if (newIndex === oldIndex) return;
    changeQuestionsOrder({ oldIndex, newIndex });
  },
});

watch(v$, () =>
  emit('update:validation', { invalid: isInvalidForm.value, v$: v$.value }),
);

watch(
  () => props.questions,
  () => {
    if (!isQuestionAdded.value) return;
    atQuestionAdded();
  },
);

onMounted(() => {
  if (props.mode === AuditFormMode.Create) {
    initQuestions();
  } else if (props.mode === AuditFormMode.Fill) {
    initAnswers();
  }
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

.audit-form-footer {
  display: flex;
  justify-content: center;
  gap: var(--spacing-sm);
}

.audit-form-footer-create-question-action {
  align-self: flex-end;
}
</style>
