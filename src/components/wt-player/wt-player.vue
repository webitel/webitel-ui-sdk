<template>fff
	<media-player
		ref="player"
		class="wt-player"
		:class="`wt-player--position-${position}`"
		:src="src"
		:loop="loop"
		:autoplay="autoplay"
	>
		<media-provider></media-provider>
		<media-plyr-layout
			:controls="controls"
			:download="download"
			custom-icons
		>
			<wt-icon icon="plyr-airplay" slot="airplay-icon" />
			<wt-icon icon="plyr-captions-off" slot="captions-off-icon" />
			<wt-icon icon="plyr-captions-on" slot="captions-on-icon" />
			<wt-icon icon="plyr-download" slot="download-icon" />
			<wt-icon icon="plyr-enter-fullscreen" slot="enter-fullscreen-icon" />
			<wt-icon icon="plyr-pip" slot="enter-pip-icon" />
			<wt-icon icon="plyr-exit-fullscreen" slot="exit-fullscreen-icon" />
			<wt-icon icon="plyr-pip" slot="exit-pip-icon" />
			<wt-icon icon="plyr-fast-forward" slot="fast-forward-icon" />
			<wt-icon icon="plyr-muted" slot="muted-icon" />
			<wt-icon icon="plyr-pause" slot="pause-icon" />
			<wt-icon icon="plyr-play" slot="play-icon" />
			<wt-icon icon="plyr-restart" slot="restart-icon" />
			<wt-icon icon="plyr-rewind" slot="rewind-icon" />
			<wt-icon icon="plyr-settings" slot="settings-icon" />
			<wt-icon icon="plyr-volume" slot="volume-icon" />
		</media-plyr-layout>
	</media-player>
</template>

<script
	setup
	lang="ts"
>
import 'vidstack/bundle';

import type { PlyrControl } from 'vidstack';
import { computed, onMounted, watch } from 'vue';

import WtIcon from '../wt-icon/wt-icon.vue';

interface Props {
	/**
	 * Media source URL
	 * @type {string}
	 */
	src?: string;
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
	 * Hides duration display
	 * @type {boolean}
	 * @default false
	 */
	hideDuration?: boolean;
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
	 * Plyr-specific prop
	 * @type {boolean}
	 * @default true
	 */
	invertTime?: boolean; // todo
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
	closable?: boolean; // todo??
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
	hideDuration: false,
	download: () => (url: string) => url.replace('/stream', '/download'),
	resetOnEnd: false,
	invertTime: true,
	resetVolume: false,
	closable: true,
	position: 'sticky',
});

const emit = defineEmits<{
	initialized: []; // todo
	close: []; // todo
}>();

const controls = computed<PlyrControl[]>(() => {
	/**
	 * order matters!
	 */
	let baseControls: PlyrControl[] = [
		'play',
		'progress',
		'mute+volume',
		'download',
		'fullscreen',
		'settings',
	];
	if (props.hideDuration) {
		baseControls = baseControls.filter((control) => control !== 'duration');
	}
	if (!props.download) {
		baseControls = baseControls.filter((control) => control !== 'download');
	}
	return baseControls;
});

// todo??
watch(
	() => props.src,
	() => {
		// setupDownload();
	},
);
// todo??
watch(
	() => props.download,
	() => {
		// setupDownload();
	},
);

onMounted(() => {
	// this.setupPlayer();
});

async function setupPlayer() {
	// if (props.resetVolume) makeVolumeReset();
	// if (props.download) setupDownload();

	if (props.closable) appendCloseIcon();
	// emit('initialized', player.value);
}

// function makeVolumeReset() {
// 	if (player.value) {
// 		player.value.volume = 1;
// 		player.value.muted = false;
// 	}
// }

// function setupDownload() {
// 	if (!props.download) {
// 		setupPlayer();
// 	} else if (player.value) {
// 		if (typeof props.download === 'string') {
// 			player.value.download = props.download;
// 		} else if (typeof props.download === 'function') {
// 			player.value.download = props.download(props.src || '');
// 		}
// 	}
// }

function appendCloseIcon() {
	// Note: $refs would need to be accessed via template refs in Composition API
	// const plyrControls = playerRef.value?.plyr?.elements?.controls;
	// const closeIcon = closeIconRef.value?.$el;
	// if (plyrControls) {
	// 	plyrControls.append(closeIcon);
	// }
}
</script>

<style scoped>
.wt-player {
	bottom: 60px;
}

.wt-player--position-sticky {
	position: sticky;
	z-index: 2;
}

.wt-player--position-relative {
	position: relative;
	bottom: unset;
}

.wt-player--position-static {
	position: static;
}

.wt-player :deep(.plyr) {
	box-shadow: var(--elevation-10);
	border-radius: var(--border-radius);
	max-width: 100%;
}

.wt-player :deep(.plyr__controls > .plyr__control),
.wt-player :deep(.plyr__controls > .plyr__controls__item > .plyr__control) {
	padding: var(--plyr-controls-icon-padding);
}

.wt-player :deep(.plyr__controls > .plyr__control > svg),
.wt-player :deep(.plyr__controls > .plyr__controls__item > .plyr__control > svg) {
	width: var(--plyr-controls-icon-size);
	height: var(--plyr-controls-icon-size);
}

.wt-player :deep(.plyr__control--overlaid svg) {
	left: 0;
	/* reset plyr style for video "play" button icon */
}

.wt-player :deep(.plyr__progress input),
.wt-player :deep(.plyr__volume input) {
	cursor: pointer;
}

.wt-player :deep(.plyr__progress__buffer) {
	background: var(--wt-player-audio-progress-background);
}

.wt-player :deep(.plyr__progress input)::-webkit-slider-thumb,
.wt-player :deep(.plyr__volume input)::-webkit-slider-thumb {
	-webkit-appearance: none;
	transition: var(--transition);
	border: var(--wt-slider-border);
	border-radius: var(--wt-slider-pointer-radius);
	background: var(--wt-slider-pointer-background-color);
}

.wt-player :deep(.plyr__progress input)::-webkit-slider-runnable-track,
.wt-player :deep(.plyr__volume input)::-webkit-slider-runnable-track {
	-webkit-appearance: none;
}

.wt-player :deep(.plyr__progress input)::-moz-range-thumb,
.wt-player :deep(.plyr__volume input)::-moz-range-thumb {
	-moz-appearance: none;
	transition: var(--transition);
	border: var(--wt-slider-border);
	border-color: var(--wt-slider-pointer-border-color);
	border-radius: var(--wt-slider-pointer-radius);
	background: var(--wt-slider-pointer-background-color);
	width: var(--wt-slider-pointer-size);
	height: var(--wt-slider-pointer-size);
}

.wt-player :deep(.plyr__progress input)::-moz-range-track,
.wt-player :deep(.plyr__volume input)::-moz-range-track {
	-moz-appearance: none;
}

.wt-player :deep(.plyr__progress input)::-ms-thumb,
.wt-player :deep(.plyr__volume input)::-ms-thumb {
	appearance: none;
}

.wt-player :deep(.plyr__progress input)::-ms-track,
.wt-player :deep(.plyr__volume input)::-ms-track {
	appearance: none;
}
</style>
