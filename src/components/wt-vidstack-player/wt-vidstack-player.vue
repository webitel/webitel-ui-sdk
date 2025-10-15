<template>
  <div
    class="wt-vidstack-player"
    :class="[
      `wt-vidstack-player--${size}`,
      `wt-player--position-${props.position}`,
      {'wt-popup' : size === ComponentSize.MD },
      {'wt-popup--size-md': size === ComponentSize.MD }
      ]"
  >
    <div> {{ playerSrc }} </div>
    <media-player
      ref="player"
      :src="playerSrc"
      class="wt-vidstack-player__player wt-popup__popup"
      cross-origin
      plays-inline
      @close="emit('close')"
      @change-size="changeSize"
    >
      <media-provider>
<!--        <source-->
<!--          src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4"-->
<!--          type="video/mp4"-->
<!--        />-->
<!--        <source-->
<!--          -->
<!--        />-->
      </media-provider>
      <video-layout
        :closable="props.closable"
        :autoplay="props.autoplay"
        :hide-duration="props.hideDuration"
        :title="props.title"
        :username="props.username"
        @close-player="emit('close')"
      />
    </media-player>
  </div>
</template>

<script setup lang="ts">
import 'vidstack/player';
import 'vidstack/player/ui';

import type { MediaPlayerElement } from 'vidstack/elements';
import { computed,defineEmits, defineProps, provide, ref, useTemplateRef } from 'vue';

import { ComponentSize } from '../../enums';
import VideoLayout from './components/layouts/video-layout.vue';

interface Props {
  src?: string | { src: string; type?: string };
  mime?: string;
  autoplay?: boolean;
  loop?: boolean;
  hideDuration?: boolean;
  download?: string | ((url: string) => string) | boolean;
  resetOnEnd?: boolean;
  invertTime?: boolean;
  resetVolume?: boolean;
  closable?: boolean;
  title?: string;
  username?: string;
  position: string;
  media?: { name?: string; poster?: string };
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: false,
  loop: false,
  hideDuration: false,
  download: (url: string) => url?.replace?.('/stream', '/download'),
  mime: 'video/mp4',
  resetOnEnd: false,
  invertTime: false,
  resetVolume: false,
  closable: false,
  position: 'static',
  media: () => ({}),
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const player = useTemplateRef<MediaPlayerElement>('player');
const size = ref('sm');

const changeSize = () => {
  size.value === ComponentSize.SM
  ? size.value = ComponentSize.MD
  : size.value = ComponentSize.SM;
}

// options: [sm, md], lg-size - fullscreen and not use in components styles @author liza-pohranichna
provide('size', { size, changeSize });


const normalizedType = computed(() => { // https://vidstack.io/docs/wc/player/core-concepts/loading/?styling=css#source-types
  if (props.mime) return props.mime;


  if (props.src.includes('media')) return 'audio/mp3';
  if (props.src.includes('mp4') || props.src.includes('m4v')) return 'video/mp4';
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


</script>

<style lang="scss">
@use './variables.scss';
@use '../wt-popup/popup.scss';
</style>

<style scoped lang="scss">
.wt-vidstack-player {
  transition: var(--transition);

  &--sm {
    position: fixed;
    right: var(--spacing-md);
    bottom: var(--spacing-md);
    max-width: var(--wt-player-width-sm);
    max-height: var(--wt-player-height-sm);
    z-index: 100;

    .wt-popup__popup {
      border-radius: var(--spacing-sm);
    }
  }

  &--md {
    // width and height get from wt-popup @author liza-pohranichna

    .wt-popup__popup {
      border-radius: var(--spacing-md);
    }
  }

  .wt-popup__popup {
    padding: 0;
    margin: 0;
  }
}


</style>
