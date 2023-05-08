<template>
  <article class="audit-form-question-score">
    <div
      v-if="mode === 'write'"
      class="audit-form-question-score-write"
    >
      <wt-input
        :value="question.min"
        type="number"
        @input="updateQuestion({ path: 'min', value: $event })"
      ></wt-input>
      <wt-input
        :value="question.max"
        type="number"
        @input="updateQuestion({ path: 'max', value: $event })"
      ></wt-input>
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
        :selected="result ? result.score : result"
        @input="emit('change:result', { score: value })"
      ></wt-radio>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue';
import updateObject from '../../../../scripts/updateObject';
import WtRadio from '../../../../components/molecules/wt-radio/wt-radio.vue';
import WtInput from '../../../../components/molecules/wt-input/wt-input.vue';

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

function updateQuestion({ path, value }) {
  emit('change:question', updateObject({ obj: props.question, path, value }));
}
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
