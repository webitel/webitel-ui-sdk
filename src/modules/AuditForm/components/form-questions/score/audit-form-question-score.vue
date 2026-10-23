<template>
  <article class="audit-form-question-score">
    <div
      v-if="mode === 'write'"
      class="audit-form-question-score-write"
    >
      <wt-input-number
        :label="$t('reusable.from')"
        :v="v$.question.min"
        :model-value="question.min"
        :disabled="readonly"
        required
        @update:model-value="updateQuestion({ path: 'min', value: $event })"
      />
      <wt-input-number
        :label="$t('reusable.to')"
        :v="v$.question.max"
        :model-value="question.max"
        :disabled="readonly"
        required
        @update:model-value="updateQuestion({ path: 'max', value: $event })"
      />
      <div class="audit-form-question-score-write__description">
        <wt-divider />
        <wt-textarea
          class="audit-form-question-score-write__textarea"
          :label="$t('vocabulary.description')"
          :model-value="questionModel.description"
          :disabled="readonly"
          :submit-on-enter="false"
          autoresize
          @update:model-value="updateQuestion({ path: 'description', value: $event })"
        />
      </div>
    </div>
    <div
      v-else-if="mode === 'read'"
      class="audit-form-question-score-read"
    >
      <wt-radio
        v-for="score of scoreRange"
        :key="score"
        :label="`${score}`"
        :selected="answerModel?.score"
        :value="score"
        @update:selected="updateAnswer"
      />
    </div>
  </article>
</template>

<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core';
import { integer, maxValue, minValue, required } from '@vuelidate/validators';
import type {
	EngineQuestion,
	EngineQuestionAnswer,
} from '@webitel/api-services/gen/models';
import { computed, inject, onMounted } from 'vue';

import WtDivider from '../../../../../components/wt-divider/wt-divider.vue';
import WtRadio from '../../../../../components/wt-radio/wt-radio.vue';
import WtTextarea from '../../../../../components/wt-textarea/wt-textarea.vue';
import updateObject from '../../../../../scripts/updateObject.js';

const answerModel = defineModel<EngineQuestionAnswer | null>('answer');
const questionModel = defineModel<EngineQuestion>('question');
const readonly = inject<boolean>('readonly', false);

defineProps({
	mode: {
		// options: ['read', 'write']
		type: String,
		default: 'read',
	},
});

const v$ = useVuelidate(
	computed(() => ({
		question: {
			min: {
				minValue: minValue(0),
				maxValue: maxValue(9),
				required,
				integer,
			},
			max: {
				minValue: minValue(
					questionModel.value.min ? questionModel.value.min : 1,
				),
				maxValue: maxValue(10),
				required,
				integer,
			},
		},
	})),
	{
		question: questionModel,
	},
	{
		$autoDirty: true,
	},
);

const scoreRange = computed(() => {
	if (questionModel.value.min > questionModel.value.max) return [];
	const result = [];
	let i = +questionModel.value.min;
	do {
		result.push(i);
		i += 1;
	} while (i <= questionModel.value.max);
	return result;
});

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

function updateQuestion({ path, value }: { path: string; value: unknown }) {
	if (readonly) return;
	questionModel.value = updateObject({
		obj: questionModel.value,
		path,
		value,
	});
}

// init validation
onMounted(() => v$.value.$touch());
</script>

<style lang="scss" scoped>
.audit-form-question-score-write__textarea :deep(.wt-textarea__textarea) {
  min-height: auto;
}

.audit-form-question-score-write {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-sm);

  &__description {
    display: flex;
    flex-direction: column;
    grid-column: 1 / -1;
    gap: var(--spacing-sm);
  }
}

.audit-form-question-score-read {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}
</style>
