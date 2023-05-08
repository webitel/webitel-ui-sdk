<template>
  <article class="audit-form-question-options">
    <div
      v-if="mode === 'write'"
      class="audit-form-question-options-write"
    >
      <div
        v-for="({ name, score }, key) of question.options"
        :key="key"
        class="audit-form-question-options-write-row"
      >
        <wt-input
          :label="$t('webitelUI.auditForm.option', 1)"
          :value="name"
          :v="v$.question.options.$each.$response.$data[key].name"
          @input="updateQuestion({ path: `options[${key}].name`, value: $event })"
        ></wt-input>
        <wt-input
          :label="$t('webitelUI.auditForm.score', 1)"
          :value="score"
          :v="v$.question.options.$each.$response.$data[key].score"
          type="number"
          @input="updateQuestion({ path: `options[${key}].score`, value: $event })"
        ></wt-input>
        <wt-tooltip>
          <template v-slot:activator>
            <wt-icon-btn
              :disabled="key === 0"
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
import { useVuelidate } from '@vuelidate/core';
import { required, minValue, maxValue, helpers } from '@vuelidate/validators';
import { computed, onMounted, toRefs } from 'vue';
import WtButton from '../../../../components/atoms/wt-button/wt-button.vue';
import WtTooltip from '../../../../components/atoms/wt-tooltip/wt-tooltip.vue';
import WtIconBtn from '../../../../components/molecules/wt-icon-btn/wt-icon-btn.vue';
import WtInput from '../../../../components/molecules/wt-input/wt-input.vue';
import WtRadio from '../../../../components/molecules/wt-radio/wt-radio.vue';
import updateObject from '../../../../scripts/updateObject';
import { generateOption } from '../../schemas/AuditFormQuestionOptionsSchema';

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

// is needed for useVuelidate, because props.question/props.result isn't reactive
const { question } = toRefs(props);

const v$ = useVuelidate(
  computed(() => (
    {
      question: {
        options: {
          $each: helpers.forEach({
            name: { required },
            score: {
              required,
              minValue: minValue(0),
              maxValue: maxValue(20),
            },
          }),
        },
      },
    })),
  { question },
  { $autoDirty: true },
);

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

// init validation
onMounted(() => v$.value.$touch());
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
  align-items: center;
  grid-template-columns: 3fr 1fr 24px;
  gap: var(--spacing-sm);
}

.audit-form-question-options-read {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
