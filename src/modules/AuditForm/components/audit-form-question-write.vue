<template>
  <article class="audit-form-question-write">
    <header class="audit-form-question-write-header">
      <wt-switcher
        :value="question.required"
        :label="$t('reusable.required')"
        @change="updateQuestion({ path: 'required', value: $event })"
      ></wt-switcher>
      <div class="audit-form-question-write-header__actions">
        <wt-tooltip>
          <template v-slot:activator>
            <wt-icon-btn
              icon="copy"
              @click="emit('copy')"
            ></wt-icon-btn>
          </template>
          {{ $t('reusable.copy') }}
        </wt-tooltip>
        <wt-tooltip>
          <template v-slot:activator>
            <wt-icon-btn
              icon="bucket"
              @click="emit('delete')"
            ></wt-icon-btn>
          </template>
          {{ $t('reusable.delete') }}
        </wt-tooltip>
      </div>
    </header>
    <section class="audit-form-question-write-content">
      <div class="audit-form-question-write-content-question">
        <wt-input
          :value="question.text"
          :label="$t('webitelUI.auditForm.question')"
          @input="updateQuestion({ path: 'text', value: $event })"
        ></wt-input>
        <wt-select
          :value="prettifiedQuestionType"
          :options="QuestionType"
          track-by="value"
          :clearable="false"
          :label="$t('vocabulary.type')"
          @input="handleQuestionTypeChange($event.value)"
        ></wt-select>
      </div>
      <component
        :is="QuestionTypeComponent"
        :question="question"
        mode="write"
        @change:question="emit('change:question', $event)"
      ></component>
      <div v-if="question.type === 'score'">
        <wt-input
          :value="question.min"
          @input="updateQuestion({ path: 'min', value: $event })"
        ></wt-input>
        <wt-input
          :value="question.max"
          @input="updateQuestion({ path: 'max', value: $event })"
        ></wt-input>
      </div>
    </section>
    <footer>
      <wt-button
        @click="emit('save')"
      >Save me</wt-button>
    </footer>
  </article>
</template>

<script setup>
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import { computed } from 'vue';
import WtTooltip from '../../../components/atoms/wt-tooltip/wt-tooltip.vue';
import WtSwitcher from '../../../components/molecules/wt-switcher/wt-switcher.vue';
import WtIconBtn from '../../../components/molecules/wt-icon-btn/wt-icon-btn.vue';
import WtInput from '../../../components/molecules/wt-input/wt-input.vue';
import WtSelect from '../../../components/molecules/wt-select/wt-select.vue';
import WtButton from '../../../components/atoms/wt-button/wt-button.vue';

import AuditFormQuestionOptions from './questions/audit-form-question-options.vue';

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits([
  'change:question',
  'copy',
  'delete',
  'save',
]);

const QuestionType = [
  { value: 'options', locale: 'webitelUI.auditForm.type.options' },
  { value: 'score', locale: 'webitelUI.auditForm.type.score' },
];

const prettifiedQuestionType = computed(() => QuestionType.find(({ value }) => value === props.question.type));

const QuestionTypeComponent = computed(() => {
  if (props.question.type === 'options') return AuditFormQuestionOptions;
  return WtButton;
});

function updateQuestion({ path, value }) {
  const question = set(cloneDeep(props.question), path, value);
  emit('change:question', question);
}

function handleQuestionTypeChange(type) {
  const question = { ...props.question, type };
  if (type === 'options') {
    delete question.min;
    delete question.max;
    question.options = [
      { text: 'title', score: 10 },
    ];
  } else if (type === 'score') {
    delete question.options;
    question.min = 1;
    question.max = 10;
  }
  emit('change:question', question);
}

</script>

<style lang="scss" scoped>
.audit-form-question-write {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
}

.audit-form-question-write-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__actions {
    display: flex;
    gap: var(--spacing-sm);
  }
}

.audit-form-question-write-content-question {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: var(--spacing-sm);
  margin-right: calc(24px + var(--spacing-sm)); // delete icon action for type "options"
  margin-bottom: var(--spacing-sm);
}
</style>
