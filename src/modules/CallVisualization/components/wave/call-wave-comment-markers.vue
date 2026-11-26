<template>
  <div class="call-wave-comment-markers">
    <div class="call-wave-comment-markers__wrapper">
      <button
        v-for="marker of markers"
        :key="marker.key"
        class="call-wave-comment-markers__avatar"
        :style="{ left: `${marker.leftPx}px`, top: `${topPx}px` }"
        type="button"
        @mouseenter="openCard(marker)"
        @mouseleave="scheduleCardClose"
        @focus="openCard(marker)"
        @blur="scheduleCardClose"
      >
        <wt-avatar
          :username="getCommentAuthorName(marker.comment)"
          size="sm"
        />
      </button>
    </div>

    <!-- Listeners on a plain element: @vue/compat drops listeners falling through to a component root. -->
    <div
      v-if="activeMarker"
      class="call-wave-comment-markers__card"
      :style="cardStyle"
      @mouseenter="cancelCardClose"
      @mouseleave="scheduleCardClose"
      @focusin="cancelCardClose"
    >
      <call-wave-comment-card
        :key="activeMarker.key"
        :comment="activeMarker.comment"
        :save-note-text="(note) => saveNoteText(activeMarker!.comment, note)"
        @edit-range="emit('edit-range', activeMarker.comment)"
        @delete="emit('delete', activeMarker.comment)"
        @editing-change="isCardEditing = $event"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { getCommentAuthorName } from '../../composables/useCallWaveAnnotations';
import type { CommentMarker } from '../../composables/useCallWaveCommentMarkers';
import { COMMENT_CARD_WIDTH_PX } from '../../composables/useCallWaveCommentMarkers';
import type { WaveAnnotation } from '../../types/callWave';
import CallWaveCommentCard from './call-wave-comment-card.vue';

const props = defineProps<{
	markers: CommentMarker[];
	topPx: number;
	visibleWidthPx: number;
	saveNoteText: (comment: WaveAnnotation, note: string) => Promise<boolean>;
}>();

const emit = defineEmits<{
	'active-change': [
		value: WaveAnnotation | null,
	];
	'edit-range': [
		value: WaveAnnotation,
	];
	delete: [
		value: WaveAnnotation,
	];
}>();

// Lets the pointer travel from an avatar to its card without closing it.
const CARD_CLOSE_DELAY_MS = 200;

const activeKey = ref<string | null>(null);
const isCardEditing = ref(false);
let closeTimer: ReturnType<typeof setTimeout> | null = null;

const activeMarker = computed(() =>
	props.markers.find((marker) => marker.key === activeKey.value),
);

// The card opens over its avatar, moved left only as much as needed to stay on the waveform.
const cardStyle = computed(() => {
	const lastCardLeftPx = Math.max(
		props.visibleWidthPx - COMMENT_CARD_WIDTH_PX,
		0,
	);
	const leftPx = Math.min(activeMarker.value?.leftPx ?? 0, lastCardLeftPx);
	return {
		left: `${leftPx}px`,
		top: `${props.topPx}px`,
	};
});

function cancelCardClose() {
	if (closeTimer) {
		clearTimeout(closeTimer);
		closeTimer = null;
	}
}

function closeCard() {
	cancelCardClose();
	if (!activeKey.value) {
		return;
	}
	activeKey.value = null;
	isCardEditing.value = false;
	emit('active-change', null);
}

function openCard(marker: CommentMarker) {
	cancelCardClose();
	if (isCardEditing.value || activeKey.value === marker.key) {
		return;
	}
	activeKey.value = marker.key;
	emit('active-change', marker.comment);
}

function scheduleCardClose() {
	cancelCardClose();
	closeTimer = setTimeout(() => {
		if (!isCardEditing.value) {
			closeCard();
		}
	}, CARD_CLOSE_DELAY_MS);
}

watch(activeMarker, (marker) => {
	if (activeKey.value && !marker) {
		closeCard();
	}
});

onBeforeUnmount(closeCard);
</script>

<style scoped>
.call-wave-comment-markers {
  position: absolute;
  inset: 0;
  pointer-events: none;
  /* Above the wavesurfer regions container (z-index: 5), so avatars get the pointer. */
  z-index: 6;
}

.call-wave-comment-markers__wrapper {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.call-wave-comment-markers__avatar {
  position: absolute;
  display: flex;
  /* Same as the card padding, so the avatar does not move when the card opens over it. */
  padding: var(--spacing-xs);
  border: none;
  border-radius: var(--call-wave-popover-border-radius);
  background: var(--wt-tooltip-background-color);
  box-shadow: var(--tooltip-elevation);
  cursor: pointer;
  pointer-events: auto;
}

.call-wave-comment-markers__avatar::before {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  border: var(--spacing-2xs) solid transparent;
  border-top: none;
  border-bottom-color: var(--wt-tooltip-background-color);
  transform: translateX(-50%);
}

.call-wave-comment-markers__card {
  position: absolute;
  pointer-events: auto;
}
</style>
