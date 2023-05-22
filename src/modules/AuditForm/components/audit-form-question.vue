<template>
  <component
    :is="component"
    v-clickaway="saveQuestion"
    :class="[
     `audit-form-question--mode-${mode}`,
     {
       'audit-form-question--answered': isResult,
     },
    ]"
    :disable-dragging="mode === 'fill'"
    :first="first"
    :question="question"
    :readonly="readonly"
    :result="result"
    :v="v$"
    class="audit-form-question"
    @activate="activateQuestion"
    @copy="emits('copy')"
    @delete="emits('delete')"
    @change:question="emits('update:question', $event)"
    @change:result="emits('update:result', $event)"
  ></component>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, onMounted, ref, toRefs } from 'vue';
import isEmpty from '../../../scripts/isEmpty';
import vClickaway from '../../../directives/clickaway/clickaway';
import QuestionRead from './audit-form-question-read-wrapper.vue';
import QuestionWrite from './audit-form-question-write-wrapper.vue';

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  result: {
    type: Object,
  },
  mode: {
    type: String,
  },
  first: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits([
  'copy',
  'delete',
  'update:question',
  'update:result',
]);

const QuestionState = {
  SAVED: 'saved',
  EDIT: 'edit',
};

const state = ref(QuestionState.SAVED);

// is needed for useVuelidate, because props.question/props.result isn't reactive
const { question, result } = toRefs(props);

const v$ = useVuelidate(computed(() => (
  (props.mode === 'create')
    ? {
      question: {
        question: { required },
      },
    } : {
      result: {
        required: (value) => (question.value.required ? !!value : true),
      },
    })), { question, result }, { $autoDirty: true });

const component = computed(() => {
  if (props.readonly) return QuestionRead;
  if (props.mode === 'create') {
    if (state.value === QuestionState.SAVED) return QuestionRead;
    return QuestionWrite;
  }
  return QuestionRead;
});

const isResult = computed(() => !isEmpty(props.result));

function saveQuestion() {
  state.value = QuestionState.SAVED;
}

function activateQuestion() {
  if (props.mode !== 'create') return;
  state.value = QuestionState.EDIT;
}

// initialize validations
onMounted(() => {
  v$.value.$touch();
  if (props.first) activateQuestion();
});
</script>

<style lang="scss" scoped>
.audit-form-question {
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  background: var(--main-color);
  box-shadow: var(--elevation-1);

  // override audit-form-question-read-wrapper specificity for hover
  &.audit-form-question--answered {
    background: var(--secondary-color-50);
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
