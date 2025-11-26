<template>
  <wt-vidstack-player
    :stream="props.receiver"
    class="video-call"
    autoplay
    muted
  >
    <template #content="{ size }">
      <div
        :class="`video-call-content--${size}`"
        class="video-call-content"
      >
        <wt-vidstack-player
          :stream="props.receiver"
          :resizable="false"
          :class="`video-call-sender--${size}`"
          static
          autoplay
          muted
          class="video-call-sender"
        />

        <div
          :class="`video-call__indicator--${size}`"
          class="video-call__indicator"
        >
          <record-indicator
            v-if="props.session.recordings"
            :recording="props.session.recordings"
          />
        </div>
      </div>
    </template>

    <template #controls-panel>
      <video-call-controls-panel
        :recordings="props.recordings"
        :is-mic-muted="props.isMicMuted"
        :is-video-muted="props.isVideoMuted"
        :is-call-started="props.isCallStarted"
        @make-screenshot="emit('make-screenshot')"
        @toggle-record="emit('toggle-record')"
        @toggle-settings="emit('toggle-settings')"
        @toggle-call="emit('toggle-call')"
        @toggle-mic="emit('toggle-mic')"
        @toggle-video="emit('toggle-video')"
      />
    </template>
  </wt-vidstack-player>
</template>

<script setup lang="ts">
import {WtVidstackPlayer} from '@webitel/ui-sdk/components';
import {defineEmits} from 'vue';

import {RecordIndicator, VideoCallControlsPanel} from "../../../../components/wt-vidstack-player/components";

interface Props {
  sender: MediaStream
  receiver: MediaStream
  isMicMuted: boolean
  isVideoMuted: boolean
  isCallStarted: boolean
  recordings: boolean
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'make-screenshot': [],
  'toggle-record': [],
  'toggle-settings': [],
  'toggle-call': [],
  'toggle-mic': [],
  'toggle-video': [],
}>()
</script>

<style lang="scss" scoped>
.video-call {

  &-content {
    height: 100%;
    padding: var(--p-player-counter-position-padding-sm);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: absolute;
    left: 0;
    top: 0;

    &--sm {
      position: relative;
    }
  }

  &-sender {
    flex: 0 0 auto;

    &--sm {
      :deep(video) {
        border-radius: var(--p-player-cam-preview-sm-border-radius);
      }
      width: var(--p-player-cam-preview-sm-width);
      height: var(--p-player-cam-preview-sm-height);
    }

    &--md {
      :deep(video) {
        border-radius: var(--p-player-cam-preview-md-border-radius);
      }
      width: var(--p-player-cam-preview-md-width);
      height: var(--p-player-cam-preview-md-height);
    }

    &--lg {
      :deep(video) {
        border-radius: var(--p-player-cam-preview-lg-border-radius);
      }
      width: var(--p-player-cam-preview-lg-width);
      height: var(--p-player-cam-preview-lg-height);
    }
  }

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
