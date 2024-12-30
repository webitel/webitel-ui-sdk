<template>
  <article class="audit-form-question-write">
    <header class="audit-form-question-write-header">
      <wt-switcher
        :disabled="first"
        :label="$t('reusable.required')"
        :value="question.required"
        @change="updateQuestion({ path: 'required', value: $event })"
      />
      <div class="audit-form-question-write-header__actions">
        <wt-tooltip>
          <template #activator>
            <wt-icon-btn
              icon="copy"
              @click="emit('copy')"
            />
          </template>
          {{ $t('reusable.copy') }}
        </wt-tooltip>
        <wt-tooltip>
          <template #activator>
            <wt-icon-btn
              :disabled="first"
              icon="bucket"
              @click="emit('delete')"
            />
          </template>
          {{ $t('reusable.delete') }}
        </wt-tooltip>
      </div>
    </header>
    <section class="audit-form-question-write-content">
      <div class="audit-form-question-write-content-question">
        <wt-input
          :label="$t('webitelUI.auditForm.question')"
          :v="v.question.question"
          :value="question.question"
          prevent-trim
          required
          @input="updateQuestion({ path: 'question', value: $event })"
        />
        <wt-select
          :clearable="false"
          :label="$t('webitelUI.auditForm.answerType')"
          :options="QuestionType"
          :value="prettifiedQuestionType"
          track-by="value"
          @input="handleQuestionTypeChange($event.value)"
        />
      </div>
      <component
        :is="QuestionTypeComponent"
        :question="question"
        mode="write"
        @change:question="emit('change:question', $event)"
      />
    </section>
  </article>
</template>

<script setup>
import cloneDeep from 'lodash/cloneDeep.js';
import set from 'lodash/set.js';
import { computed } from 'vue';
import { EngineAuditQuestionType } from 'webitel-sdk';
import WtIconBtn from '../../../components/wt-icon-btn/wt-icon-btn.vue';
import WtInput from '../../../components/wt-input/wt-input.vue';
import WtSelect from '../../../components/wt-select/wt-select.vue';
import WtSwitcher from '../../../components/wt-switcher/wt-switcher.vue';
import WtTooltip from '../../../components/wt-tooltip/wt-tooltip.vue';
import { generateQuestionOptionsSchema } from '../schemas/AuditFormQuestionOptionsSchema.js';

import { generateQuestionScoreSchema } from '../schemas/AuditFormQuestionScoreSchema.js';

import AuditFormQuestionOptions from './questions/options/audit-form-question-options.vue';
import AuditFormQuestionScore from './questions/score/audit-form-question-score.vue';

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  first: {
    type: Boolean,
    default: false,
  },
  v: {
    type: Object,
  },
});

const emit = defineEmits(['change:question', 'copy', 'delete']);

const QuestionType = [
  {
    value: EngineAuditQuestionType.Option,
    locale: 'webitelUI.auditForm.type.options',
  },
  {
    value: EngineAuditQuestionType.Score,
    locale: 'webitelUI.auditForm.type.score',
  },
];

const prettifiedQuestionType = computed(() =>
  QuestionType.find(({ value }) => value === props.question.type),
);

const QuestionTypeComponent = computed(() => {
  if (props.question.type === EngineAuditQuestionType.Option)
    return AuditFormQuestionOptions;
  if (props.question.type === EngineAuditQuestionType.Score)
    return AuditFormQuestionScore;
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
  box-shadow: var(--elevation-3);
  gap: var(--spacing-sm);
}

.audit-form-question-write-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__actions {
    display: flex;
    gap: var(--spacing-sm);
  }
}

.audit-form-question-write-content-question {
  display: grid;
  margin-right: calc(
    24px + var(--spacing-sm)
  ); // delete icon action for type "options"
  margin-bottom: var(--spacing-sm);
  grid-template-columns: 3fr 1fr;
  gap: var(--spacing-sm);
}
</style>
