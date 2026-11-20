import { computed, onBeforeUnmount, ref, watch } from 'vue';
import type WaveSurfer from 'wavesurfer.js';

export interface WaveformLayout {
	durationSec: number;
	waveformWidthPx: number;
	visibleWidthPx: number;
	scrollPx: number;
}

export const MARKER_GAP_PX = 4;

const LAYOUT_EVENTS = [
	'ready',
	'redraw',
	'zoom',
	'scroll',
	'resize',
] as const;

export function useWaveformLayout(
	getPlayer: () => WaveSurfer | null | undefined,
) {
	// WaveSurfer is not reactive: bumped on every player layout event, so the layout is read again.
	const layoutVersion = ref(0);
	let stopListening: Array<() => void> = [];

	const layout = computed<WaveformLayout | null>(() => {
		void layoutVersion.value;
		const player = getPlayer();
		const durationSec = player?.getDuration();
		if (!player || !durationSec) {
			return null;
		}
		return {
			durationSec,
			waveformWidthPx: player.getWrapper().clientWidth,
			visibleWidthPx: player.getWidth(),
			scrollPx: player.getScroll(),
		};
	});

	// Changes only when another file is loaded, unlike `layout` that changes on every scroll.
	const durationSec = computed(() => layout.value?.durationSec ?? 0);

	function stopListeningToPlayer() {
		stopListening.forEach((stop) => {
			stop();
		});
		stopListening = [];
	}

	watch(
		getPlayer,
		(player) => {
			stopListeningToPlayer();
			if (!player) {
				return;
			}
			stopListening = LAYOUT_EVENTS.map((event) =>
				player.on(event, () => {
					layoutVersion.value += 1;
				}),
			);
			layoutVersion.value += 1;
		},
		{
			immediate: true,
		},
	);

	onBeforeUnmount(stopListeningToPlayer);

	return {
		layout,
		durationSec,
	};
}

export function secondsToVisiblePx(
	layout: WaveformLayout,
	seconds: number,
): number {
	const waveformPx = (seconds / layout.durationSec) * layout.waveformWidthPx;
	return waveformPx - layout.scrollPx;
}

export function spreadWithoutOverlap(
	sortedLeftPx: number[],
	sizePx: number,
	gapPx: number,
	maxLeftPx = Number.POSITIVE_INFINITY,
): number[] {
	const result: number[] = [];
	let previousItemEndPx = Number.NEGATIVE_INFINITY;

	for (const leftPx of sortedLeftPx) {
		const spreadLeftPx = Math.max(leftPx, previousItemEndPx);
		result.push(spreadLeftPx);
		previousItemEndPx = spreadLeftPx + sizePx + gapPx;
	}

	// Items piled up at the waveform end are moved back left, otherwise they are pushed out of view.
	let nextItemLeftPx = maxLeftPx + sizePx + gapPx;
	for (let index = result.length - 1; index >= 0; index -= 1) {
		result[index] = Math.min(result[index], nextItemLeftPx - sizePx - gapPx);
		nextItemLeftPx = result[index];
	}
	return result;
}

export function isInVisibleWaveform(
	layout: WaveformLayout,
	leftPx: number,
	sizePx: number,
): boolean {
	return leftPx > -sizePx && leftPx < layout.visibleWidthPx;
}
