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
          @click="downloadTxt"
        />
        <stt-delete-action
          @click="deleteTranscript"
        />
      </template>
    </call-visualization-header>
    <article
      v-if="transcript"
      class="call-transcript"
    >
      <wt-loader v-show="isLoading" />
      <div
        ref="tableWrapper"
        :class="{ 'call-transcript__table-wrapper--clickable': syncWithPlayback }"
        class="call-transcript__table-wrapper wt-scrollbar"
      >
        <wt-table
          v-show="!isLoading"
          :data="filteredRows"
          :headers="headers"
          :selectable="false"
          :active-row="activeRow"
          @row-click="handleRowClick"
        >
          <template #phrase="{ item }">
            <span>
              <span
                v-for="(part, index) of getPhraseParts(item)"
                :key="index"
                :class="getPhrasePartClass(part)"
              >{{ part.text }}</span>
            </span>
          </template>
        </wt-table>
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
import { CallTranscriptAPI } from '@webitel/api-services/api';
import { computed, ref, useTemplateRef, watch } from 'vue';

import { SttDeleteAction, SttDownloadAction } from '../../../Stt';
import { useCallTranscriptPhrases } from '../../composables/useCallTranscriptPhrases';
import { downloadTranscriptTxt } from '../../scripts/downloadTranscriptTxt';
import { searchTranscriptPhrases } from '../../scripts/searchTranscriptPhrases';
import type {
	CallTranscriptCall,
	CallTranscriptChannel,
	CallTranscriptItem,
	CallTranscriptPhrasePart,
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
	activeMatch = 0,
} = defineProps<{
	call: CallTranscriptCall;
	file: CallWaveFile;
	syncWithPlayback?: boolean;
	currentTime?: number;
	searchQuery?: string;
	activeMatch?: number;
}>();

const emit = defineEmits<{
	refresh: [];
	deleted: [
		transcript: CallTranscriptItem,
	];
	'row-click': [
		startSec: number,
	];
	'matches-change': [
		count: number,
	];
}>();

const transcript = computed(() =>
	(call.transcripts || []).find(
		({ fileId, id }) => file.id === fileId || file.id === id,
	),
);

const { isLoading, headers, rows } = useCallTranscriptPhrases({
	call: () => call,
	transcript,
});

const channels = ref<Record<string, CallTranscriptChannel>>({});

const filteredRows = computed(() =>
	rows.value.filter(({ channel }) => channels.value[channel]?.show),
);

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
	syncWithPlayback ? (filteredRows.value.find(isPlaying) ?? null) : null,
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

const search = computed(() =>
	searchTranscriptPhrases({
		rows: filteredRows.value,
		query: searchQuery,
	}),
);

const getPhraseParts = (row: CallTranscriptRow) =>
	search.value.partsByRow.get(row) ?? [
		{
			text: row.phrase ?? '',
			isMatch: false,
		},
	];

const getPhrasePartClass = (part: CallTranscriptPhrasePart) => ({
	'call-transcript__match': part.isMatch,
	'call-transcript__match--active': part.matchIndex === activeMatch,
});

watch(
	() => search.value.matchesCount,
	(count) => emit('matches-change', count),
);

watch(
	[
		() => searchQuery,
		() => activeMatch,
	],
	() => {
		tableWrapper.value
			?.querySelector('.call-transcript__match--active')
			?.scrollIntoView({
				block: 'nearest',
			});
	},
	{
		flush: 'post',
	},
);

function downloadTxt() {
	return downloadTranscriptTxt({
		rows: filteredRows.value,
		transcriptId: transcript.value?.id,
		callCreatedAt: call.createdAt,
	});
}

async function deleteTranscript() {
	const deletedTranscript = transcript.value;
	if (!deletedTranscript) return;
	await CallTranscriptAPI.delete({
		fileId: deletedTranscript.id,
	});
	emit('deleted', deletedTranscript);
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

.call-transcript__match {
  background: var(--call-transcript-match-background);
  color: var(--call-transcript-match-color);
}

.call-transcript__match--active {
  background: var(--call-transcript-active-match-background);
  color: var(--call-transcript-active-match-color);
}
</style>
