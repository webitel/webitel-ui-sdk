<template>
  <div
    class="wt-vidstack-player"
    :class="[`wt-vidstack-player--${size}`]"
  >
    <media-player
      ref="player"
      :src="playerSrc"
      :autoplay="props.autoplay"
      class="wt-vidstack-player__player"
      cross-origin
      plays-inline
      @close="emit('close')"
      @change-size="changeSize"
    >
      <media-provider></media-provider>
      <video-layout
        :closable="props.closable"
        :autoplay="props.autoplay"
        :title="props.title"
        :username="props.username"
        :session="props.session"
        :mode="mode"
        @close-player="emit('close')"
      />

    </media-player>
  </div>
</template>

<script setup lang="ts">
import 'vidstack/player';
import 'vidstack/player/ui';

import type { MediaPlayerElement } from 'vidstack/elements';
import {computed, defineEmits, defineProps, onMounted,provide, ref, useTemplateRef} from 'vue';

import {ComponentSize} from '../../enums';
import VideoLayout from './components/layouts/video-layout.vue';
import {WtVidstakPlayerControlsMode} from "./types/WtVidstackPlayerControlsMode";
import {WtVidstackPlayerSession} from "./types/WtVidstackPlayerSession";

interface Props {
  src: string | { src: string; type?: string };
  mime?: string;
  autoplay?: boolean;
  title?: string;
  username?: string;
  closable?: boolean;
  stream?: MediaStream
  mode: WtVidstakPlayerControlsMode;
  session?: WtVidstackPlayerSession
}

const props = withDefaults(defineProps<Props>(), {
  mime: 'video/mp4',
  autoplay: false,
  title: '',
  username: '',
  closable: false,
  position: 'static',
  media: () => ({}),
  mode: 'media',
});

const emit = defineEmits<{
  'close': [],
}>()

const player = useTemplateRef<MediaPlayerElement>('player');
const size = ref(ComponentSize.SM);

const changeSize = (value) => {
  size.value = value;
}

/** @author liza-pohranichna
 * options: [sm, md, lg]
 * lg-size is fullscreen
*/
provide('size', { size, changeSize });

const normalizedType = computed(() => { // https://vidstack.io/docs/wc/player/core-concepts/loading/?styling=css#source-types
  if (props.mime) return props.mime;


  if (props.src.includes('media')) return 'audio/mp3';
  if (props.src.includes('mp3')) return 'audio/mp3';
  if (props.src.includes('ogg') || props.src.includes('oga')) return 'audio/ogg';

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

/** @author @Oleksandr Palonnyi
 * Attach MediaStream to Vidstack player after mount.
 * A short delay ensures the internal <video> is ready before playback.
 */
onMounted(async () => {
  if (player.value && props.mode === 'stream') {
    setTimeout(async () => {
      const videoEl = player.value.querySelector('video')
      videoEl.srcObject = props.stream
      await videoEl.play().catch((err) => console.warn('play error:', err))
    }, 100)
  }
})
</script>

<style scoped lang="scss">
@use '../wt-popup/mixins.scss' as *;

.wt-vidstack-player {
  transition: var(--transition);

  .wt-vidstack-player__player {
    padding: 0;
    margin: 0;
  }

  &--sm {
    position: fixed;
    right: var(--spacing-md);
    bottom: var(--spacing-md);
    max-width: var(--p-player-wrapper-sm-width);
    max-height: var(--p-player-wrapper-sm-height);
    z-index: 100;
    border-radius: var(--p-player-wrapper-sm-border-radius);
    overflow: hidden;
  }

  &--md {
    @include popup-wrapper;
    /** @author liza-pohranichna
    * need to use wt-popup styles for md size https://webitel.atlassian.net/browse/WTEL-7723 */

    .wt-vidstack-player__player {
      @include popup-container;
      position: relative;
      max-width: var(--p-player-wrapper-md-width);
      padding: 0;
      border-radius: var(--p-player-wrapper-md-border-radius);
      overflow: hidden;
    }
  }

  &--lg {
    .wt-vidstack-player__player {
      display: flex;
      align-items: center;
    }
  }
}

media-player[data-hocus] { // hover or focus within https://vidstack.io/docs/wc/player/components/core/player/?styling=css#player.attrs
  .controls-group {
    opacity: 1;
  }

  .video-display-panel {
    background: var(--p-player-head-line-hover-background);

    :deep(.video-display-panel__controls) { // show panel buttons on hover
      opacity: 1;
    }
  }
}


</style>
