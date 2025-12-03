<template>
  <wt-vidstack-player
    :stream="mainStream"
    :static-position="props.position === 'static'"
    class="video-call"
    autoplay
    muted
  >
    <template #content="{ size }">
      <div
        :class="`video-call-content--${size}`"
        class="video-call-content"
      >
        <template v-if="props['receiver:stream'] && props['sender:video:enabled']">
          <div
            :class="`video-call-sender--${size}`"
            class="video-call-sender video-call-sender--muted"
          >
            <wt-icon :size="receiverVideoMutedIconSizes[size]" icon="video-cam-off--filled" />
          </div>
        </template>

        <template v-if="props['receiver:stream'] && props['receiver:video:enabled']">
          <div
            :class="`video-call-receiver--${size}`"
            class="video-call-receiver video-call-receiver--muted"
          >
            <wt-icon :size="receiverVideoMutedIconSizes[size]" icon="video-cam-off--filled" />
          </div>
        </template>

        <template v-else-if="props['receiver:stream']">
          <wt-vidstack-player
            :stream="props['receiver:stream']"
            :resizable="false"
            :class="`video-call-receiver--${size}`"
            hide-display-panel
            static-position
            autoplay
            muted
            class="video-call-receiver"
          />
        </template>

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
        :mic:enabled="props['sender:mic:enabled']"
        :mic:accessed="props['sender:mic:accessed']"
        :video:enabled="props['sender:video:enabled']"
        :video:accessed="props['sender:video:accessed']"
        :screenshot:status="props['screenshot:status']"
        :screenshot:loading="props['screenshot:loading']"
        :recordings="props.recordings"
        :actions="props.actions"
        @[VideoCallAction.Screenshot]="([payload, options] = []) => emit(`action:${VideoCallAction.Screenshot}`, payload, options)"
        @[VideoCallAction.Recordings]="([payload, options] = []) => emit(`action:${VideoCallAction.Recordings}`, payload, options)"
        @[VideoCallAction.Mic]="([payload, options] = []) => emit(`action:${VideoCallAction.Mic}`, payload, options)"
        @[VideoCallAction.Video]="([payload, options] = []) => emit(`action:${VideoCallAction.Video}`, payload, options)"
        @[VideoCallAction.Settings]="([payload, options] = []) => emit(`action:${VideoCallAction.Settings}`, payload, options)"
        @[VideoCallAction.Chat]="([payload, options] = []) => emit(`action:${VideoCallAction.Chat}`, payload, options)"
        @[VideoCallAction.Hangup]="([payload, options] = []) => emit(`action:${VideoCallAction.Hangup}`, payload, options)"
      />
    </template>
  </wt-vidstack-player>
</template>

<script setup lang="ts">
import {WtVidstackPlayer} from '@webitel/ui-sdk/components';
import {computed } from 'vue';

import {WtIcon} from "../../../../components";
import {RecordingIndicator, VideoCallControlsPanel} from "../../../../components/wt-vidstack-player/components";
import {ComponentSize} from "../../../../enums";
import {ScreenshotStatus} from '../../types';
import { ResultCallbacks } from '../../../../types';
import { VideoCallAction } from './enums/VideoCallAction.enum';

const props = defineProps<{
  'sender:stream'?: MediaStream | { src: string; type?: string } | null;
  
  'sender:mic:enabled'?: boolean;
  'sender:mic:accessed'?: boolean;
  
  'sender:video:enabled'?: boolean;
  'sender:video:accessed'?: boolean;
  
  'receiver:stream'?: MediaStream | { src: string; type?: string } | null;
  'receiver:mic:enabled'?: boolean;
  'receiver:video:enabled'?: boolean;
  
  'screenshot:status'?: ScreenshotStatus | null;
  'screenshot:loading'?: boolean;
  
  recordings?: boolean;

  position?: 'static' | 'left' | 'right';

  actions: VideoCallAction[];
}>();

const emit = defineEmits<{
  (e: `action:${typeof VideoCallAction.Screenshot}`, payload?: unknown, options?: ResultCallbacks): void;
  (e: `action:${typeof VideoCallAction.Recordings}`, payload?: unknown, options?: ResultCallbacks): void;
  (e: `action:${typeof VideoCallAction.Mic}`, payload?: unknown, options?: ResultCallbacks): void;
  (e: `action:${typeof VideoCallAction.Video}`, payload?: unknown, options?: ResultCallbacks): void;
  (e: `action:${typeof VideoCallAction.Settings}`, payload?: unknown, options?: ResultCallbacks): void;
  (e: `action:${typeof VideoCallAction.Chat}`, payload?: unknown, options?: ResultCallbacks): void;
  (e: `action:${typeof VideoCallAction.Hangup}`, payload?: unknown, options?: ResultCallbacks): void;
}>()


const mainStream = computed(() => {
  if (props['sender:video:enabled']) return null;

  return props['receiver:stream'] || props['sender:stream'];
})

const receiverVideoMutedIconSizes = {
  [ComponentSize.SM]: ComponentSize.MD,
  [ComponentSize.SM]: ComponentSize.LG,
  [ComponentSize.SM]: ComponentSize.XXL,
}

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
    background: var(--p-player-wrapper-background);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-receiver {
    flex: 0 0 auto;

    &--muted {
      background: var(--p-player-wrapper-background);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    &--sm {
      :deep(video) {
        border-radius: var(--p-player-cam-preview-sm-border-radius);
      }

      &.video-call-receiver--muted {
        border-radius: var(--p-player-cam-preview-sm-border-radius);
      }

      &.video-call-sender--muted {
        padding-bottom: var(--p-player-control-bar-sm-height);
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

      &.video-call-receiver--muted {
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

      &.video-call-receiver--muted {
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
