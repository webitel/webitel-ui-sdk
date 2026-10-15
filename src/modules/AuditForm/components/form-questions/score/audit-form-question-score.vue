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
    </div>
    <template v-else>
      <div
        v-if="isSliderScale"
        class="audit-form-question-score-slider"
      >
        <span>{{ question.min }}</span>
        <wt-slider
          :model-value="sliderValue"
          :min="question.min"
          :max="question.max"
          :width="300"
          @update:model-value="updateAnswer"
        />
        <span>{{ question.max }}</span>
        <wt-input-number
          :model-value="sliderValue"
          :min="question.min"
          :max="question.max"
          class="audit-form-question-score-slider__input"
          @update:model-value="updateAnswer"
        />
      </div>
      <div
        v-else
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
    </template>
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

import WtRadio from '../../../../../components/wt-radio/wt-radio.vue';
import WtSlider from '../../../../../components/wt-slider/wt-slider.vue';
import updateObject from '../../../../../scripts/updateObject.js';
import { AuditFormMode } from '../../../enums/AuditFormMode.enum';

const answerModel = defineModel<EngineQuestionAnswer | null>('answer');
const questionModel = defineModel<EngineQuestion>('question');
const readonly = inject<boolean>('readonly', false);
const formMode = inject<AuditFormMode>('mode');

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
				minValue: minValue(-15),
				maxValue: maxValue(14),
				required,
				integer,
			},
			max: {
				minValue: minValue((questionModel.value.min ?? -15) + 1),
				maxValue: maxValue(15),
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

const isSliderScale = computed(
	() =>
		formMode === AuditFormMode.Create &&
		(questionModel.value.max - questionModel.value.min > 10 ||
			questionModel.value.min < 0),
);

const sliderValue = computed(
	() => answerModel.value?.score ?? Math.max(questionModel.value.min, 0),
);

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

function updateQuestion({ path, value }) {
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
.audit-form-question-score-write {
  display: grid;
  grid-template-columns: 100px 100px;
  gap: var(--spacing-sm);
  margin-right: calc(var(--spacing-sm) + 24px); // icon offset
}

.audit-form-question-score-slider {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);

  &__input {
    width: 100px;
  }
}

.audit-form-question-score-read {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}
</style>
