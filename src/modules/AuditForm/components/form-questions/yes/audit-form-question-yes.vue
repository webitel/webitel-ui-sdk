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
        :selected="isYes"
        @update:selected="toggleYes"
      />
    </div>
  </article>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { EngineQuestionAnswer } from '@webitel/api-services/gen/models';

import WtCheckbox from '../../../../../components/wt-checkbox/wt-checkbox.vue';

const answerModel = defineModel<EngineQuestionAnswer | null>('answer');

defineProps<{
	/**
	 * question mode, NOT audit form mode
	 */
	mode: 'read' | 'write';
}>();

const { t } = useI18n();

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
.audit-form-question-yes-read {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}
</style>
