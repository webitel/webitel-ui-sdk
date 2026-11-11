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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDownloadAction } from '../../../composables/useDownloadAction/useDownloadAction';
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

const { exportFiles, downloadStatus } = useFilesExport();

const { isLoading, runDownload } = useDownloadAction();

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

const exportByType = async (type: DownloadType) => {
	const fetchList = createFetchList({
		selected,
		onFetch,
		type,
	});
	await exportFiles({
		...downloadOptions[type].getSource(fetchList),
		filename: `${filename}-${type}`,
	});
	emit('downloaded');
};

const download = ({ value: type }: { value: DownloadType }) =>
	runDownload(() => exportByType(type), {
		progress: {
			loaded: () => downloadStatus.value.count,
		},
	});
</script>

<style scoped>
.download-action {
  position: relative;
}
</style>
