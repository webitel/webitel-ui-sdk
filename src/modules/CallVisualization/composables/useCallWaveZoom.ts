// Zoom level state (px/s), zoom actions, and timeline label spacing synced to zoom.
import type { ComputedRef } from 'vue';
import { computed, ref } from 'vue';
import type WaveSurfer from 'wavesurfer.js';
import type TimelinePlugin from 'wavesurfer.js/plugins/timeline';

import { applyTimelineIntervals } from './timelineIntervals';
import { ZOOM_MAX_PX_PER_SEC } from './useCallWavePlugins';

type WaveSurferGetter = () => WaveSurfer | null | undefined;

const FIT_TOLERANCE = 1.01;

export function useCallWaveZoom(
	getPlayer: WaveSurferGetter,
	timelinePlugin?: TimelinePlugin,
) {
	const minPxPerSec = ref(0);
	// The whole recording fits the width: wavesurfer stretches it, so zooming out further changes nothing.
	const isFitted = ref(true);
	const unsubscribeFns: Array<() => void> = [];

	const zoomInDisabled: ComputedRef<boolean> = computed(
		() => minPxPerSec.value >= ZOOM_MAX_PX_PER_SEC,
	);
	const zoomOutDisabled: ComputedRef<boolean> = computed(() => isFitted.value);

	function syncTimelineIntervals(pxPerSec: number) {
		if (!timelinePlugin) {
			return;
		}
		applyTimelineIntervals(timelinePlugin, pxPerSec);
	}

	function naturalPxPerSec(): number {
		const waveSurfer = getPlayer();
		const duration = waveSurfer?.getDuration();
		const width = waveSurfer?.getWidth();
		if (!duration || !width) return 0;
		return width / duration;
	}

	// The waveform width can change by a pixel between zoom steps, so halving may stop just short of the fitted zoom.
	function fitsWidth(pxPerSec: number): boolean {
		return pxPerSec <= naturalPxPerSec() * FIT_TOLERANCE;
	}

	function zoomTo(pxPerSec: number) {
		const waveSurfer = getPlayer();
		if (!waveSurfer) {
			return;
		}
		syncTimelineIntervals(pxPerSec);
		waveSurfer.zoom(pxPerSec);
	}

	function resetZoom() {
		minPxPerSec.value = 0;
		isFitted.value = true;
		const natural = naturalPxPerSec();
		if (natural > 0) {
			zoomTo(natural);
		}
	}

	function increaseZoom() {
		const base = minPxPerSec.value || naturalPxPerSec();
		minPxPerSec.value = Math.min(base * 2, ZOOM_MAX_PX_PER_SEC);
		zoomTo(minPxPerSec.value);
	}

	function decreaseZoom() {
		const base = minPxPerSec.value || naturalPxPerSec();
		if (fitsWidth(base / 2)) {
			resetZoom();
			return;
		}
		minPxPerSec.value = base / 2;
		zoomTo(minPxPerSec.value);
	}

	function syncZoomValue(minPxPerSecFromWaveSurfer: number) {
		minPxPerSec.value = minPxPerSecFromWaveSurfer;
		isFitted.value = fitsWidth(minPxPerSecFromWaveSurfer);
	}

	// A fitted waveform keeps fitting a resized container, instead of overflowing it with the old zoom.
	function refitOnResize() {
		if (isFitted.value || fitsWidth(minPxPerSec.value)) {
			resetZoom();
		}
	}

	function attachTimelineSync() {
		const waveSurfer = getPlayer();
		if (!waveSurfer || !timelinePlugin) {
			return;
		}

		// `renderer.zoom()` redraws before the `zoom` event; re-render for wheel/pinch zoom.
		unsubscribeFns.push(
			waveSurfer.on('zoom', (pxPerSec) => {
				syncTimelineIntervals(pxPerSec);
				requestAnimationFrame(() => {
					getPlayer()?.getRenderer().reRender();
				});
			}),
			waveSurfer.on('resize', refitOnResize),
		);
	}

	function detachTimelineSync() {
		unsubscribeFns.forEach((unsubscribe) => {
			unsubscribe();
		});
		unsubscribeFns.length = 0;
	}

	return {
		minPxPerSec,
		zoomInDisabled,
		zoomOutDisabled,
		resetZoom,
		increaseZoom,
		decreaseZoom,
		syncZoomValue,
		attachTimelineSync,
		detachTimelineSync,
	};
}
