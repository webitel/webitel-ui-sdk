<template>
  <div class="download-action">
    <wt-button-select
      :disabled="disabled || isLoading"
      :loading="isLoading"
      :options="options"
      :color="ButtonColor.SECONDARY"
      @click:option="download"
    >
      {{ t('reusable.download') }}
    </wt-button-select>
    <div
      v-show="isLoading"
      class="download-action__counter typo-caption"
    >
      <div>
        {{ t('webitelUI.exportAction.filesLoaded') }}
        <span class="typo-caption">
          {{ downloadStatus.count }}
        </span>
      </div>
      <div v-show="zippingStatus.percent">
        {{ t('webitelUI.downloadAction.zippingProgress') }}
        <span class="typo-caption">
          {{ zippingStatus.percent }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ButtonColor } from '../../../enums';
import { useFilesExport } from '../composables/useFilesExport';
import type { DownloadOption } from '../types/downloadAction';

defineProps<{
	options: DownloadOption[];
	disabled?: boolean;
}>();

const emit = defineEmits<{
	downloaded: [];
}>();

const { t } = useI18n();

const { exportFiles, isLoading, downloadStatus, zippingStatus } =
	useFilesExport();

const download = async (option: DownloadOption) => {
	await exportFiles(option);
	emit('downloaded');
};
</script>

<style scoped>
.download-action {
  position: relative;
}

.download-action__counter {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 10px;
  padding: 10px 15px;
  border-radius: var(--border-radius);
  background: var(--content-wrapper-color);
  box-shadow: var(--box-shadow);
  white-space: nowrap;
}
</style>
