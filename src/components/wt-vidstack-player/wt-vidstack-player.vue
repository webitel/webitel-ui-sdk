<template>
  <div
    class="wt-vidstack-player"
    :class="{[`wt-vidstack-player&#45;&#45;${size}`]: props.resizable}"
  >
    <media-player
      ref="player"
      :src="playerSrc"
      :autoplay="props.autoplay"
      :muted="props.muted"
      class="wt-vidstack-player__player"
      cross-origin
      plays-inline
      @close="emit('close')"
      @change-size="changeSize"
    >
      <media-provider
        class="wt-vidstack-player__provider"
      ></media-provider>

      <video-layout
        v-if="props.resizable"
        :closable="props.closable"
        :autoplay="props.autoplay"
        :title="props.title"
        :username="props.username"
        @close-player="emit('close')"
      >
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

import type {MediaPlayerElement} from 'vidstack/elements';
import {computed, defineEmits, defineProps, onBeforeUnmount, onMounted, provide, ref, useTemplateRef} from 'vue';

import {ComponentSize} from '../../enums';
import {VideoLayout} from "./components";

interface Props {
  src: string | { src: string; type?: string };
  mime?: string;
  autoplay?: boolean;
  muted?: boolean;
  title?: string;
  username?: string;
  closable?: boolean;
  resizable?: boolean;
  stream?: MediaStream
}

const props = withDefaults(defineProps<Props>(), {
  mime: 'video/mp4',
  autoplay: false,
  muted: false,
  title: '',
  username: '',
  closable: false,
  resizable: true,
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
provide('size', {size, changeSize});

const normalizedType = computed(() => { // https://vidstack.io/docs/wc/player/core-concepts/loading/?styling=css#source-types
  if (props.mime) return props.mime;


  if (props.src.includes('media')) return 'audio/mp3';
  if (props.src.includes('mp3')) return 'audio/mp3';
  if (props.src.includes('ogg') || props.src.includes('oga')) return 'audio/ogg';

  return 'video/mp4';
});

const playerSrc = computed(() => {
  if (typeof props.src === 'string') {
    return {src: props.src, type: normalizedType.value};
  }
  return {
    src: props.src?.src || '',
    type: props.src?.type || normalizedType.value
  };
});

/** @author @Oleksandr Palonnyi
 * Binds the incoming MediaStream to the Vidstack player after mount.
 * A brief delay ensures the internal <video> element is ready before playback starts.
 */
onMounted(() => {
  if (player.value && props.stream) {
    const videoEl = player.value.querySelector('video')

    videoEl.addEventListener("loadedmetadata", async () => {
      await videoEl.play().catch((err) => console.error('play error:', err))
    })

    if (videoEl.srcObject !== props.stream) {
      setTimeout(() => {
        videoEl.srcObject = props.stream ?? null
      }, 200)
    }
  }
})

onBeforeUnmount(() => {
  const videoEl = player.value.querySelector('video')
  if (videoEl && videoEl.srcObject) {
    videoEl.srcObject.getTracks().forEach(t => t.stop())
    videoEl.srcObject = null
  }
})
</script>

<style scoped lang="scss">
@use '../wt-popup/mixins.scss' as *;

.wt-vidstack-player {
  transition: var(--transition);

  &__player {
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
    box-shadow: var(--elevation-10);
    height: var(--p-player-wrapper-sm-height);

    .wt-vidstack-player__provider {
      display: block;
      height: 100%;
      padding-bottom: var(--p-player-control-bar-sm-height);
    }
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
    .wt-vidstack-player {
      &__player {
        display: flex;
        align-items: center;
      }

      &__provider {
        width: 100%;
        min-width: 0;
      }
    }
  }

  &--static {
    position: relative;
    right: unset;
    bottom: unset;

    .wt-vidstack-player__provider {
      padding: 0;
    }

    .wt-vidstack-player__player {
      margin: 0;
    }
  }
}
</style>

<style lang="scss">
.wt-vidstack-player {
  video {
    height: 100%;
    object-fit: contain;
    width: 100%;
    min-width: 0;
  }
}
</style>
