<template>
  <section class="audit-form-answer-editing-info">
    <header class="audit-form-answer-editing-info-header">
      <p class="audit-form-answer-editing-info-header__updated-by">
        {{ $t('reusable.updatedBy', { updatedBy: answer.updatedBy }) }}
      </p>
      <span class="audit-form-answer-editing-info-header__updated-at">
        {{ updateTime }}
      </span>
    </header>
    <p
      v-if="answer.comment"
      class="audit-form-answer-editing-info-comment"
    >
      {{ answer.comment }}
    </p>
  </section>
</template>

<script setup lang="ts">

import {computed} from "vue";
import {EngineQuestionAnswer} from "webitel-sdk";

const props = defineProps<{
  answer: EngineQuestionAnswer;
}>();

const emit = defineEmits([]);

const updateTime = computed(() => {
  return new Date(props.answer.updatedAt).toLocaleString();
});

</script>

<style scoped lang="scss">
.question-editing-info {

}
</style>
