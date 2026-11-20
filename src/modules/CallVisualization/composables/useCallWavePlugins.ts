// Instantiates WaveSurfer plugins (regions, hover, timeline, zoom) and shared `waveOptions` for the player.
import type { Ref } from 'vue';
import { computed, inject, ref, watch } from 'vue';
import type WaveSurfer from 'wavesurfer.js';
import Hover from 'wavesurfer.js/plugins/hover';
import RegionsPlugin from 'wavesurfer.js/plugins/regions';
import Timeline from 'wavesurfer.js/plugins/timeline';
import ZoomPlugin from 'wavesurfer.js/plugins/zoom';
import { convertDuration } from '../../../scripts';

export const WAVE_HEIGHT = 96;
const TIMELINE_HEIGHT = 16;
export const ZOOM_MAX_PX_PER_SEC = 20000;

// wavesurfer renders to <canvas>, whose fillStyle can't resolve CSS `var(...)`,
// so we read the computed value of the styleguide color tokens instead.
function resolveCssColor(variable: string): string {
	return getComputedStyle(document.documentElement)
		.getPropertyValue(variable)
		.trim();
}

type PlayerGetter = () => WaveSurfer | null | undefined;

export function useCallWavePlugins(getPlayer?: PlayerGetter) {
	const darkMode = inject<Ref<boolean>>('darkMode', ref(false));

	const regionsPlugin = RegionsPlugin.create();
	const hoverPlugin = Hover.create({
		labelBackground: 'var(--contrast-color)',
		labelColor: 'var(--main-color)',
		formatTimeCallback: convertDuration,
	});
	// Timeline must live inside getWrapper() so its width matches the waveform; a light-DOM container is viewport-wide and clips ticks when zoomed/scrolled.
	const timelinePlugin = Timeline.create({
		height: TIMELINE_HEIGHT,
		formatTimeCallback: convertDuration,
		// Timeline sets its own font size; `inherit` takes the `typo-caption` font from the wavesurfer mount.
		style: {
			color: 'var(--text-main-color)',
			fontSize: 'inherit',
		},
	});
	const zoomPlugin = ZoomPlugin.create({
		scale: 0.5,
		deltaThreshold: 5,
		maxZoom: ZOOM_MAX_PX_PER_SEC,
		exponentialZooming: false,
	});

	// `darkMode` is read so the tokens re-resolve when the theme switches.
	const waveOptions = computed(() => {
		void darkMode.value;
		const waveColor = resolveCssColor('--call-wave-color');

		return {
			cursorWidth: 2,
			height: WAVE_HEIGHT,
			splitChannels: [
				{
					height: WAVE_HEIGHT,
					overlay: false,
					waveColor,
					progressColor: resolveCssColor('--call-wave-first-channel-color'),
				},
				{
					height: WAVE_HEIGHT,
					overlay: false,
					waveColor,
					progressColor: resolveCssColor('--call-wave-second-channel-color'),
				},
			],
			plugins: [
				hoverPlugin,
				timelinePlugin,
				regionsPlugin,
				zoomPlugin,
			],
		};
	});

	// Re-apply colors to the already-created player on theme change.
	watch(darkMode, () => getPlayer?.()?.setOptions(waveOptions.value));

	return {
		regionsPlugin,
		timelinePlugin,
		waveOptions,
	};
}
