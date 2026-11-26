<template>
  <call-visualization-header class="call-wave-toolbar">
    <template #main>
      <wt-single-select
        class="call-wave-toolbar__file-select"
        :model-value="file"
        :show-clear="false"
        :placeholder="t('vocabulary.file')"
        :options="files"
        data-key="id"
        @update:model-value="emit('update:file', $event)"
      />
      <div
        v-if="showControls"
        class="call-wave-toolbar__layers"
      >
        <wt-checkbox
          :label="t('webitelUI.callVisualization.hold', 2)"
          :selected="showHolds"
          @update:selected="emit('toggle-holds')"
        />
        <wt-chip>
          {{ holdsCount }}
        </wt-chip>
        <wt-checkbox
          :label="t('webitelUI.callVisualization.comment', 2)"
          :selected="showComments"
          @update:selected="emit('toggle-comments')"
        />
        <wt-chip>
          {{ commentsCount }}
        </wt-chip>
      </div>
    </template>
    <template
      v-if="showControls"
      #actions
    >
      <wt-button
        :color="ButtonColor.SECONDARY"
        :variant="isRangeEditing ? 'active' : 'outlined'"
        icon="comment"
        @click="!isRangeEditing && emit('add-note')"
      />
      <wt-button
        :color="ButtonColor.SECONDARY"
        variant="outlined"
        icon="download-record"
        @click="emit('download')"
      />
    </template>
  </call-visualization-header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ButtonColor } from '../../../../enums';

import CallVisualizationHeader from '../call-visualization-header.vue';

defineProps<{
	file: unknown;
	files: unknown[];
	showControls: boolean;
	showHolds: boolean;
	showComments: boolean;
	holdsCount: number;
	commentsCount: number;
	isRangeEditing: boolean;
}>();

const emit = defineEmits<{
	'update:file': [
		value: unknown,
	];
	'toggle-holds': [];
	'toggle-comments': [];
	'add-note': [];
	download: [];
}>();

const { t } = useI18n();
</script>

<style scoped>
.call-wave-toolbar__file-select {
  width: 280px;
}

.call-wave-toolbar__layers {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
}
</style>
