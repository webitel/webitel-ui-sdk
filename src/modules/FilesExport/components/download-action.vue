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
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ButtonColor } from '../../../enums';
import { useFilesExport } from '../composables/useFilesExport';
import {
	defaultDownloadTypes,
	downloadOptions,
} from '../configs/downloadOptions';
import type { DownloadType } from '../enums/DownloadType';
import type { DownloadActionProps } from '../types/downloadAction';
import { createFetchList } from '../utils/utils';

const {
	filename,
	types = defaultDownloadTypes,
	selected = [],
	disabled,
	onFetch,
} = defineProps<DownloadActionProps>();

const emit = defineEmits<{
	downloaded: [];
}>();

const { t } = useI18n();

const { exportFiles, isLoading, downloadStatus, zippingStatus } =
	useFilesExport();

const options = computed(() =>
	types.map((type) => {
		const { locale, hasMaterial } = downloadOptions[type];
		return {
			value: type,
			text: t(locale),
			disabled: !selected.every(hasMaterial),
		};
	}),
);

const download = async ({ value: type }: { value: DownloadType }) => {
	const fetchList = createFetchList({
		selected,
		onFetch,
		type,
	});
	const source = downloadOptions[type].getSource(fetchList);
	await exportFiles({
		...source,
		filename: `${filename}-${type}`,
	});
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
