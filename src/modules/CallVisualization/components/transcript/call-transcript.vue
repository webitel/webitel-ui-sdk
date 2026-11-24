<template>
  <section class="call-transcript">
    <call-visualization-header
      v-if="transcript"
      class="call-transcript__header"
    >
      <template #main>
        <wt-checkbox
          v-for="(channel) of channels"
          :key="channel.value"
          v-model:selected="channel.show"
          :label="channel.value"
        />
      </template>
      <template #actions>
        <stt-download-action
          @click="downloadTranscript(filteredRows)"
        />
        <stt-delete-action
          @click="handleDeleteTranscript"
        />
      </template>
    </call-visualization-header>
    <article
      v-if="transcript"
      class="call-transcript"
    >
      <wt-loader v-show="isLoading" />
      <wt-empty
        v-if="isNothingFound"
        :image="imageEmpty"
        :text="textEmpty"
      />
      <div
        v-else
        ref="tableWrapper"
        :class="{ 'call-transcript__table-wrapper--clickable': syncWithPlayback }"
        class="call-transcript__table-wrapper wt-scrollbar"
      >
        <wt-table
          v-show="!isLoading"
          :data="searchedRows"
          :headers="headers"
          :selectable="false"
          :active-row="activeRow"
          @row-click="handleRowClick"
        />
      </div>
    </article>
    <call-no-transcript
      v-else
      :call="call"
      :file="file"
      @refresh="emit('refresh')"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue';

import WtEmpty from '../../../../components/wt-empty/wt-empty.vue';
import { SttDeleteAction, SttDownloadAction } from '../../../Stt';
import { useTableEmpty } from '../../../TableComponentModule/composables/useTableEmpty';
import { useCallTranscriptPhrases } from '../../composables/useCallTranscriptPhrases';
import type {
	CallTranscriptCall,
	CallTranscriptChannel,
	CallTranscriptItem,
	CallTranscriptRow,
} from '../../types/callTranscript';
import type { CallWaveFile } from '../../types/callWave';
import CallVisualizationHeader from '../call-visualization-header.vue';
import CallNoTranscript from './call-no-transcript.vue';

const {
	call,
	file,
	syncWithPlayback = false,
	currentTime = 0,
	searchQuery = '',
} = defineProps<{
	call: CallTranscriptCall;
	file: CallWaveFile;
	syncWithPlayback?: boolean;
	currentTime?: number;
	searchQuery?: string;
}>();

const emit = defineEmits<{
	refresh: [];
	deleted: [
		transcript: CallTranscriptItem,
	];
	'row-click': [
		startSec: number,
	];
}>();

const transcript = computed(() =>
	(call.transcripts || []).find(
		({ fileId, id }) => file.id === fileId || file.id === id,
	),
);

const { isLoading, headers, rows, downloadTranscript, deleteTranscript } =
	useCallTranscriptPhrases({
		call: () => call,
		transcript,
	});

const channels = ref<Record<string, CallTranscriptChannel>>({});

const filteredRows = computed(() =>
	rows.value.filter(({ channel }) => channels.value[channel]?.show),
);

const searchedRows = computed(() => {
	const query = searchQuery.trim().toLowerCase();
	if (!query) return filteredRows.value;
	return filteredRows.value.filter(({ phrase }) =>
		phrase?.toLowerCase().includes(query),
	);
});

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
} = useTableEmpty({
	dataList: searchedRows,
	filters: computed(() => ({
		search: searchQuery.trim(),
	})),
	isLoading,
});

const isNothingFound = computed(() => !!searchQuery.trim() && showEmpty.value);

function initChannels() {
	channels.value = [
		...new Set(rows.value.map(({ channel }) => channel)),
	].reduce<Record<string, CallTranscriptChannel>>((channelsMap, channel) => {
		channelsMap[channel] = {
			value: channel,
			show: true,
		};
		return channelsMap;
	}, {});
}

watch(rows, initChannels);

const tableWrapper = useTemplateRef<HTMLElement>('tableWrapper');

const isPlaying = ({ startSec, endSec }: CallTranscriptRow) =>
	currentTime >= startSec && currentTime < endSec;

const activeRow = computed(() =>
	syncWithPlayback ? (searchedRows.value.find(isPlaying) ?? null) : null,
);

watch(
	activeRow,
	(row) => {
		if (!row) return;
		tableWrapper.value?.querySelector('.row-active')?.scrollIntoView({
			block: 'nearest',
		});
	},
	{
		flush: 'post',
	},
);

function handleRowClick({ data }: { data: CallTranscriptRow }) {
	if (syncWithPlayback) emit('row-click', data.startSec);
}

async function handleDeleteTranscript() {
	const deletedTranscript = await deleteTranscript();
	if (deletedTranscript) emit('deleted', deletedTranscript);
}
</script>

<style scoped>
.call-transcript__header {
  margin: var(--spacing-sm) 0;
}

.call-transcript__table-wrapper {
  overflow: auto;
  max-height: 60vh;
}

.call-transcript__table-wrapper--clickable :deep(.p-datatable-tbody > tr) {
  cursor: pointer;
}
</style>
