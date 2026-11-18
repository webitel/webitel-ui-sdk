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
      <div class="call-transcript__table-wrapper wt-scrollbar">
        <wt-table
          v-show="!isLoading"
          :data="filteredRows"
          :headers="headers"
          :selectable="false"
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
import { CallTranscriptAPI } from '@webitel/api-services/api';
import { computed, ref, watch } from 'vue';

import { SttDeleteAction, SttDownloadAction } from '../../../Stt';
import { useCallTranscriptPhrases } from '../../composables/useCallTranscriptPhrases';
import { downloadTranscriptTxt } from '../../scripts/downloadTranscriptTxt';
import type {
	CallTranscriptCall,
	CallTranscriptChannel,
	CallTranscriptItem,
} from '../../types/callTranscript';
import type { CallWaveFile } from '../../types/callWave';
import CallVisualizationHeader from '../call-visualization-header.vue';
import CallNoTranscript from './call-no-transcript.vue';

const { call, file } = defineProps<{
	call: CallTranscriptCall;
	file: CallWaveFile;
}>();

const emit = defineEmits<{
	refresh: [];
	deleted: [
		transcript: CallTranscriptItem,
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
</style>
