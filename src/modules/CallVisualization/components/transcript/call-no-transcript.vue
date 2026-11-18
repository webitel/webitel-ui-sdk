<template>
  <article class="call-no-transcript">
    <div
      v-if="isTranscriptionFailed"
      class="call-no-transcript__wrapper"
    >
      <p class="call-no-transcript__text">
        {{ t('webitelUI.stt.transcriptionError') }}
      </p>
      <wt-icon
        icon="attention"
        size="xl"
        color="error"
      />
      <!-- TODO: Remove this after transcription via video is added -->
      <wt-button
        v-if="hasAudioFile"
        @click="transcribe"
      >
        {{ t('reusable.retry') }}
      </wt-button>
    </div>

    <div
      v-else-if="fileJob"
      class="call-no-transcript__wrapper"
    >
      <p class="call-no-transcript__text">
        {{ t('webitelUI.callVisualization.transcribingInProgress') }}
      </p>
      <wt-loader />
      <wt-button
        @click="emit('refresh')"
      >
        {{ t('reusable.refresh') }}
      </wt-button>
    </div>

    <div
      v-else
      class="call-no-transcript__wrapper"
    >
      <p class="call-no-transcript__text">
        {{ t('webitelUI.callVisualization.noTranscript') }}
      </p>
      <wt-icon
        icon="stt"
        size="xl"
        color="disabled"
      />
      <!-- TODO: Remove this after transcription via video is added -->
      <wt-button
        v-if="hasAudioFile"
        @click="transcribe"
      >
        {{ t('webitelUI.stt.transcribe') }}
      </wt-button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { CallTranscriptAPI } from '@webitel/api-services/api';
import {
	EngineCallFileType,
	EngineHistoryFileJobHistoryFileJobState,
} from '@webitel/api-services/gen/models';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import isEmpty from '../../../../scripts/isEmpty';
import type { CallTranscriptCall } from '../../types/callTranscript';
import type { CallWaveFile } from '../../types/callWave';

const { call, file } = defineProps<{
	call: CallTranscriptCall;
	file: CallWaveFile;
}>();

const emit = defineEmits<{
	refresh: [];
}>();

const { t } = useI18n();

const fileJob = computed(() =>
	(call.filesJob || []).find(({ fileId }) => file.id === fileId),
);

const isTranscriptionFailed = computed(
	() => fileJob.value?.state === EngineHistoryFileJobHistoryFileJobState.Error,
);

const hasAudioFile = computed(
	() => !isEmpty(call?.files?.[EngineCallFileType.FileTypeAudio]),
);

async function transcribe() {
	await CallTranscriptAPI.create({
		fileId: file.id,
	});
	emit('refresh');
}
</script>

<style scoped>
.call-no-transcript {
  max-width: 40%;
  padding: var(--spacing-lg);
  margin: var(--spacing-3xl) auto;
  border: 1px solid var(--secondary-color);
  border-radius: var(--border-radius);
}

.call-no-transcript__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.call-no-transcript__text {
  text-align: center;
}
</style>
