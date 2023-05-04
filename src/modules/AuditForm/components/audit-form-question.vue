<template>
  <component
    class="audit-form-question"
    :class="[
     `audit-form-question--mode-${mode}`
    ]"
    v-clickaway="saveQuestion"
    :is="component"
    :question="question"
    :result="result"
    :v="v$"
    :disable-dragging="mode === 'fill'"
    :disable-delete="disableDelete"
    :readonly="readonly"
    @copy="emits('copy')"
    @delete="emits('delete')"
    @activate="activateQuestion"
    @change:question="emits('update:question', $event)"
    @change:result="emits('update:result', $event)"
  ></component>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, ref, toRefs } from 'vue';
import vClickaway from '../../../directives/clickaway/clickaway';
import QuestionWrite from './audit-form-question-write-wrapper.vue';
import QuestionRead from './audit-form-question-read-wrapper.vue';

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
  disableDelete: {
    type: Boolean,
    default: true,
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

const { question } = toRefs(props);

// validate only "create" mode
const v$ = useVuelidate(computed(() => (
  (props.mode === 'create')
    ? {
      question: {
        question: { required },
      },
      $autoDirty: true,
    } : {})), { question });

const component = computed(() => {
  if (props.readonly) return QuestionRead;
  if (props.mode === 'create') {
    if (state.value === QuestionState.SAVED) return QuestionRead;
    return QuestionWrite;
  }
  return QuestionRead;
});

function saveQuestion() {
  state.value = QuestionState.SAVED;
}

function activateQuestion() {
  if (props.mode !== 'create') return;
  state.value = QuestionState.EDIT;
}
</script>

<style lang="scss" scoped>
.audit-form-question {
  padding: var(--spacing-sm);
  background: var(--main-color);
  border-radius: var(--border-radius);
  box-shadow: var(--elevation-1);

  &--mode-create.audit-form-question-read {
    cursor: pointer;
  }
}
</style>
