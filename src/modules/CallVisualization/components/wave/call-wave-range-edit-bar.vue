<template>
  <div>
    <div class="call-wave-range-edit-bar">
      <span class="call-wave-range-edit-bar__title typo-subtitle-1">
        <wt-icon
          icon="comment"
          color="comment-external"
        />
        {{ t('webitelUI.callVisualization.changeNoteRange') }}
      </span>
      <div class="call-wave-range-edit-bar__actions">
        <wt-button
          size="sm"
          :disabled="!isChanged"
          :loading="isSaving"
          @click="emit('save')"
        >
          {{ t('reusable.save') }}
        </wt-button>
        <wt-button
          size="sm"
          color="secondary"
          :disabled="isSaving"
          @click="emit('cancel')"
        >
          {{ t('reusable.cancel') }}
        </wt-button>
      </div>
    </div>
    <wt-divider />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

defineProps<{
	isChanged: boolean;
	isSaving: boolean;
}>();

const emit = defineEmits<{
	save: [];
	cancel: [];
}>();

const { t } = useI18n();
</script>

<style scoped>
.call-wave-range-edit-bar {
  display: flex;
  padding: var(--spacing-xs);
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xs);
}

.call-wave-range-edit-bar__title {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.call-wave-range-edit-bar__actions {
  display: flex;
  gap: var(--spacing-xs);
}
</style>
