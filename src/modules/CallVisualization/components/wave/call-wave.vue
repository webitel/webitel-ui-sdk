<template>
  <section class="call-wave-page">
    <call-wave-toolbar
      :file="file"
      :files="audioFiles"
      :show-controls="!isLoading && !isRecordingDeleted"
      :show-holds="showHolds"
      :show-comments="showComments"
      :holds-count="holdsCount"
      :comments-count="commentsSize"
      :is-range-editing="!!rangeEditComment"
      @update:file="setFile"
      @toggle-holds="toggleHolds"
      @toggle-comments="toggleComments"
      @add-note="openAddNote"
      @download="downloadFile"
    />

    <wt-progress-bar
      v-show="isLoading"
      :max="100"
      :value="loadProgress"
    />
    <call-recording-empty
      v-if="isRecordingDeleted"
      is-deleted
    />
    <!-- v-show keeps wavesurfer mounted, so choosing another file still loads it. -->
    <section
      v-show="!isLoading && !isRecordingDeleted"
      class="call-wave-page-main"
    >
      <call-wave-range-edit-bar
        v-if="rangeEditComment"
        :is-changed="isRangeChanged"
        :is-saving="isRangeSaving"
        @save="saveCommentRange"
        @cancel="stopRangeEdit"
      />

      <call-comment-form
        v-if="newComment"
        :call-duration="getCallDurationSec()"
        :comment="newComment"
        :is-saving="isAddingComment"
        @close="closeAddNote"
        @save="addComment"
        @update-draft-range="updateDraftSelectionRange($event.startSec, $event.endSec)"
      />

      <delete-confirmation-popup
        :shown="isDeleteConfirmationShown"
        :callback="deleteCallback"
        :delete-count="deleteCount"
        @close="closeDelete"
      />

      <section class="call-wave-data--grid">
        <section class="call-wave-data-legs-actions">
          <call-wave-channel-volume
            v-if="!leftGain.disabled"
            :volume="volumeLeftGain"
            :muted="leftGain.muted"
            @update:volume="volumeLeftChangeHandler"
          />
          <call-wave-channel-volume
            v-if="!rightGain.disabled"
            :volume="volumeRightGain"
            :muted="rightGain.muted"
            @update:volume="volumeRightChangeHandler"
          />
        </section>

        <section
          v-if="fileUrl"
          class="call-wave-data-plugin"
        >
          <div
            class="call-wave-wave-wrap"
            :class="{ 'call-wave-wave-wrap--mono': isMono }"
          >
            <wavesurfer
              ref="wavesurferComponentRef"
              class="typo-caption"
              :options="waveOptions"
              :src="fileUrl"
            />
            <div class="call-wave-markers typo-body-2">
              <call-wave-channel-name
                class="call-wave-markers__top-channel"
                :name="call.from.name || call.from.number || ' '"
                :color="IconColor.SUCCESS"
              />
              <call-wave-channel-name
                v-if="!isMono"
                class="call-wave-markers__bottom-channel"
                :name="call.to?.name || call.to?.number || call.destination || ''"
                :color="IconColor.PRIMARY"
              />
              <call-wave-hold-markers :markers="holdMarkers" />
              <call-wave-comment-markers
                v-if="showCommentMarkers"
                :markers="markers"
                :top-px="commentMarkerTopPx"
                :visible-width-px="layout?.visibleWidthPx ?? 0"
                :save-note-text="saveCommentNote"
                @active-change="setCommentHighlight"
                @edit-range="startCommentRangeEdit"
                @delete="askCommentDeleteConfirmation"
              />
            </div>
          </div>
        </section>

        <div />
        <call-wave-playback-controls
          :playback-rate="playbackRate"
          :is-playing="isPlaying"
          :zoom-in-disabled="zoomInDisabled"
          :zoom-out-disabled="zoomOutDisabled"
          @toggle-rate="toggleRate"
          @play-pause="playPause"
          @zoom-in="increaseZoom"
          @zoom-out="decreaseZoom"
        />
      </section>
    </section>
  </section>
</template>

<script setup lang="ts">
import { getCallMediaUrl } from '@webitel/api-services/api';
import { EngineCallFileType } from '@webitel/api-services/gen/models';
import { computed, nextTick, onBeforeUnmount, ref, toRef, watch } from 'vue';
import type WaveSurfer from 'wavesurfer.js';
import { IconColor } from '../../../../enums';
import { getMediaUrlAuth } from '../../../../scripts/file/storageFile/getMediaUrlAuth';
import DeleteConfirmationPopup from '../../../DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import type { ExportedItem } from '../../../FilesExport';
import { useFilesExport } from '../../../FilesExport';
import {
	COMMENT_MARKER_SIZE_PX,
	useCallWaveCommentMarkers,
} from '../../composables/useCallWaveCommentMarkers';
import { useCallWaveComments } from '../../composables/useCallWaveComments';
import { useCallWaveFileAnnotations } from '../../composables/useCallWaveFileAnnotations';
import { useCallWaveHoldMarkers } from '../../composables/useCallWaveHoldMarkers';
import {
	useCallWavePlugins,
	WAVE_HEIGHT,
} from '../../composables/useCallWavePlugins';
import { useCallWaveRegions } from '../../composables/useCallWaveRegions';
import { useCallWaveSound } from '../../composables/useCallWaveSound';
import { useCallWaveZoom } from '../../composables/useCallWaveZoom';
import {
	MARKER_GAP_PX,
	useWaveformLayout,
} from '../../composables/useWaveformLayout';
import type {
	CallWaveCallRecord,
	CallWaveFile,
	WaveAnnotation,
} from '../../types/callWave';
import CallRecordingEmpty from '../call-recording-empty.vue';
import CallWaveChannelName from './call-wave-channel-name.vue';
import CallWaveChannelVolume from './call-wave-channel-volume.vue';
import CallCommentForm from './call-wave-comment-form.vue';
import CallWaveCommentMarkers from './call-wave-comment-markers.vue';
import CallWaveHoldMarkers from './call-wave-hold-markers.vue';
import CallWavePlaybackControls from './call-wave-playback-controls.vue';
import CallWaveRangeEditBar from './call-wave-range-edit-bar.vue';
import CallWaveToolbar from './call-wave-toolbar.vue';
import Wavesurfer from './wavesurfer.vue';

const props = defineProps<{
	call: CallWaveCallRecord;
}>();

const file = defineModel<CallWaveFile>('selectedFile', {
	required: true,
});

const emit = defineEmits<{
	'update:annotations': [
		value: WaveAnnotation[],
	];
	timeupdate: [
		value: number,
	];
}>();

const allAnnotations = computed<WaveAnnotation[]>(
	() => props.call.annotations ?? [],
);
const fileOptions = computed(
	() => (props.call.files ?? {}) as Record<string, CallWaveFile[]>,
);
const fileUrl = computed(() =>
	getCallMediaUrl(file.value.id as string, {
		auth: getMediaUrlAuth(),
		download: true,
	}),
);

const { audioFiles, currentFileId, annotations, commentsSize } =
	useCallWaveFileAnnotations({
		file,
		fileOptions,
		allAnnotations,
	});

const holdsCount = computed(() => props.call.hold?.length ?? 0);

function setFile(payload: unknown) {
	file.value = payload as CallWaveFile;
}

const { exportFiles: downloadFile } = useFilesExport({
	getFileURL: (item) =>
		getCallMediaUrl(item.id as string, {
			auth: getMediaUrlAuth(),
			download: true,
		}),
	fetch: async () => ({
		items: (props.call.files?.[EngineCallFileType.FileTypeAudio] ??
			[]) as unknown as ExportedItem[],
		next: false,
	}),
	filename: 'history-record',
});

const wavesurferComponentRef = ref<InstanceType<typeof Wavesurfer> | null>(
	null,
);
const player = computed(() => wavesurferComponentRef.value?.waveSurfer ?? null);
const getPlayer = () => player.value;

const isLoading = ref(true);
const loadProgress = ref(0);
const isRecordingDeleted = ref(false);
const playbackRate = ref(1);

const { regionsPlugin, timelinePlugin, waveOptions } =
	useCallWavePlugins(getPlayer);

const {
	zoomInDisabled,
	zoomOutDisabled,
	resetZoom,
	increaseZoom,
	decreaseZoom,
	syncZoomValue,
	attachTimelineSync,
	detachTimelineSync,
} = useCallWaveZoom(getPlayer, timelinePlugin);

const {
	volumeLeftGain,
	volumeRightGain,
	isPlaying,
	leftGain,
	rightGain,
	initChannelAudioGraph,
	destroyChannelAudio,
	onLoad,
	changedPlaying,
	playPause,
	volumeLeftChangeHandler,
	volumeRightChangeHandler,
} = useCallWaveSound(getPlayer);

const isMono = computed(() => rightGain.disabled);

function toggleRate(rate: number) {
	playbackRate.value = playbackRate.value === rate ? 1 : rate;
	player.value?.setPlaybackRate(playbackRate.value, true);
}

function seekTo(seconds: number) {
	player.value?.setTime(seconds);
}

const regions = useCallWaveRegions({
	regionsPlugin,
	getPlayer,
	call: toRef(props, 'call'),
});
const {
	showHolds,
	showComments,
	rangeEditComment,
	isRangeChanged,
	toggleHolds,
	toggleComments,
	renderHoldsLayer,
	attachDraftSelection,
	clearDraftSelectionRegions,
	updateDraftSelectionRange,
	setCommentHighlight,
	stopRangeEdit,
} = regions;

const {
	newComment,
	isAddingComment,
	isRangeSaving,
	deleteConfirmation,
	getCallDurationSec,
	openAddNote,
	closeAddNote,
	addComment,
	saveCommentNote,
	startCommentRangeEdit,
	saveCommentRange,
	askCommentDeleteConfirmation,
	resetCommentActions,
} = useCallWaveComments({
	callId: props.call.id,
	currentFileId,
	annotations: allAnnotations,
	updateAnnotations: (updatedAnnotations) =>
		emit('update:annotations', updatedAnnotations),
	getPlayer,
	regions,
});
const {
	isVisible: isDeleteConfirmationShown,
	deleteCount,
	deleteCallback,
	closeDelete,
} = deleteConfirmation;

const { layout, durationSec } = useWaveformLayout(getPlayer);
const { markers } = useCallWaveCommentMarkers(layout, annotations);
const { markers: holdMarkers } = useCallWaveHoldMarkers({
	call: toRef(props, 'call'),
	layout,
	durationSec,
	showHolds: computed(() => showHolds.value && !rangeEditComment.value),
});

const showCommentMarkers = computed(
	() => showComments.value && !!commentsSize.value && !rangeEditComment.value,
);

// The markers overlay is laid out per channel, so it follows the waveform height.
const waveHeight = `${WAVE_HEIGHT}px`;

// Stereo: avatars hang just under the top channel, their arrow pointing at the channel border.
const commentMarkerTopPx = computed(() =>
	isMono.value
		? WAVE_HEIGHT - COMMENT_MARKER_SIZE_PX
		: WAVE_HEIGHT + MARKER_GAP_PX,
);

watch(currentFileId, resetCommentActions);

const stopListeningToPlayer: Array<() => void> = [];

function showProgress(progress: string | number) {
	isLoading.value = true;
	loadProgress.value = +progress;
}

function hideProgress() {
	loadProgress.value = 0;
	isLoading.value = false;
}

async function onReady() {
	onLoad();
	initChannelAudioGraph();
	// Loading another file resets the media element speed, while the chosen rate stays highlighted.
	player.value?.setPlaybackRate(playbackRate.value, true);
	hideProgress();
	// Loading UI toggles in the same tick as `ready`; wait so layout matches before `reRender()`.
	await nextTick();
	resetZoom();
	renderHoldsLayer();
}

function listenToPlayer(waveSurfer: WaveSurfer) {
	stopListeningToPlayer.push(
		waveSurfer.on('pause', changedPlaying),
		waveSurfer.on('finish', changedPlaying),
		waveSurfer.on('play', changedPlaying),
		waveSurfer.on('load', () => {
			isRecordingDeleted.value = false;
		}),
		waveSurfer.on('loading', showProgress),
		waveSurfer.on('ready', onReady),
		waveSurfer.on('destroy', hideProgress),
		// The recording is listed on the call, so a failed load means the file is gone from storage.
		waveSurfer.on('error', () => {
			hideProgress();
			isRecordingDeleted.value = true;
		}),
		waveSurfer.on('zoom', syncZoomValue),
		waveSurfer.on('timeupdate', (currentTime) =>
			emit('timeupdate', currentTime),
		),
		// A click moves the cursor: the next note starts there, not at an old selection.
		waveSurfer.on('interaction', () => {
			if (!newComment.value) {
				clearDraftSelectionRegions();
			}
		}),
		attachDraftSelection(),
	);
	attachTimelineSync();
}

// `wavesurfer.vue` creates the player once and reloads it on `src` change, so listeners are attached once.
watch(
	player,
	(waveSurfer) => {
		if (waveSurfer && !stopListeningToPlayer.length) {
			listenToPlayer(waveSurfer);
		}
	},
	{
		immediate: true,
	},
);

defineExpose({
	seekTo,
});

onBeforeUnmount(async () => {
	stopListeningToPlayer.forEach((stopListening) => {
		stopListening();
	});
	detachTimelineSync();
	await destroyChannelAudio();
});
</script>

<style scoped>
.call-wave-page {
  --wave-height: v-bind(waveHeight);
}

.call-wave-page .call-wave-page-main {
  display: flex;
  flex-direction: column;
}

.call-wave-page .call-wave-data--grid {
  display: grid;
  grid-template-columns: calc(var(--icon-md-size) + 2 * var(--spacing-sm)) 1fr;
  grid-template-rows: repeat(2, auto);
}

/* One volume control per channel, centered on its waveform row. */
.call-wave-page .call-wave-data--grid .call-wave-data-legs-actions {
  display: grid;
  grid-auto-rows: var(--wave-height);
  place-items: center;
  align-content: start;
}

.call-wave-page .call-wave-data--grid .call-wave-data-plugin {
  position: relative;
  min-width: 0;
  overflow: visible;
}

.call-wave-page .call-wave-data--grid .call-wave-data-plugin .call-wave-wave-wrap {
  position: relative;
  display: block;
  min-width: 0;
}

.call-wave-page .call-wave-data--grid .call-wave-data-plugin .wavesurfer-mount {
  min-width: 0;
  width: 100%;
  max-width: 100%;
}

.call-wave-page .call-wave-data--grid .call-wave-data-plugin .call-wave-markers {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-rows: repeat(2, var(--wave-height));
  pointer-events: none;
}

.call-wave-page .call-wave-data--grid .call-wave-data-plugin .call-wave-wave-wrap--mono .call-wave-markers {
  grid-template-rows: var(--wave-height);
}

/* Channel names sit at the outer edges: the top one above its wave, the bottom one below. */
.call-wave-page .call-wave-data--grid .call-wave-data-plugin .call-wave-markers__top-channel {
  align-self: start;
  justify-self: start;
  margin: var(--spacing-xs) 0 0 var(--spacing-xs);
}

.call-wave-page .call-wave-data--grid .call-wave-data-plugin .call-wave-markers__bottom-channel {
  align-self: end;
  justify-self: start;
  margin: 0 0 var(--spacing-xs) var(--spacing-xs);
}

:deep(.wavesurfer-mount > div)::part(timeline) {
  background-color: var(--call-visualization-surface-color);
}

:deep(.wavesurfer-mount > div)::part(timeline-notch) {
  border-left-color: var(--secondary-color);
}

:deep(.wavesurfer-mount > div)::part(region-handle) {
  top: 50%;
  width: var(--icon-md-size);
  height: var(--icon-md-size);
  border: none;
  background: var(--call-wave-comment-color);
  color: var(--call-wave-comment-foreground-color);
  transform: translateY(-50%);
}

:deep(.wavesurfer-mount > div)::part(region-handle-left) {
  left: calc(-1 * var(--icon-md-size));
  border-radius: var(--border-radius) 0 0 var(--border-radius);
}

:deep(.wavesurfer-mount > div)::part(region-handle-right) {
  right: calc(-1 * var(--icon-md-size));
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
}

/* Hover plugin animates opacity/transform and may briefly show x=0 on quick pointer leave/enter. */
:deep(.wavesurfer-mount > div)::part(hover),
:deep(.wavesurfer-mount > div)::part(hover-label) {
  transition: none !important;
}
</style>

