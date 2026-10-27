<template>
  <article class="audit-form-question-yes">
    <div
      v-if="mode === 'write'"
      class="audit-form-question-yes-write"
    >
      <!-- DT-16: criterion description is not part of the 26.10 release, hidden; remove v-if="false" -->
      <wt-textarea
        v-if="false"
        class="audit-form-question-yes-write__description"
        :label="t('vocabulary.description')"
        :model-value="questionModel.description"
        :disabled="readonly"
        :submit-on-enter="false"
        autoresize
        @update:model-value="updateQuestion({ path: 'description', value: $event })"
      />
    </div>
    <div
      v-else-if="mode === 'read'"
      class="audit-form-question-yes-read"
    >
      <wt-checkbox
        :label="t('vocabulary.yes')"
        :selected="isYes"
        @update:selected="toggleYes"
      />
    </div>
  </article>
</template>

<script lang="ts" setup>
import type {
	EngineQuestion,
	EngineQuestionAnswer,
} from '@webitel/api-services/gen/models';
import { computed, inject } from 'vue';
import { useI18n } from 'vue-i18n';

import WtCheckbox from '../../../../../components/wt-checkbox/wt-checkbox.vue';
import WtTextarea from '../../../../../components/wt-textarea/wt-textarea.vue';
import updateObject from '../../../../../scripts/updateObject.js';

const questionModel = defineModel<EngineQuestion>('question');
const answerModel = defineModel<EngineQuestionAnswer | null>('answer');
const readonly = inject<boolean>('readonly', false);

defineProps<{
	/**
	 * question mode, NOT audit form mode
	 */
	mode: 'read' | 'write';
}>();

const { t } = useI18n();

function updateQuestion({ path, value }: { path: string; value: unknown }) {
	if (readonly) return;
	questionModel.value = updateObject({
		obj: questionModel.value,
		path,
		value,
	});
}

const isYes = computed(() => answerModel.value?.score === 1);

function toggleYes(value: boolean | string[]) {
	const boolValue = typeof value === 'boolean' ? value : value.length > 0;
	answerModel.value = answerModel.value
		? {
				...answerModel.value,
				score: boolValue ? 1 : 0,
			}
		: {
				score: boolValue ? 1 : 0,
			};
}
</script>

<style lang="scss" scoped>
.audit-form-question-yes-write__description :deep(.wt-textarea__textarea) {
  min-height: auto;
}

.audit-form-question-yes-write {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: var(--spacing-sm);
}

.audit-form-question-yes-read {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
