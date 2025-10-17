<template>
  <div class="vidstack-wrapper">
    <media-player
      ref="playerEl"
      class="vidstack-player"
      :title="props.media?.name || 'Media File'"
      :src="playerSrc"
      crossorigin="anonymous"
      playsinline
      :poster="posterUrl"
      preload="metadata"
      @loaded-metadata="handleLoadedMetadata"
      @error="handleError"
      @play="handlePlay"
      @pause="handlePause"
      @ended="handleEnded"
    >
      <media-provider>
        <video  />
<!--        for audio-->
<!--        v-if="isVideo"-->
<!--        <audio v-else />-->
      </media-provider>

      <media-video-layout  />
<!--      for audio-->
<!--      v-if="isVideo"-->
<!--      <media-audio-layout v-else />-->
    </media-player>

    <div v-if="loading" class="vs-loader">Loading {{ progress }}%</div>
  </div>
</template>

<script setup lang="ts">
import 'vidstack/bundle';

import { ref, computed, onMounted, nextTick } from 'vue';

interface Props {
  src?: string | { src: string; type?: string };
  mime?: string;         // 'video/mp4' | 'audio/mpeg' | 'video/webm' ... (не 'audio')
  autoplay?: boolean;
  loop?: boolean;
  hideDuration?: boolean;
  download?: string | ((url: string) => string) | boolean;
  resetOnEnd?: boolean;
  invertTime?: boolean;
  resetVolume?: boolean;
  closable?: boolean;
  position?: 'sticky' | 'relative' | 'static';
  media?: { name?: string; poster?: string };
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: true,
  loop: false,
  hideDuration: false,
  download: (url: string) => url?.replace?.('/stream', '/download'),
  mime: 'video/mp4',
  resetOnEnd: false,
  invertTime: true,
  resetVolume: false,
  closable: true,
  position: 'sticky',
  media: () => ({}),
});

const playerEl = ref<HTMLElement | null>(null);
const player = ref<any>(null);
const loading = ref(false);
const progress = ref(0);

const posterUrl = computed(() => props.media?.poster || '');

const normalizedType = computed(() => {
  //check for show other types
  // const url = typeof props.src === 'string' ? props.src : props.src?.src;
  //
  // if (ext === 'media') return 'audio/mp3';
  // if (ext === 'mp4' || ext === 'm4v') return 'video/mp4';
  // if (ext === 'mp3') return 'audio/mp3';
  // if (ext === 'ogg' || ext === 'oga') return 'audio/ogg';

  return 'video/mp4';
});

const playerSrc = computed(() => {
  if (typeof props.src === 'string') {
    return { src: props.src, type: normalizedType.value };
  }
  return {
    src: props.src?.src || '',
    type: props.src?.type || normalizedType.value
  };
});

const isVideo = computed(() => normalizedType.value.startsWith('video'));

function handleLoadedMetadata() { loading.value = false; }
function handleError(err: any) { console.error('Player error:', err); loading.value = false; }
function handlePlay() {}
function handlePause() {}
function handleEnded() {}

onMounted(async () => {
  await nextTick();
  if (playerEl.value) {
    player.value = playerEl.value;
    player.value.autoplay = !!props.autoplay;
    player.value.loop = !!props.loop;
  }
});
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use '@webitel/styleguide/typography' as *;

.vidstack-wrapper {
  @extend %typo-body-2;
  bottom: 60px;

  &--position {
    &-sticky {
      position: sticky;
      z-index: 2;
    }

    &-relative {
      position: relative;
      bottom: unset;
    }

    &-static {
      position: static;
    }
  }
}

.vidstack-player {
  box-shadow: var(--elevation-10);
  border-radius: var(--border-radius);
  max-width: 100%; // prevents <video> container overflow

  :deep(media-player) {
    width: 100%;
    height: 100%;
  }

  // Vidstack Player styles will be applied automatically
  // You can customize specific components here if needed
}

.vs-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  z-index: 10;
}
</style>
