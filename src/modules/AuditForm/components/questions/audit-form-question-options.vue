<template>
  <article class="audit-form-question-options">
    <div
      v-if="mode === 'write'"
      class="audit-form-question-options-write"
    >
      <div
        v-for="({ text, score }, key) of question.options"
        :key="key"
        class="audit-form-question-options-write-row"
      >
        <wt-input
          :value="text"
          :label="$tc('webitelUI.auditForm.option', 1)"
          @input="updateQuestion({ path: `options[${key}].text`, value: $event })"
        ></wt-input>
        <wt-input
          :value="score"
          :label="$tc('webitelUI.auditForm.score', 1)"
          type="number"
          @input="updateQuestion({ path: `options[${key}].score`, value: $event })"
        ></wt-input>
        <wt-tooltip>
          <template v-slot:activator>
            <wt-icon-btn
              icon="bucket"
              @click="deleteQuestionOption({ key })"
            ></wt-icon-btn>
          </template>
          {{ $t('reusable.delete') }}
        </wt-tooltip>
      </div>
      <wt-button
        class="audit-form-question-options-write__add-button"
        @click="addQuestionOption"
      >{{ $t('reusable.add') }}
      </wt-button>
    </div>
  </article>
</template>

<script setup>
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import WtTooltip from '../../../../components/atoms/wt-tooltip/wt-tooltip.vue';
import WtIconBtn from '../../../../components/molecules/wt-icon-btn/wt-icon-btn.vue';
import WtInput from '../../../../components/molecules/wt-input/wt-input.vue';
import WtButton from '../../../../components/atoms/wt-button/wt-button.vue';

const props = defineProps({
  question: {
    type: Object,
    required: true,
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
  const question = set(cloneDeep(props.question), path, value);
  emit('change:question', question);
}

function addQuestionOption() {
  const option = {
    text: 'My first var!',
    score: 5,
  };
  const options = [...props.question.options, option];
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

.audit-form-question-options-write-row {
  display: grid;
  grid-template-columns: 3fr 1fr 24px;
  gap: var(--spacing-sm);
  align-items: center;
}
</style>
