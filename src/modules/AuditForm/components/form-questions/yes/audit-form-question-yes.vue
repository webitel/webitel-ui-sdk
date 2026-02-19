<template>
  <article class="audit-form-question-yes">
    <div
      v-if="mode === 'write'"
      class="audit-form-question-yes-write"
    >
      <!-- Write mode: No UI needed, just a placeholder since the question type itself is the answer -->
    </div>
    <div
      v-else-if="mode === 'read'"
      class="audit-form-question-yes-read"
    >
      <wt-checkbox
        :label="t('vocabulary.yes')"
        v-model:selected="isYesModel"
      />
    </div>
  </article>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type {
	EngineQuestion,
	EngineQuestionAnswer,
} from '@webitel/api-services/gen/models';

import WtCheckbox from '../../../../../components/wt-checkbox/wt-checkbox.vue';

const answerModel = defineModel<EngineQuestionAnswer | null>('answer');
defineModel<EngineQuestion>('question', {
	required: false,
});

defineProps<{
	/**
	 * question mode, NOT audit form mode
	 */
	mode: 'read' | 'write';
}>();

const { t } = useI18n();

const isYes = computed(() => answerModel.value?.score === 1);

const isYesModel = computed({
	get: () => isYes.value,
	set: (value: boolean) => {
		answerModel.value = answerModel.value
			? {
					...answerModel.value,
					score: value ? 1 : 0,
				}
			: {
					score: value ? 1 : 0,
				};
	},
});
</script>

<style lang="scss" scoped>
.audit-form-question-yes-read {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
