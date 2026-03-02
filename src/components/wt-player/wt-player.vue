<template>
	<media-player
		ref="player"
		class="wt-player"
		:class="`wt-player--position-${position}`"
		:src="normalizedSrc"
		:loop="loop"
		:autoplay="autoplay"
	>

		<media-provider />

		<media-controls-group class="controls-group">

			<play-button />
			<time-slider />
			<time-group :invertTime="props.invertTime" />
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
import type { MediaSrc, PlyrControl } from 'vidstack';
import { computed, onMounted, watch } from 'vue';

import TimeGroup from '../wt-vidstack-player/components/panels/media-controls-panel/components/time-group.vue';
import MuteButton from './src/components/buttons/mute-button.vue';
import PlayButton from './src/components/buttons/play-button.vue';
import TimeSlider from './src/components/sliders/time-slider.vue';
import VolumeSlider from './src/components/sliders/volume-slider.vue';

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
	 * Plyr-specific prop. Resets player position to start on file end.
	 * @type {boolean}
	 * @default false
	 */
	resetOnEnd?: boolean; // todo??
	/**
	 * Show media time like duration with countdown
	 * @type {boolean}
	 * @default true
	 */
	invertTime?: boolean; // todo
	/**
	 * Hide volume slider
	 * @type {boolean}
	 * @default false
	 */
	hideVolumeSlider?: boolean;
	/**
	 * Plyr is caching volume settings ("muted" too) so we could reset them at init
	 * @type {boolean}
	 * @default false
	 */
	resetVolume?: boolean; // todo??
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

	const type = handleVidstackUnsupportedAudioTypes(props.src.type);

	return {
		src: props.src.src,
		type,
	};
});

// https://github.com/vidstack/player/issues/1453
function handleVidstackUnsupportedAudioTypes(mimeType: string): AudioMimeType {
	const unsupportedTypes = [
		'audio/wav',
	];
	return unsupportedTypes.includes(mimeType)
		? 'audio/mp3'
		: (mimeType as AudioMimeType);
}

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
