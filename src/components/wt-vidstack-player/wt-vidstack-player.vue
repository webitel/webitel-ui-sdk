<template>
  <div
    class="wt-vidstack-player"
    :class="[`wt-vidstack-player--${size}`]"
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
        :closable="props.closable"
        :autoplay="props.autoplay"
        :title="props.title"
        :username="props.username"
        :session="props.session"
        :screenshot-status="props.screenshotStatus"
        :mode="mode"
        @close-player="emit('close')"
        @close-session="emit('close-session')"
        @make-screenshot="emit('make-screenshot')"
        @toggle-record="emit('toggle-record')"
      />

    </media-player>
  </div>
</template>

<script setup lang="ts">
import 'vidstack/player';
import 'vidstack/player/ui';

import type { MediaPlayerElement } from 'vidstack/elements';
import {
  computed,
  defineEmits,
  defineProps,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  useTemplateRef
} from 'vue';

import {ComponentSize} from '../../enums';
import VideoLayout from './components/layouts/video-layout.vue';
import {ScreenshotStatus} from "./types/ScreenshotStatus";
import {WtVidstakPlayerControlsMode} from "./types/WtVidstackPlayerControlsMode";
import {WtVidstackPlayerSession} from "./types/WtVidstackPlayerSession";

interface Props {
  src: string | { src: string; type?: string };
  mime?: string;
  autoplay?: boolean;
  muted?: boolean;
  title?: string;
  username?: string;
  closable?: boolean;
  stream?: MediaStream
  mode: WtVidstakPlayerControlsMode;
  session?: WtVidstackPlayerSession
  screenshotStatus: ScreenshotStatus
}

const props = withDefaults(defineProps<Props>(), {
  mime: 'video/mp4',
  autoplay: false,
  muted: false,
  title: '',
  username: '',
  closable: false,
  mode: 'media',
});

const emit = defineEmits<{
  'close': [],
  'close-session': [],
  'make-screenshot': [],
  'toggle-record': [],
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
 * Binds the incoming MediaStream to the Vidstack player after mount.
 * A brief delay ensures the internal <video> element is ready before playback starts.
 */
onMounted(() => {
  if (player.value && props.mode === 'stream' && props.stream) {
    const videoEl = player.value.querySelector('video')

    videoEl.addEventListener("loadedmetadata", async () => {
      await videoEl.play().catch((err) => console.error('play error:', err))
    })

    if (videoEl.srcObject !== props.stream) {
      setTimeout(() => {
        videoEl.srcObject = props.stream ?? null
      }, 100)
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
      // Control bar sm height
      padding-bottom: 48px;
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
