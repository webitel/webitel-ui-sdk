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
        :custom-validators="maxCustomValidators"
        :model-value="question.max"
        :disabled="readonly"
        required
        @update:model-value="updateQuestion({ path: 'max', value: $event })"
      />
      <div class="audit-form-question-score-write__settings">
        <wt-input-number
          class="audit-form-question-score-write__weight"
          :label="$t('webitelUI.auditForm.weight.label')"
          :v="v$.question.weight"
          :model-value="question.weight ?? 1"
          :disabled="readonly"
          @update:model-value="updateQuestion({ path: 'weight', value: $event ?? 1 })"
        >
          <template #label="{ label }">
            {{ label }}
            <wt-icon-btn
              v-tooltip.right="$t('webitelUI.auditForm.weight.hint')"
              class="audit-form-question-score-write__hint"
              color="info"
              icon="rounded-info"
              size="sm"
            />
          </template>
        </wt-input-number>
        <div class="audit-form-question-score-write__require-comment">
          <wt-checkbox
            :label="$t('webitelUI.auditForm.requireComment.scoreLabel')"
            :selected="question.requireComment || false"
            :disabled="readonly"
            @update:selected="handleRequireCommentChange"
          />
          <wt-input-number
            class="audit-form-question-score-write__threshold"
            :v="v$.question.commentThreshold"
            :model-value="question.commentThreshold"
            :disabled="readonly || !question.requireComment"
            @update:model-value="updateQuestion({ path: 'commentThreshold', value: $event })"
          />
        </div>
      </div>
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
import { useI18n } from 'vue-i18n';

import WtCheckbox from '../../../../../components/wt-checkbox/wt-checkbox.vue';
import WtDivider from '../../../../../components/wt-divider/wt-divider.vue';
import WtRadio from '../../../../../components/wt-radio/wt-radio.vue';
import WtSlider from '../../../../../components/wt-slider/wt-slider.vue';
import WtTextarea from '../../../../../components/wt-textarea/wt-textarea.vue';
import updateObject from '../../../../../scripts/updateObject.js';
import { AuditFormMode } from '../../../enums/AuditFormMode.enum';

const answerModel = defineModel<EngineQuestionAnswer | null>('answer');
const questionModel = defineModel<EngineQuestion>('question');
const readonly = inject<boolean>('readonly', false);
const formMode = inject<AuditFormMode>('mode');
const { t } = useI18n();

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
				noNegativeMaxScore: minValue(0),
			},
			weight: {
				minValue: minValue(1),
				maxValue: maxValue(10),
				integer,
			},
			commentThreshold: questionModel.value.requireComment
				? {
						required,
						integer,
						minValue: minValue(questionModel.value.min),
						maxValue: maxValue(questionModel.value.max),
					}
				: {},
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

const maxCustomValidators = computed(() => [
	{
		name: 'noNegativeMaxScore',
		text: t('webitelUI.auditForm.validations.noNegativeMaxScore'),
	},
]);

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

function updateQuestion({ path, value }: { path: string; value: unknown }) {
	if (readonly) return;
	questionModel.value = updateObject({
		obj: questionModel.value,
		path,
		value,
	});
}

function handleRequireCommentChange(requireComment: boolean) {
	if (readonly) return;
	questionModel.value = {
		...questionModel.value,
		requireComment,
		commentThreshold:
			questionModel.value.commentThreshold ?? questionModel.value.min,
	};
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
  grid-template-columns: 1fr 1fr 2fr;
  gap: var(--spacing-sm);

  &__hint {
    margin-left: var(--spacing-2xs);
  }

  &__settings {
    display: flex;
    gap: var(--spacing-sm);
  }

  &__weight {
    flex: 1;
  }

  &__require-comment {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding-top: var(--spacing-md);

    :deep(.wt-checkbox__label) {
      white-space: nowrap;
    }
  }

  &__threshold {
    width: 120px;
  }

  &__description {
    display: flex;
    flex-direction: column;
    grid-column: 1 / -1;
    gap: var(--spacing-sm);
  }
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
