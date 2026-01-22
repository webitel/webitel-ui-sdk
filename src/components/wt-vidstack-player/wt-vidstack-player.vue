<template>
  <div class="wt-vidstack-player" :class="[
    `wt-vidstack-player--${size}`,
    `wt-vidstack-player-video-object-fit--${props.videoObjectFit}`,
    fullscreen && `wt-vidstack-player--fullscreen`,
    stretch && `wt-vidstack-player--stretch`,
    props.static && 'wt-vidstack-player--static',
    props.hideBackground && 'wt-vidstack-player--hide-background'
  ]">
    <media-player ref="player" :src="normalizedSrc" :autoplay="props.autoplay" :muted="props.muted"
      class="wt-vidstack-player__player" cross-origin playsinline @close="emit('close')" @can-play="onCanPlay">
      <media-provider class="wt-vidstack-player__provider"></media-provider>

      <video-layout :hide-video-display-panel="props.hideVideoDisplayPanel"
        :hide-controls-panel="props.hideControlsPanel" :closable="props.closable" :autoplay="props.autoplay"
        :title="props.title" :username="props.username" :hide-expand="props.hideExpand" @close-player="emit('close')">
        <template #controls-panel>
          <slot name="controls-panel" :size="size" />
        </template>

        <template #content>
          <slot name="content" :size="size" />
        </template>
      </video-layout>

    </media-player>
  </div>
</template>

<script setup lang="ts">
import 'vidstack/player';
import 'vidstack/player/ui';

import type { MediaPlayerElement } from 'vidstack/elements';
import { computed, provide, ref, useTemplateRef } from 'vue';

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
	(ev.target as HTMLMediaElement)?.play();
};
</script>

<style scoped>
.wt-vidstack-player {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  transition: var(--transition);
  box-shadow: var(--elevation-10);
}

.wt-vidstack-player__player {
  padding: 0;
  margin: 0;
  width: 100%;
  position: relative;
  display: block;
}

.wt-vidstack-player__provider {
  height: 100%;
  display: block;
}

.wt-vidstack-player--sm {
  position: fixed;
  right: var(--spacing-md);
  bottom: var(--spacing-md);
  max-width: var(--p-player-wrapper-sm-width);
  max-height: var(--p-player-wrapper-sm-height);
  z-index: 10;
  border-radius: var(--p-player-wrapper-sm-border-radius);
  overflow: hidden;
  height: var(--p-player-wrapper-sm-height);
}

.wt-vidstack-player--sm .wt-vidstack-player__provider {
  padding-bottom: var(--p-player-control-bar-sm-height);
}

.wt-vidstack-player--md {
  border-radius: var(--p-player-wrapper-md-border-radius);
  overflow: hidden;
  flex: 0 0 auto;
  max-width: 100%;
  max-height: 100%;
}

.wt-vidstack-player--md.wt-vidstack-player--static {
  max-width: var(--p-player-wrapper-md-width);
  max-height: var(--p-player-wrapper-md-height);
}

.wt-vidstack-player--md .wt-vidstack-player__player {
  width: 100%;
  height: 100%;
  max-width: var(--p-player-wrapper-md-width);
  max-height: var(--p-player-wrapper-md-height);
  border-radius: var(--p-player-wrapper-md-border-radius);
  overflow: hidden;
}

/* @author liza-pohranichna
 * need to use wt-popup styles for md size https://webitel.atlassian.net/browse/WTEL-7723
 * Note: popup-wrapper and popup-container mixins removed - apply popup styles separately if needed
 */
.wt-vidstack-player--md:not(.wt-vidstack-player--static) {
  border-radius: 0;
  overflow: visible;
}

.wt-vidstack-player--lg {
  border-radius: var(--p-player-wrapper-lg-border-radius);
  overflow: hidden;
  z-index: 10;
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
  right: unset;
  bottom: unset;
  z-index: 1;
  flex: 0 0 auto;
}

.wt-vidstack-player--static .wt-vidstack-player__provider {
  padding: 0;
}

.wt-vidstack-player--static .wt-vidstack-player__player {
  margin: 0;
  width: 100%;
  height: 100%;
}

.wt-vidstack-player--stretch {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
}

.wt-vidstack-player--hide-background.wt-vidstack-player--md {
  background: none;
  pointer-events: none;
  z-index: calc(var(--p-galleria-mask-z-index) - 1);
}
</style>

<style scoped>
.wt-vidstack-player video {
  min-width: 0;
  width: 100%;
  height: 100%;
  background: var(--p-player-wrapper-background);
}

.wt-vidstack-player-video-object-fit--cover video {
  object-fit: cover;
}

.wt-vidstack-player-video-object-fit--contain video {
  object-fit: contain;
}
</style>
