<template>
	<media-player
		ref="player"
		class="wt-player"
		:class="`wt-player--position-${position}`"
		:src="src"
		:loop="loop"
		:autoplay="autoplay"
	>

		<media-provider />

    <media-controls-group class="controls-group">

		  <play-button />
      <time-slider />
      <time-group />
      <mute-button />
      <volume-slide />

      <media-button
        v-if="props.download"
        class="download-button"
        @click="setupDownload"
      >
        <wt-icon icon="plyr-download" size="sm" />
      </media-button>

      <media-button
        v-if="props.closable"
        class="close-button"
        @click="$emit('close')"
      >
        <wt-icon icon="close" size="sm" />
      </media-button>

    </media-controls-group>
	</media-player>
</template>

<script
	setup
	lang="ts"
>
import 'vidstack/bundle';

import type { PlyrControl, MediaSrc } from 'vidstack';
import { computed, onMounted, watch } from 'vue';

import WtIcon from '../wt-icon/wt-icon.vue';
import PlayButton from './src/components/buttons/play-button.vue';
import TimeSlider from './src/components/sliders/time-slider.vue';
import TimeGroup from '../wt-vidstack-player/components/panels/media-controls-panel/components/time-group.vue';
import MuteButton from './src/components/buttons/mute-button.vue';
import VolumeSlide from './src/components/sliders/volume-slide.vue';

interface Props {
	/**
	 * vidstack media src
	 * @type {MediaSrc}
	 */
	src?: MediaSrc;
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
	// if (props.closable) appendCloseIcon();
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
  width: 100%;
  max-width: 100%;
  box-shadow: var(--elevation-10);
  border-radius: var(--border-radius);
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

</style>
