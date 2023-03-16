<template>
  <question-create
    :question="props.question"
  ></question-create>
  <question-read
    :question="props.question"
  ></question-read>
</template>

<script setup>
import QuestionCreate from './audit-form-question-create.vue';
import QuestionRead from './audit-form-question-read.vue';

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  mode: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>

</style>
