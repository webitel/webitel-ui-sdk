<template>
  <section>
    <audit-form-question
      v-for="(question, key) of questions"
      :key="key"
      :question="question"
      :result="(result && result[key]) ? result[key] : null"
      :mode="mode"
      @update:question="emits('update:question')"
      @update:result="handleResultUpdate({ key, value: $event })"
    ></audit-form-question>
    <wt-button
      v-if="props.mode === 'create'"
      @click="addQuestion"
    >Add new
    </wt-button>
  </section>
</template>

<script setup>
import { reactive } from 'vue';
import AuditFormQuestion from './audit-form-question.vue';
import WtButton from '../../../components/atoms/wt-button/wt-button.vue';

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
});

const emits = defineEmits([
  'update:questions',
  'update:result',
]);

const questions = reactive([
  ...props.questions,
]);

function addQuestion() {
  const defaultQuestion = {
    options: {
      required: true,
      text: 'Hello',
      options: [
        {
          text: 'Hello',
          score: 10,
        },
      ],
    },
  };
  questions.push(defaultQuestion);
}

function handleResultUpdate({ key, value }) {
  const result = [...props.result];
  result[key] = value;
  emits('update:result', result);
}
</script>

<style lang="scss" scoped>

</style>
