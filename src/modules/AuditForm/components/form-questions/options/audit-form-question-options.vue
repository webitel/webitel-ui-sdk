<template>
  <article class="audit-form-question-options">
    <div
      v-if="mode === 'write'"
      class="audit-form-question-options-write"
    >
      <options-write-row
        v-for="(option, key) of questionModel.options"
        :key="key"
        :first="key === 0"
        :option="option"
        @delete="deleteQuestionOption({ key })"
        @update:option="
          updateQuestion({ path: `options[${key}]`, value: $event })
        "
      />
      <wt-message
        v-if="isAllOptionsNegative"
        :color="MessageColor.ERROR"
        :variant="MessageVariant.SIMPLE"
        :size="ComponentSize.SM"
      >
        {{ $t('webitelUI.auditForm.validations.noNegativeOptions') }}
      </wt-message>
      <wt-button
        class="audit-form-question-options-write__add-button"
        :disabled="readonly"
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
        v-for="opt of questionModel.options"
        :key="opt.score + opt.name"
        :label="opt.name"
        :selected="answerModel?.score"
        :value="opt.score"
        @update:selected="updateAnswer"
      />
    </div>
    <div v-else>Unknown mode: {{ mode }}</div>
  </article>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import type {
	EngineQuestion,
	EngineQuestionAnswer,
} from '@webitel/api-services/gen/models';
import { computed, inject, onMounted } from 'vue';
import { WtButton, WtMessage, WtRadio } from '../../../../../components';
import {
	ComponentSize,
	MessageColor,
	MessageVariant,
} from '../../../../../enums';
import updateObject from '../../../../../scripts/updateObject.js';
import { generateOption } from '../../../schemas/AuditFormQuestionOptionsSchema';
import OptionsWriteRow from './audit-form-question-options-write-row.vue';

const questionModel = defineModel<EngineQuestion>('question');
const answerModel = defineModel<EngineQuestionAnswer | null>('answer');
const readonly = inject<boolean>('readonly', false);

defineProps<{
	/**
	 * question mode, NOT audit form mode
	 */
	mode: 'read' | 'write';
}>();

const v$ = useVuelidate(
	{
		question: {
			options: {
				noNegativeOptions: (options) => options.some(({ score }) => score >= 0),
			},
		},
	},
	{
		question: questionModel,
	},
	{
		$autoDirty: true,
	},
);

const isAllOptionsNegative = computed(
	() => v$.value.question.options.noNegativeOptions.$invalid,
);

function updateQuestion({ path, value }) {
	if (readonly) return;
	questionModel.value = updateObject({
		obj: questionModel.value,
		path,
		value,
	});
}

function addQuestionOption() {
	if (readonly) return;
	const options = [
		...questionModel.value.options,
		generateOption(),
	];
	return updateQuestion({
		path: 'options',
		value: options,
	});
}

function deleteQuestionOption({ key }) {
	if (readonly) return;
	const options = [
		...questionModel.value.options,
	];
	options.splice(key, 1);
	return updateQuestion({
		path: 'options',
		value: options,
	});
}

onMounted(() => v$.value.$touch());

function updateAnswer(score) {
	answerModel.value = answerModel.value
		? {
				...answerModel.value,
				score,
			}
		: {
				score,
			};
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
