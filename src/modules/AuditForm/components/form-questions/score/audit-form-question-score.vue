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
        @update:selected="updateAnswer"
      />
    </div>
  </article>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { integer, maxValue, minValue, required } from '@vuelidate/validators';
import { computed, onMounted } from 'vue';
import {EngineQuestion, EngineQuestionAnswer} from 'webitel-sdk';

import WtInput from '../../../../../components/wt-input/wt-input.vue';
import WtRadio from '../../../../../components/wt-radio/wt-radio.vue';
import updateObject from '../../../../../scripts/updateObject.js';

const answerModel = defineModel<EngineQuestionAnswer | null>('answer');
const questionModel = defineModel<EngineQuestion>('question');

defineProps({
  mode: {
    // options: ['read', 'write']
    type: String,
    default: 'read',
  },
});

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
        minValue: minValue(questionModel.value.min ? questionModel.value.min : 1),
        maxValue: maxValue(10),
        required,
        integer,
      },
    },
  })),
  { question: questionModel },
  { $autoDirty: true },
);

const scoreRange = computed(() => {
  if (questionModel.value.min > questionModel.value.max) return [];
  const result = [];
  let i = +questionModel.value.min;
  do {
    result.push(i);
    i += 1;
  } while (i <= questionModel.value.max);
  return result;
});

function updateAnswer(score) {
  answerModel.value = answerModel.value ? {
    ...answerModel.value,
    score,
  } : { score };
}

function updateQuestion({ path, value }) {
  questionModel.value = updateObject({ obj: questionModel.value, path, value });
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
