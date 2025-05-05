<template>
  <article class="audit-form-question-options">
    <div
      v-if="mode === 'write'"
      class="audit-form-question-options-write"
    >
      <options-write-row
        v-for="(option, key) of question.options"
        :key="key"
        :first="key === 0"
        :option="option"
        @delete="deleteQuestionOption({ key })"
        @update:option="
          updateQuestion({ path: `options[${key}]`, value: $event })
        "
      />
      <wt-button
        class="audit-form-question-options-write__add-button"
        @click="addQuestionOption"
      >
        {{ $t('reusable.add') }}
      </wt-button>
    </div>
    <div
      v-else-if="mode === 'read'"
      class="audit-form-question-options-read"
    >
      <wt-radio
        v-for="opt of question.options"
        :key="opt.score + opt.name"
        :label="opt.name"
        :selected="answerModel.score"
        :value="opt.score"
        @input="updateAnswer"
      />
    </div>
    <div v-else>Unknown mode: {{ mode }}</div>
  </article>
</template>

<script lang="ts" setup>
import {EngineQuestion, EngineQuestionAnswer} from "webitel-sdk";

import { WtButton, WtRadio } from '../../../../../components';
import updateObject from '../../../../../scripts/updateObject.js';
import { generateOption } from '../../../schemas/AuditFormQuestionOptionsSchema.js';
import OptionsWriteRow from './audit-form-question-options-write-row.vue';

const questionModel = defineModel<EngineQuestion>('question');
const answerModel = defineModel<EngineQuestionAnswer>('answer');

const props = defineProps<{
  /**
   * question mode, NOT audit form mode
   */
  mode: 'read' | 'write';
}>();

function updateQuestion({ path, value }) {
  questionModel.value = updateObject({
    obj: questionModel.value,
    path,
    value,
  });
}

function addQuestionOption() {
  const options = [...props.question.options, generateOption()];
  return updateQuestion({ path: 'options', value: options });
}

function deleteQuestionOption({ key }) {
  const options = [...props.question.options];
  options.splice(key, 1);
  return updateQuestion({ path: 'options', value: options });
}

function updateAnswer(score) {
  answerModel.value = answerModel.value ? {
    ...answerModel.value,
    score,
  } : { score };
}

</script>

<style lang="scss" scoped>
.audit-form-question-options-write {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);

  &__add-button {
    align-self: flex-start;
  }
}

.audit-form-question-options-read {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
