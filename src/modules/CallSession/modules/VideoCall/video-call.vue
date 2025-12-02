<template>
  <wt-vidstack-player
    :stream="mainStream"
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
          :class="`video-call-receiver--${size}`"
          static
          autoplay
          muted
          class="receiver"
        />

        <div
          :class="`video-call__indicator--${size}`"
          class="video-call__indicator"
        >
          <recording-indicator
            v-if="props.recordings"
            :recording="props.recordings"
          />
        </div>
      </div>
    </template>

    <template #controls-panel>
      <video-call-controls-panel
        :recordings="props.recordings"
        :is-mic-muted="props.isMicMuted"
        :is-video-muted="props.isVideoMuted"
        :screenshot-status="props.screenshotStatus"
        :screenshot-is-loading="props.screenshotIsLoading"
        :screenshot-callback="props.screenshotCallback"
        :recordings-callback="props.recordingsCallback"
        :mic-callback="props.micCallback"
        :video-callback="props.videoCallback"
        :settings-callback="props.settingsCallback"
        :chat-callback="props.chatCallback"
        :hang-over-callback="props.hangOverCallback"
      />
    </template>
  </wt-vidstack-player>
</template>

<script setup lang="ts">
import {WtVidstackPlayer} from '@webitel/ui-sdk/components';
import {computed} from 'vue';

import {RecordingIndicator, VideoCallControlsPanel} from "../../../../components/wt-vidstack-player/components";
import {ScreenshotStatus} from '../../types';

interface Props {
  sender: MediaStream
  receiver: MediaStream
  isMicMuted: boolean
  isVideoMuted: boolean
  recordings?: boolean
  screenshotStatus?: ScreenshotStatus | null
  screenshotIsLoading?: boolean

  screenshotCallback?: () => void
  recordingsCallback?: () => void
  micCallback?: () => void
  videoCallback?: () => void
  settingsCallback?: () => void
  chatCallback?: () => void
  hangOverCallback?: () => void
}

const props = defineProps<Props>();

const mainStream = computed(() => props.receiver || props.sender)
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

  &-receiver {
    flex: 0 0 auto;

    &--sm {
      :deep(video) {
        border-radius: var(--p-player-cam-preview-sm-border-radius);
      }
      width: var(--p-player-cam-preview-sm-width);
      height: var(--p-player-cam-preview-sm-height);
      position: relative;
      right: 0;
      bottom: 0;
    }

    &--md {
      :deep(video) {
        border-radius: var(--p-player-cam-preview-md-border-radius);
      }
      width: var(--p-player-cam-preview-md-width);
      height: var(--p-player-cam-preview-md-height);
      position: relative;
      right: 0;
      bottom: 0;
    }

    &--lg {
      :deep(video) {
        border-radius: var(--p-player-cam-preview-lg-border-radius);
      }
      width: var(--p-player-cam-preview-lg-width);
      height: var(--p-player-cam-preview-lg-height);
      position: relative;
      right: 0;
      bottom: 0;
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
