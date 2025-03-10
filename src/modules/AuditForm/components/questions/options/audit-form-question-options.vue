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
        :selected="result"
        :value="opt"
        @input="emit('change:result', $event)"
      />
    </div>
    <div v-else>Unknown mode: {{ mode }}</div>
  </article>
</template>

<script setup>
import WtButton from '../../../../../components/wt-button/wt-button.vue';
import WtRadio from '../../../../../components/wt-radio/wt-radio.vue';
import updateObject from '../../../../../scripts/updateObject.js';
import { generateOption } from '../../../schemas/AuditFormQuestionOptionsSchema.js';
import OptionsWriteRow from './audit-form-question-options-write-row.vue';

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

const emit = defineEmits(['change:question', 'change:result']);

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
