<template>
  <wt-popup
    size="sm"
    class="wt-save-failed-popup"
    @close="emit('close-popup')"
  >
    <template #title>
      {{ t('webitelUI.saveFailedPopup.title') }}
    </template>
    <template #main>
      <div class="wt-save-failed-popup__content">
        <wt-icon
          :color="IconColor.ERROR"
          icon="attention"
        />
        <p>{{ t('webitelUI.saveFailedPopup.label') }}</p>
      </div>
    </template>
    <template #actions>
      <wt-button @click="emit('save')">
        {{ t('reusable.retry') }}
      </wt-button>
      <wt-button
        :color="ButtonColor.SECONDARY"
        @click="emit('download')"
      >
        {{ t('webitelUI.saveFailedPopup.exportToJson') }}
      </wt-button>
      <wt-button
        :color="ButtonColor.SECONDARY"
        @click="emit('close-popup')"
      >
        {{ t('reusable.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import { ButtonColor, IconColor } from '../../../enums';

const emit = defineEmits<{
	'close-popup': [];
	save: [];
	download: [];
}>();

const { t } = useI18n();
</script>

<style scoped>
.wt-save-failed-popup__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--spacing-sm);
}
</style>
