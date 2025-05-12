<template>
  <component
    :is="component"
    v-model:question="questionModel"
    v-model:answer="answerModel"
    v-clickaway="saveQuestion"
    :class="[
      `audit-form-question--mode-${mode}`,
      {
        'audit-form-question--answered': isAnswer,
      },
      {
        'audit-form-question--sort-ignore': first && mode === 'fill',
      },
    ]"
    :disable-dragging="mode === 'fill'"
    :first="first"
    :readonly="readonly"
    :v="v$"
    class="audit-form-question"
    @activate="activateQuestion"
    @copy="emit('copy')"
    @delete="emit('delete')"
  />
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, inject,onMounted, ref } from 'vue';
import { EngineQuestion, EngineQuestionAnswer } from "webitel-sdk";

import vClickaway from '../../../directives/clickaway/clickaway.js';
import isEmpty from '../../../scripts/isEmpty.js';
import QuestionRead from './audit-form-question-read-wrapper.vue';
import QuestionWrite from './audit-form-question-write-wrapper.vue';

const mode = inject('mode');
const readonly = inject('readonly');

const questionModel = defineModel<EngineQuestion>('question');
const answerModel = defineModel<EngineQuestionAnswer | null>('answer');

withDefaults(defineProps<{
  first?: boolean;
}>(), {
  first: false,
});

const emit = defineEmits<{
  'copy': [];
  'delete': [];
}>();

const QuestionState = {
  SAVED: 'saved',
  EDIT: 'edit',
};

const state = ref(QuestionState.SAVED);

const v$ = useVuelidate(
  computed(() =>
    mode === 'create'
      ? {
          question: {
            question: { required },
          },
        }
      : {
          answer: {
            required: (value) => {
              // if not required, no need to validate
              if (!questionModel.value.required) return true;

              if (value && value?.score != null) {
                return true;
              }
            },
          },
        },
  ),
  { question: questionModel, answer: answerModel },
  { $autoDirty: true },
);

const component = computed(() => {
  if (readonly) return QuestionRead;
  if (mode === 'create') {
    if (state.value === QuestionState.SAVED) return QuestionRead;
    return QuestionWrite;
  }
  return QuestionRead;
});

const isAnswer = computed(() => !isEmpty(answerModel.value));

function saveQuestion() {
  state.value = QuestionState.SAVED;
}

function activateQuestion() {
  if (mode !== 'create') return;
  state.value = QuestionState.EDIT;
}

defineExpose({ activateQuestion });

// initialize validations
onMounted(() => {
  v$.value.$touch();
});
</script>

<style lang="scss" scoped>
.audit-form-question {
  box-shadow: var(--elevation-1);
  border-radius: var(--border-radius);
  background: var(--dp-22-surface-color);
  padding: var(--spacing-sm);

  // override audit-form-question-read-wrapper specificity for hover
  &.audit-form-question--answered {
    background: var(--secondary-color);

    &:hover,
    &:focus-within {
      border-color: transparent;
    }
  }

  &--mode-create.audit-form-question-read {
    cursor: pointer;
  }
}
</style>
