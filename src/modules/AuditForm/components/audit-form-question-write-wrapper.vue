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
              :disabled="disableDelete"
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
          :value="question.question"
          :label="$t('webitelUI.auditForm.question')"
          :v="v.question.question"
          required
          @input="updateQuestion({ path: 'question', value: $event })"
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
    </section>
  </article>
</template>

<script setup>
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import { computed } from 'vue';
import { EngineAuditQuestionType } from 'webitel-sdk';
import WtTooltip from '../../../components/atoms/wt-tooltip/wt-tooltip.vue';
import WtSwitcher from '../../../components/molecules/wt-switcher/wt-switcher.vue';
import WtIconBtn from '../../../components/molecules/wt-icon-btn/wt-icon-btn.vue';
import WtInput from '../../../components/molecules/wt-input/wt-input.vue';
import WtSelect from '../../../components/molecules/wt-select/wt-select.vue';

import AuditFormQuestionOptions from './questions/audit-form-question-options.vue';
import AuditFormQuestionScore from './questions/audit-form-question-score.vue';

import { generateQuestionScoreSchema } from '../schemas/AuditFormQuestionScoreSchema';
import { generateQuestionOptionsSchema } from '../schemas/AuditFormQuestionOptionsSchema';

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  disableDelete: {
    type: Boolean,
    default: true,
  },
  v: {
    type: Object,
  },
});

const emit = defineEmits([
  'change:question',
  'copy',
  'delete',
]);

const QuestionType = [
  { value: EngineAuditQuestionType.Option, locale: 'webitelUI.auditForm.type.options' },
  { value: EngineAuditQuestionType.Score, locale: 'webitelUI.auditForm.type.score' },
];

const prettifiedQuestionType = computed(() => QuestionType.find(({ value }) => value === props.question.type));

const QuestionTypeComponent = computed(() => {
  if (props.question.type === EngineAuditQuestionType.Option) return AuditFormQuestionOptions;
  if (props.question.type === EngineAuditQuestionType.Score) return AuditFormQuestionScore;
  return null;
});

function updateQuestion({ path, value }) {
  const question = set(cloneDeep(props.question), path, value);
  emit('change:question', question);
}

function handleQuestionTypeChange(type) {
  const question = cloneDeep(props.question);
  if (type === EngineAuditQuestionType.Option) {
    Object.assign(question, generateQuestionOptionsSchema());
  } else if (type === EngineAuditQuestionType.Score) {
    Object.assign(question, generateQuestionScoreSchema());
  }
  emit('change:question', question);
}

</script>

<style lang="scss" scoped>
.audit-form-question.audit-form-question-write {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  box-shadow: var(--elevation-3);
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
