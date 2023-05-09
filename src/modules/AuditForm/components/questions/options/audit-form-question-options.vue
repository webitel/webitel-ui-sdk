<template>
  <article class="audit-form-question-options">
    <div
      v-if="mode === 'write'"
      class="audit-form-question-options-write"
    >
      <options-write-row
        v-for="(option, key) of question.options"
        :key="key"
        :option="option"
        :first="key === 0"
        @update:option="updateQuestion({ path: `options[${key}]`, value: $event })"
        @delete="deleteQuestionOption({ key })"
      ></options-write-row>
      <wt-button
        class="audit-form-question-options-write__add-button"
        @click="addQuestionOption"
      >{{ $t('reusable.add') }}
      </wt-button>
    </div>
    <div
      v-else-if="mode === 'read'"
      class="audit-form-question-options-read"
    >
      <wt-radio
        v-for="({ name, score }) of question.options"
        :key="score"
        :label="name"
        :selected="result ? result.score : result"
        :value="score"
        @input="emit('change:result', { score })"
      ></wt-radio>
    </div>
    <div v-else>Unknown mode: {{ mode }}</div>
  </article>
</template>

<script setup>
import OptionsWriteRow from './audit-form-question-options-write-row.vue';
import WtButton from '../../../../../components/atoms/wt-button/wt-button.vue';
import WtRadio from '../../../../../components/molecules/wt-radio/wt-radio.vue';
import updateObject from '../../../../../scripts/updateObject';
import { generateOption } from '../../../schemas/AuditFormQuestionOptionsSchema';

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

function updateQuestion({ path, value }) {
  emit('change:question', updateObject({ obj: props.question, path, value }));
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
