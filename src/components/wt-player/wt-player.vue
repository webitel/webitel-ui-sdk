<template>
	<media-player
		class="wt-player"
		:class="`wt-player--position-${props.position}`"
		:src="normalizedSrc"
		:loop="props.loop"
		:autoplay="autoplay"
    @ended="handleEnded"
	>

		<media-provider />

		<media-controls-group class="controls-group">

			<play-button />
			<time-slider />
			<time-group :countdown="props.countdownTimeMode" />
			<mute-button />
			<volume-slider v-if="!props.hideVolumeSlider" />

			<media-button
				v-if="props.download"
				class="download-button"
				@click="downloadMedia"
			>
				<wt-icon-btn
					icon="plyr-download"
					size="sm"
				/>
			</media-button>

			<media-button
				v-if="props.closable"
				class="close-button"
				@click="$emit('close')"
			>
				<wt-icon-btn
					icon="close"
					size="sm"
				/>
			</media-button>

		</media-controls-group>
	</media-player>
</template>

<script
	setup
	lang="ts"
>
import 'vidstack/bundle';
import type { MediaSrc } from 'vidstack';
import { computed } from 'vue';

import TimeGroup from '../wt-vidstack-player/components/panels/media-controls-panel/components/time-group.vue';
import MuteButton from './src/components/buttons/mute-button.vue';
import PlayButton from './src/components/buttons/play-button.vue';
import TimeSlider from './src/components/sliders/time-slider.vue';
import VolumeSlider from './src/components/sliders/volume-slider.vue';
import { handleVidstackUnsupportedTypes } from '../wt-vidstack-player/_shared/handleVidstackTypes';

interface Props {
	/**
	 * vidstack media src
	 * @type {MediaSrc}
	 */
	src?: MediaSrc;
	/**
	 * Media id
	 * @type {string}
	 */
	id?: string;
	/**
	 * Autoplay media on load
	 * @type {boolean}
	 * @default true
	 */
	autoplay?: boolean;
	/**
	 * Loop media playback
	 * @type {boolean}
	 * @default false
	 */
	loop?: boolean;
	/**
	 * Download button configuration. If false, no download button will be shown
	 * @type {string | Function | boolean}
	 * @default (url) => url.replace('/stream', '/download')
	 */
	download?: string | ((url: string) => string) | boolean;
	/**
	 * Resets player position to start after file has been played to the end
	 * @type {boolean}
	 * @default false
	 */
	resetOnEnd?: boolean;
	/**
	 * Show media time like duration with countdown. Example: "-00:12"
	 * @type {boolean}
	 * @default true
	 */
	countdownTimeMode?: boolean;
	/**
	 * Hide volume slider
	 * @type {boolean}
	 * @default false
	 */
	hideVolumeSlider?: boolean;
	/**
	 * Shows close button
	 * @type {boolean}
	 * @default true
	 */
	closable?: boolean;
	/**
	 * Player position
	 * @type {string}
	 * @default 'sticky'
	 */
	position?: string;
}

const props = withDefaults(defineProps<Props>(), {
	autoplay: true,
	loop: false,
	download: () => (url: string) => url.replace('/stream', '/download'),
	resetOnEnd: false,
	invertTime: true,
	hideVolumeSlider: false,
	resetVolume: false,
	closable: true,
	position: 'sticky',
});

const emit = defineEmits<{
	initialized: []; // is needed?
	close: [];
}>();
const normalizedSrc = computed(() => {
	if (!props.src?.type) return props.src;

	const type = handleVidstackUnsupportedTypes(props.src.type);

	return {
		src: props.src.src,
		type,
	};
});

function downloadMedia() {
	const src = typeof props.src === 'string' ? props.src : props.src?.src;

	const url =
		typeof props.download === 'function' ? props.download(src) : props.download;

	const ext = props.src?.type.split('/').pop();

	const filename = props.id || 'unknown';

	// download with [a] tag el
	const link = document.createElement('a');
	link.style.display = 'none';
	link.href = url;
	link.download = `${filename}.${ext}`;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

function handleEnded(event: Event) {
	if (!props.resetOnEnd) return;

	const player = event.target as HTMLMediaElement;
	player.currentTime = 0;
}
</script>

<style scoped>
.wt-player {
	width: auto;
	max-width: 100%;
	box-shadow: var(--elevation-10);
	border-radius: var(--border-radius);
	background: var(--wt-popup-background-color);
	z-index: 2;
}

.controls-group {
	padding: var(--spacing-sm);
	width: 100%;
	display: flex;
	justify-content: center;
	align-self: center;
	gap: var(--spacing-sm);
}

.close-button,
.download-button {
	display: flex;
	align-items: center;
	cursor: pointer;
}

.wt-player--position-fixed {
	position: fixed;
}

.wt-player--position-sticky {
	position: sticky;
}

.wt-player--position-relative {
	position: relative;
}

.wt-player--position-static {
	position: static;
}
</style>
