<template>
  <div
    :class="[
      `wt-vidstack-player--${size}`,
      `wt-vidstack-player-video-object-fit--${props.videoObjectFit}`,
      fullscreen && `wt-vidstack-player--fullscreen`,
      stretch && `wt-vidstack-player--stretch`,
      props.static && 'wt-vidstack-player--static',
      props.hideBackground && 'wt-vidstack-player--hide-background'
    ]" class="wt-vidstack-player"
  >
    <media-player
      ref="player"
      :autoplay="props.autoplay"
      :muted="props.muted"
      :src="normalizedSrc"
      class="wt-vidstack-player__player"
      cross-origin
      playsinline
      @close="emit('close')"
      @can-play="onCanPlay"
    >
      <media-provider class="wt-vidstack-player__provider"></media-provider>

      <video-layout
        :autoplay="props.autoplay"
        :closable="props.closable"
        :hide-controls-panel="props.hideControlsPanel"
        :hide-expand="props.hideExpand"
        :hide-video-display-panel="props.hideVideoDisplayPanel"
        :title="props.title"
        :username="props.username"
        @close-player="emit('close')"
      >
        <template #controls-panel>
          <slot :size="size" name="controls-panel" />
        </template>

        <template #content>
          <slot :size="size" name="content" />
        </template>
      </video-layout>

    </media-player>
  </div>
</template>

<script lang="ts" setup>
import 'vidstack/player';
import 'vidstack/player/ui';
import { computed, provide, ref } from 'vue';

import { ComponentSize } from '../../enums';
import { VideoLayout } from './components';

interface Props {
	src?:
		| string
		| {
				src: string;
				type?: string;
		  };
	mime?: string;
	autoplay?: boolean;
	muted?: boolean;
	title?: string;
	username?: string;
	closable?: boolean;
	static?: boolean;
	stream?: MediaStream;
	size?: ComponentSize;
	hideVideoDisplayPanel?: boolean;
	hideControlsPanel?: boolean;
	hideBackground?: boolean;
	hideExpand?: boolean;
	stretch?: boolean;
	videoObjectFit?: 'cover' | 'contain';
}

const props = withDefaults(defineProps<Props>(), {
	mime: 'video/mp4',
	autoplay: false,
	muted: true,
	title: '',
	username: '',
	closable: false,
	static: false,
	videoObjectFit: 'contain',
});

const emit = defineEmits<{
	close: [];
	'change-size': [
		ComponentSize,
	];
}>();

// const player = useTemplateRef<MediaPlayerElement>('player');
const size = ref(props.size || ComponentSize.SM);
const fullscreen = ref(false);

const changeSize = (value) => {
	size.value = value;
	emit('change-size', value);
};

/** @author liza-pohranichna
 * options: [sm, md, lg]
 */
provide('size', {
	size,
	fullscreen,
	changeSize,
});

const normalizedType = computed(() => {
	// https://vidstack.io/docs/wc/player/core-concepts/loading/?styling=css#source-types
	if (props.mime) return props.mime;

	if (typeof props.src === 'string') {
		if (props.src.includes('media')) return 'audio/mp3';
		if (props.src.includes('mp3')) return 'audio/mp3';
		if (props.src.includes('ogg') || props.src.includes('oga'))
			return 'audio/ogg';
	}

	return 'video/mp4';
});

const normalizedSrc = computed(() => {
	if (props.stream) {
		return {
			src: props.stream,
			type: 'video/object',
		};
	}

	if (typeof props.src === 'string') {
		return {
			src: props.src,
			type: normalizedType.value,
		};
	}

	return {
		src: props.src?.src || null,
		type: props.src?.type || normalizedType.value,
	};
});

const onCanPlay = (ev: Event) => {
	if (!props.autoplay) return;

	(ev.target as HTMLMediaElement)?.play();
};
</script>

<style scoped>
.wt-vidstack-player {
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  transition: var(--transition);
  box-shadow: var(--elevation-10);
}

.wt-vidstack-player__player {
  position: relative;
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
}

.wt-vidstack-player__provider {
  display: block;
  height: 100%;
}

.wt-vidstack-player--sm {
  position: fixed;
  z-index: 10;
  right: var(--spacing-md);
  bottom: var(--spacing-md);
  overflow: hidden;
  max-width: var(--p-player-wrapper-sm-width);
  height: var(--p-player-wrapper-sm-height);
  max-height: var(--p-player-wrapper-sm-height);
  border-radius: var(--p-player-wrapper-sm-border-radius);
}

.wt-vidstack-player--sm .wt-vidstack-player__provider {
  padding-bottom: var(--p-player-control-bar-sm-height);
}
.wt-vidstack-player--sm .wt-vidstack-player__player {
  height: 100%;
}

.wt-vidstack-player--md {
  overflow: hidden;
  flex: 0 0 auto;
  max-width: 100%;
  max-height: 100%;
  border-radius: var(--p-player-wrapper-md-border-radius);
}

.wt-vidstack-player--md.wt-vidstack-player--static {
  max-width: var(--p-player-wrapper-md-width);
  max-height: var(--p-player-wrapper-md-height);
}

.wt-vidstack-player--md .wt-vidstack-player__player {
  overflow: hidden;
  width: 100%;
  max-width: var(--p-player-wrapper-md-width);
  height: 100%;
  max-height: var(--p-player-wrapper-md-height);
  border-radius: var(--p-player-wrapper-md-border-radius);
}

/* @author liza-pohranichna
 * need to use wt-popup styles for md size https://webitel.atlassian.net/browse/WTEL-7723
 * Note: popup-wrapper and popup-container mixins removed - apply popup styles separately if needed
 */
.wt-vidstack-player--md:not(.wt-vidstack-player--static) {
  overflow: visible;
  border-radius: 0;
}

.wt-vidstack-player--lg {
  z-index: 10;
  overflow: hidden;
  border-radius: var(--p-player-wrapper-lg-border-radius);
}

.wt-vidstack-player--lg .wt-vidstack-player__player {
  display: flex;
  align-items: center;
}

.wt-vidstack-player--lg .wt-vidstack-player__provider {
  width: 100%;
  min-width: 0;
}

.wt-vidstack-player--fullscreen {
  border-radius: 0;
}

.wt-vidstack-player--static {
  position: relative;
  z-index: 1;
  right: unset;
  bottom: unset;
  flex: 0 0 auto;
}

.wt-vidstack-player--static .wt-vidstack-player__provider {
  padding: 0;
}

.wt-vidstack-player--static .wt-vidstack-player__player {
  width: 100%;
  height: 100%;
  margin: 0;
}

.wt-vidstack-player--stretch {
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
}

.wt-vidstack-player--hide-background.wt-vidstack-player--md {
  z-index: calc(var(--p-galleria-mask-z-index) - 1);
  pointer-events: none;
  background: none;
}

.wt-vidstack-player :deep(video) {
  width: 100%;
  min-width: 0;
  height: 100%;
  background: var(--p-player-wrapper-background);
}

.wt-vidstack-player-video-object-fit--cover :deep(video) {
  object-fit: cover;
}

.wt-vidstack-player-video-object-fit--contain :deep(video) {
  object-fit: contain;
}
</style>
