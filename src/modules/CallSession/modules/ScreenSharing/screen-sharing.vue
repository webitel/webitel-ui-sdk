<template>
  <wt-vidstack-player
    v-bind="attrs"
    class="screen-sharing"
    autoplay
    muted
    closable
  >
    <template #content="{ size }">
      <div
        :class="`screen-sharing__indicator--${size}`"
        class="screen-sharing__indicator"
      >
        <recording-indicator
          v-if="props.session.recordings"
          :recording="props.session.recordings"
        />
      </div>
    </template>

    <template #controls-panel>
      <screen-sharing-controls-panel
        :session="props.session"
        :screenshot-status="props.screenshotStatus"
        :screenshot-is-loading="props.screenshotIsLoading"
        @close-session="emit('close-session')"
        @make-screenshot="emit('make-screenshot')"
        @toggle-record="emit('toggle-record')"
      />
    </template>
  </wt-vidstack-player>
</template>

<script setup lang="ts">
import {WtVidstackPlayer} from '@webitel/ui-sdk/components';
import {defineEmits, useAttrs} from 'vue';

import {RecordingIndicator,ScreenSharingControlsPanel} from "../../../../components/wt-vidstack-player/components";
import {ScreenSharingSession, ScreenshotStatus} from '../../types';

interface Props {
  session: ScreenSharingSession
  screenshotStatus: ScreenshotStatus | null
  screenshotIsLoading: boolean
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'close-session': [],
  'make-screenshot': [],
  'toggle-record': [],
}>()

const attrs = useAttrs();
</script>

<style lang="scss" scoped>
.screen-sharing {

  &__indicator {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: end;
    justify-content: flex-end;
    padding: var(--p-player-counter-position-padding-sm);

    &--sm {
      position: relative;
    }

    &--md {
      right: var(--p-player-counter-position-padding-md);
      bottom: var(--p-player-counter-position-padding-md);
    }

    &--lg {
      right: var(--p-player-counter-position-padding-lg);
      bottom: var(--p-player-counter-position-padding-lg);
    }
  }
}
</style>
