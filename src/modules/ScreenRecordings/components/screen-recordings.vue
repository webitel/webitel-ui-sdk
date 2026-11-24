<template>
  <div class="screen-recordings table-section__table-wrapper">
    <wt-vidstack-player
      v-if="currentVideo"
      closable
      :src="recordingUrl(currentVideo)"
      :title="recordingName(currentVideo)"
      :mime="currentVideo.mimeType"
      @close="closeVideo"
    />

    <wt-empty
      v-show="showEmpty"
      :image="imageEmpty"
      :text="textEmpty"
    />

    <wt-loader v-show="isLoading" />

    <wt-table
      v-show="dataList.length && !isLoading"
      v-model:selected="selected"
      :data="dataList"
      :headers="headers"
      fixed-actions
      sortable
    >
      <template #screenRecordings="{ item }">
        <wt-image
          width="48px"
          overlay-icon="play"
          :src="recordingUrl(item, { isThumb: true })"
          alt=""
          @click="openVideo(item)"
        />
      </template>

      <template #name="{ item }">
        {{ recordingName(item) }}
      </template>

      <template #dateTime="{ item }">
        <wt-time-tooltip :text="prettifyTimestamp(item)" />
      </template>

      <template #recordingDuration="{ item }">
        {{ calcDuration(item) }}
      </template>

      <template #actions="{ item }">
        <wt-copy-action
          v-if="copyLink"
          icon="link"
          :value="recordingUrl(item)"
        />
        <wt-loader
          v-if="isFileDownloading(item.id)"
          :size="ComponentSize.SM"
        />
        <wt-icon-action
          v-else
          :action="IconAction.DOWNLOAD"
          @click="downloadRecording(item)"
        />
        <wt-icon-action
          :action="IconAction.DELETE"
          :disabled="!hasDeleteAccess"
          @click="emit('delete', item)"
        />
      </template>
    </wt-table>
  </div>
</template>

<script setup lang="ts">
import { downloadFile, getMediaUrl } from '@webitel/api-services/api';
import type { StorageFile } from '@webitel/api-services/gen/models';
import { ref, toRefs } from 'vue';

import WtEmpty from '../../../components/wt-empty/wt-empty.vue';
import WtTimeTooltip from '../../../components/wt-time-tooltip/wt-time-tooltip.vue';
import WtVidstackPlayer from '../../../components/wt-vidstack-player/wt-vidstack-player.vue';
import { useDownloadAction } from '../../../composables/useDownloadAction/useDownloadAction';
import { ComponentSize, IconAction } from '../../../enums';
import { FormatDateMode } from '../../../enums/FormatDateMode/FormatDateMode';
import convertDuration from '../../../scripts/convertDuration.js';
import { getMediaUrlAuth } from '../../../scripts/file/storageFile/getMediaUrlAuth';
import { formatDate } from '../../../utils/formatDate';
import { useTableEmpty } from '../../TableComponentModule/composables/useTableEmpty';
import { headers } from '../configs/headers';

const props = defineProps<{
	dataList: StorageFile[];
	isLoading?: boolean;
	hasDeleteAccess?: boolean;
	copyLink?: boolean;
}>();

const { dataList, isLoading } = toRefs(props);

const selected = defineModel<StorageFile[]>('selected', {
	default: () => [],
});

const emit = defineEmits<{
	delete: [
		item: StorageFile,
	];
}>();

const { isKeyLoading: isFileDownloading, runDownload: runFileDownload } =
	useDownloadAction();

const currentVideo = ref<StorageFile | null>(null);

const recordingUrl = (item: StorageFile, { isThumb = false } = {}) =>
	item.id
		? getMediaUrl(item.id, {
				auth: getMediaUrlAuth(),
				isThumb,
			})
		: '';

const recordingName = (item: StorageFile) => item.viewName || item.name;

const prettifyTimestamp = (item: StorageFile) => {
	const startAt = item.properties?.startTime ?? item.uploadedAt;
	return startAt ? formatDate(+startAt, FormatDateMode.DATETIME) : '';
};

const calcDuration = (item: StorageFile) => {
	const startAt = Number(item.properties?.startTime);
	const stopAt = Number(item.properties?.endTime);
	if (!Number.isFinite(startAt) || !Number.isFinite(stopAt)) return '';

	return convertDuration(Math.floor((stopAt - startAt) / 1000));
};

const downloadRecording = (item: StorageFile) => {
	if (!item.id) return;

	const { id } = item;

	return runFileDownload(() => downloadFile(id, recordingName(item)), {
		key: id,
	});
};

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
} = useTableEmpty({
	dataList,
	isLoading,
});

const openVideo = (item: StorageFile) => {
	currentVideo.value = item;
};

const closeVideo = () => {
	currentVideo.value = null;
};
</script>
