<template>
  <component
    :is="component"
    :question="props.question"
    :result="props.result"
    @change:question="emits('update:question', $event)"
    @change:result="emits('update:result', $event)"
  ></component>
</template>

<script setup>
import { computed } from 'vue';
import QuestionWrite from './audit-form-question-write.vue';
import QuestionRead from './audit-form-question-read.vue';

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
});

const emits = defineEmits([
  'update:question',
  'update:result',
]);

const component = computed(() => {
  if (props.mode === 'create') return QuestionWrite;
  return QuestionRead;
});
</script>

<style lang="scss" scoped>

</style>
