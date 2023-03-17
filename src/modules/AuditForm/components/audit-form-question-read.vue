<template>
  <article
    class="audit-form-question-read"
    :class="{
      'audit-form-question-read--filled': result && result.score != null,
    }"
    @keyup.enter="emits('activate')"
    @click="emits('activate')"
  >
    <header class="audit-form-question-read-header">
      <p
        class="audit-form-question-read-text"
        :class="{
          'audit-form-question-read-text--required': question.required,
        }"
      >{{ question.text }}</p>
    </header>
    <section class="audit-form-question-read-content">
      <div v-if="question.type === 'options'">
        <wt-radio
          v-for="({ text, score }) of question.options"
          :key="score"
          :label="text"
          :value="score"
          :selected="result ? result.score : result"
          @input="emits('change:result', { score })"
        ></wt-radio>
      </div>
      <div v-if="question.type === 'score'">
        <wt-radio
          v-for="(value) of scoreRange"
          :key="value"
          :label="value"
          :value="value"
          :selected="result ? result.score : result"
          @input="emits('change:result', { score: value })"
        ></wt-radio>
      </div>
    </section>
  </article>
</template>

<script setup>
import { computed } from 'vue';
import WtRadio from '../../../components/molecules/wt-radio/wt-radio.vue';

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  result: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits([
  'change:result',
  'activate',
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
</script>

<style lang="scss" scoped>

</style>
