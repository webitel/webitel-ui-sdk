<template>
  <div
    class="wt-vidstack-player"
    :class="[
      props.resizable && `wt-vidstack-player--${size}`,
      props.static && 'wt-vidstack-player--static',
      props.hideBackground && 'wt-vidstack-player--hide-background'
    ]"
  >
    <media-player
      ref="player"
      :src="normalizedSrc"
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
        :hide-display-panel="props.hideDisplayPanel"
        :hide-controls-panel="props.hideControlsPanel"
        :closable="props.closable"
        :autoplay="props.autoplay"
        :title="props.title"
        :username="props.username"
        @close-player="emit('close')"
      >
        <template  #controls-panel>
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
import {computed, defineEmits, defineProps, provide, ref, useTemplateRef} from 'vue';

import {ComponentSize} from '../../enums';
import {VideoLayout} from "./components";

interface Props {
  src?: string | { src: string; type?: string };
  mime?: string;
  autoplay?: boolean;
  muted?: boolean;
  title?: string;
  username?: string;
  closable?: boolean;
  resizable?: boolean;
  static?: boolean;
  stream?: MediaStream
  size?: ComponentSize
  hideDisplayPanel?: boolean
  hideControlsPanel?: boolean
  hideBackground?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mime: 'video/mp4',
  autoplay: false,
  muted: false,
  title: '',
  username: '',
  closable: false,
  static: false,
  resizable: true,
});

const emit = defineEmits<{
  'close': [],
  'change-size': [ComponentSize],
}>()

const player = useTemplateRef<MediaPlayerElement>('player');
const size = ref(props.size || ComponentSize.SM);

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

  if (typeof props.src === 'string') {
    if (props.src.includes('media')) return 'audio/mp3';
    if (props.src.includes('mp3')) return 'audio/mp3';
    if (props.src.includes('ogg') || props.src.includes('oga')) return 'audio/ogg';
  }

  return 'video/mp4';
});

const normalizedSrc = computed(() => {
  if (props.stream) {
    return {src: props.stream, type: 'video/object'};
  }

  if (typeof props.src === 'string') {
    return {src: props.src, type: normalizedType.value};
  }

  return {
    src: props.src?.src || '',
    type: props.src?.type || normalizedType.value
  };
});

</script>

<style scoped lang="scss">
@use '../wt-popup/mixins.scss' as *;

.wt-vidstack-player {
  width: 100%;
  height: 100%;
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
    &:not(.wt-vidstack-player--static) {
      @include popup-wrapper;

      /** @author liza-pohranichna
      * need to use wt-popup styles for md size https://webitel.atlassian.net/browse/WTEL-7723 */

      .wt-vidstack-player__player {
        @include popup-container;

        position: relative;
        display: block;
        max-width: var(--p-player-wrapper-md-width);
        max-height: var(--p-player-wrapper-md-height);
        padding: 0;
        margin: 0;
        border-radius: var(--p-player-wrapper-md-border-radius);
        overflow: hidden;
        box-shadow: var(--elevation-10);
      }
    }

    .wt-vidstack-player__player {
      width: 100%;
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
      width: 100%;
      height: 100%;
    }
  }

  &--hide-background {
    &.wt-vidstack-player {
      &--md {
        background: none;
      }
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
