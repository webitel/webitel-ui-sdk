<template>
  <article class="audit-form-question-score">
    <div
      v-if="mode === 'write'"
      class="audit-form-question-score-write"
    >
      <wt-input
        :value="question.min"
        :v="v$.question.min"
        :number-min="0"
        :number-max="9"
        :label="$t('reusable.from')"
        :label-props="{hint: $t('scorecards.scoreInputTooltip', { min: '0', max: '9'}), hintPosition: 'right' }"
        type="number"
        required
        @input="updateQuestion({ path: 'min', value: $event })"
      />
      <wt-input
        :value="question.max"
        :v="v$.question.max"
        :number-min="1"
        :number-max="10"
        :label="$t('reusable.to')"
        :label-props="{hint: $t('scorecards.scoreInputTooltip', { min: '1', max: '10'}), hintPosition: 'right' }"
        type="number"
        required
        @input="updateQuestion({ path: 'max', value: $event })"
      />
    </div>
    <div
      v-else-if="mode === 'read'"
      class="audit-form-question-score-read"
    >
      <wt-radio
        v-for="(value) of scoreRange"
        :key="value"
        :label="`${value}`"
        :value="value"
        :selected="isResult ? result.score : null"
        @input="emit('change:result', { score: value })"
      />
    </div>
  </article>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { maxValue, minValue, required, integer } from '@vuelidate/validators';
import { computed, onMounted, toRefs } from 'vue';
import isEmpty from '../../../../../scripts/isEmpty';
import updateObject from '../../../../../scripts/updateObject';
import WtRadio from '../../../../../components/wt-radio/wt-radio.vue';
import WtInput from '../../../../../components/wt-input/wt-input.vue';

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  result: {
    type: Object,
  },
  mode: {
    // options: ['read', 'write']
    type: String,
    default: 'read',
  },
});

const emit = defineEmits([
  'change:question',
  'change:result',
]);

// is needed for useVuelidate, because props.question/props.result isn't reactive
const { question } = toRefs(props);

const v$ = useVuelidate(
  computed(() => (
    {
      question: {
        min: {
          minValue: minValue(0),
          maxValue: maxValue(9),
          required,
          integer,
        },
        max: {
          minValue: minValue(1),
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

const isResult = computed(() => !isEmpty(props.result));

function updateQuestion({ path, value }) {
  const number = value > 10 ? 10 : Number(Math.abs(value)); // for trying to enter -1, 000 or string value
  emit('change:question', updateObject({ obj: props.question, path, value: number }));
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
