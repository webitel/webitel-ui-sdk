<template>
  <article class="audit-form-question-score">
    <div
      v-if="mode === 'write'"
      class="audit-form-question-score-write"
    >
      <wt-input
        :label="$t('reusable.from')"
        :number-max="9"
        :number-min="0"
        :v="v$.question.min"
        :value="question.min"
        required
        type="number"
        @input="updateQuestion({ path: 'min', value: $event })"
      />
      <wt-input
        :label="$t('reusable.to')"
        :number-max="10"
        :number-min="question.min"
        :v="v$.question.max"
        :value="question.max"
        required
        type="number"
        @input="updateQuestion({ path: 'max', value: $event })"
      />
    </div>
    <div
      v-else-if="mode === 'read'"
      class="audit-form-question-score-read"
    >
      <wt-radio
        v-for="score of scoreRange"
        :key="score"
        :label="`${score}`"
        :selected="answerModel?.score"
        :value="score"
        @input="updateAnswer"
      />
    </div>
  </article>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { integer, maxValue, minValue, required } from '@vuelidate/validators';
import { computed, onMounted, toRefs } from 'vue';
import { EngineQuestionAnswer } from 'webitel-sdk';

import WtInput from '../../../../../components/wt-input/wt-input.vue';
import WtRadio from '../../../../../components/wt-radio/wt-radio.vue';
import updateObject from '../../../../../scripts/updateObject.js';

const answerModel = defineModel<EngineQuestionAnswer | null>('answer');

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  mode: {
    // options: ['read', 'write']
    type: String,
    default: 'read',
  },
});

const emit = defineEmits(['change:question']);

// is needed for useVuelidate, because props.question/props.result isn't reactive
const { question } = toRefs(props);

const v$ = useVuelidate(
  computed(() => ({
    question: {
      min: {
        minValue: minValue(0),
        maxValue: maxValue(9),
        required,
        integer,
      },
      max: {
        minValue: minValue(props.question.min ? props.question.min : 1),
        maxValue: maxValue(10),
        required,
        integer,
      },
    },
  })),
  { question },
  { $autoDirty: true },
);

const scoreRange = computed(() => {
  if (props.question.min > props.question.max) return [];
  const result = [];
  let i = +props.question.min;
  do {
    result.push(i);
    i += 1;
  } while (i <= props.question.max);
  return result;
});

function updateAnswer(score) {
  answerModel.value = answerModel.value ? {
    ...answerModel.value,
    score,
  } : { score };
}

function updateQuestion({ path, value }) {
  emit('change:question', updateObject({ obj: props.question, path, value }));
}

// init validation
onMounted(() => v$.value.$touch());
</script>

<style lang="scss" scoped>
.audit-form-question-score-write {
  display: grid;
  grid-template-columns: 100px 100px;
  gap: var(--spacing-sm);
  margin-right: calc(var(--spacing-sm) + 24px); // icon offset
}

.audit-form-question-score-read {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}
</style>
