<template>
	<media-player
		class="wt-player"
		:class="`wt-player--position-${props.position}`"
		:src="normalizedSrcObject"
		:loop="props.loop"
		:autoplay="autoplay"
    :playback-rate="playbackRate"
    @ended="handleEnded"
	>

		<media-provider />

		<media-controls-group class="controls-group">

			<play-button />
			<time-slider />
			<time-group :countdown="props.countdownTimeMode" />
			<mute-button v-if="!props.hideMuteButton" />
			<volume-slider v-if="!props.hideVolumeSlider" />

			<wt-popover v-if="!props.hideSettings" class="settings-popover">
				<template #activator="{ toggle }">
					<media-button class="settings-button" @click="toggle">
						<wt-icon-btn
							icon="plyr-settings"
							:size="ComponentSize.SM"
						/>
					</media-button>
				</template>

				<speed-settings
					v-model:model-value="playbackRate"
				/>
			</wt-popover>

			<media-button
				v-if="props.download"
				class="download-button"
				@click="downloadMedia"
			>
				<wt-icon-btn
					icon="plyr-download"
					:size="ComponentSize.SM"
				/>
			</media-button>

			<media-button
				v-if="props.closable"
				class="close-button"
				@click="$emit('close')"
			>
				<wt-icon-btn
					icon="close"
					:size="ComponentSize.SM"
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
import { ref, toRefs, watch } from 'vue';
import { ComponentSize } from '../../enums';
import WtPopover from '../wt-popover/wt-popover.vue';
import TimeGroup from '../wt-vidstack-player/components/panels/playback-controls-panel/components/time-group.vue';
import { useVidstackSrc } from '../wt-vidstack-player/composables/useVidstackSrc';
import MuteButton from './src/components/buttons/mute-button.vue';
import PlayButton from './src/components/buttons/play-button.vue';
import TimeSlider from './src/components/sliders/time-slider.vue';
import VolumeSlider from './src/components/sliders/volume-slider.vue';
import SpeedSettings from './src/components/speed-settings/speed-settings.vue';

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
	 * Media name
	 * @type {string}
	 */
	fileName?: string;
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
	 * Hide mute button
	 * @type {boolean}
	 * @default false
	 */
	hideMuteButton?: boolean;
	/**
	 * Hide settings button
	 * @type {boolean}
	 * @default false
	 */
	hideSettings?: boolean;
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
	invertTime?: boolean;
	resetVolume?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	autoplay: true,
	loop: false,
	download: () => (url: string) => url.replace('/stream', '/download'),
	resetOnEnd: false,
	invertTime: true,
	hideVolumeSlider: false,
	hideMuteButton: false,
	hideSettings: false,
	resetVolume: false,
	closable: true,
	position: 'sticky',
});

const emit = defineEmits<{
	initialized: []; // is needed?
	close: [];
}>();

const playbackRate = ref(1);

const { src: srcRef } = toRefs(props);

const { normalizedSrcObject } = useVidstackSrc({
	src: srcRef,
});

function downloadMedia() {
	const src = typeof props.src === 'string' ? props.src : props.src?.src;

	const url =
		typeof props.download === 'function' ? props.download(src) : props.download;

	const ext = props.src?.type.split('/').pop();

	const filename = props.fileName || props.id || 'unknown';

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

function resetPlayerSettings() {
	playerSettings.value.playbackRate = 1;
}

watch(
	() => props.src,
	() => {
		resetPlayerSettings();
	},
);
</script>

<style scoped>
.wt-player {
	width: 100%;
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

.settings-popover {
  display: flex;
}

.close-button,
.download-button,
.settings-button {
	display: flex;
	align-items: center;
	cursor: pointer;
}

.wt-player--position-fixed {
  width: auto;
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
