<template>
  <section>
    <audit-form-question
      v-for="(question, key) of questions"
      :key="key"
      :question="question"
      :mode="mode"
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
    default: () => [
      {
        required: true,
        text: 'Hello',
        type: 'options',
        options: [
          {
            text: 'Hello',
            score: 10,
          },
        ],
      },
      {
        required: true,
        text: 'Hello',
        type: 'score',
        min: 10,
        max: 10,
      },
    ],
  },
});

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
</script>

<style lang="scss" scoped>

</style>
