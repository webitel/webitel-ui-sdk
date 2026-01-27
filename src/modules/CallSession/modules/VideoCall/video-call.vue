<template>
  <wt-vidstack-player
    :stream="mainStream"
    :static="props.static"
    :size="props.size"
    :class="[!props.static && `video-call-position--${props.position}`]"
    :username="props.username"
    :hide-video-display-panel="props.hideVideoDisplayPanel"
    class="video-call"
    hide-background
    autoplay
    @change-size="(payload) => emit('change-size', payload)"
  >
    <template #content="{ size: innerSize }">
      <slot name="content" :size="innerSize" />

      <slot v-if="!mainStream" name="overlay" :size="innerSize">
        <div class="video-call-overlay">
          <div
            v-if="props['receiver:stream'] && !props['receiver:video:enabled']"
            :class="[`video-call-receiver--${innerSize}`, innerSize === 'sm' ? 'typo-body-2' : 'typo-body-1']"
            class="video-call-receiver video-call-receiver--muted"
          >
            <wt-icon :size="receiverVideoMutedIconSizes[innerSize]" icon="video-cam-off--filled" />

            <span class="video-call-receiver-text">{{ t(`WebitelApplications.${WebitelApplications.MEET}.theCameraIsTurnedOff`) }}</span>
          </div>
        </div>
      </slot>

      <div
        :class="`video-call-content-wrapper--${innerSize}`"
        class="video-call-content-wrapper"
      >
        <screenshot-box
          :src="props['screenshot:src']"
          :size="innerSize"
          @zoom="emit(`action:${VideoCallAction.ZoomScreenshot}`)"
          @close="emit(`action:${VideoCallAction.CloseScreenshot}`)"
        />

        <template v-if="props['sender:stream'] && !props['sender:video:enabled']">
          <div
            :class="`video-call-sender--${innerSize}`"
            class="video-call-sender video-call-sender--muted"
          >
            <wt-icon :size="senderVideoMutedIconSizes[innerSize]" icon="video-cam-off--filled" />
          </div>
        </template>

        <template v-else-if="props['sender:stream'] && props['receiver:stream']">
          <wt-vidstack-player
            :stream="props['sender:stream']"
            :class="`video-call-sender--${innerSize}`"
            hide-video-display-panel
            hide-controls-panel
            static
            autoplay
            class="video-call-sender"
          />
        </template>
      </div>

      <div
        :class="`video-call__indicator--${innerSize}`"
        class="video-call__indicator"
      >
        <recording-indicator
          v-if="props.recordings"
          :recording="props.recordings"
        />
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
        :actions:settings:pressed="props['actions:settings:pressed']"
        :actions:settings:disabled="props['actions:settings:disabled']"
        :actions:chat:pressed="props['actions:chat:pressed']"
        @[VideoCallAction.Screenshot]="(payload, options) => emit(`action:${VideoCallAction.Screenshot}`, payload, options)"
        @[VideoCallAction.Recordings]="(payload, options) => emit(`action:${VideoCallAction.Recordings}`, payload, options)"
        @[VideoCallAction.Mic]="(payload, options) => emit(`action:${VideoCallAction.Mic}`, payload, options)"
        @[VideoCallAction.Video]="(payload, options) => emit(`action:${VideoCallAction.Video}`, payload, options)"
        @[VideoCallAction.Settings]="(payload, options) => emit(`action:${VideoCallAction.Settings}`, payload, options)"
        @[VideoCallAction.Chat]="(payload, options) => emit(`action:${VideoCallAction.Chat}`, payload, options)"
        @[VideoCallAction.Hangup]="(payload, options) => emit(`action:${VideoCallAction.Hangup}`, payload, options)"
      />
    </template>
  </wt-vidstack-player>
</template>

<script setup lang="ts">
import { WtVidstackPlayer } from '@webitel/ui-sdk/components';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { WtIcon } from '../../../../components';
import {
	RecordingIndicator,
	ScreenshotBox,
	VideoCallControlsPanel,
} from '../../../../components/wt-vidstack-player/components';
import { ComponentSize, WebitelApplications } from '../../../../enums';
import type { ResultCallbacks } from '../../../../types';
import type { ScreenshotStatus } from '../../types';
import type { VideoCallAction } from './enums/VideoCallAction.enum';

const props = withDefaults(
	defineProps<{
		'sender:stream'?: MediaStream | null;

		'sender:mic:enabled'?: boolean;
		'sender:mic:accessed'?: boolean;

		'sender:video:enabled'?: boolean;
		'sender:video:accessed'?: boolean;

		'receiver:stream'?: MediaStream | null;
		'receiver:mic:enabled'?: boolean;
		'receiver:video:enabled'?: boolean;

		'screenshot:status'?: ScreenshotStatus | null;
		'screenshot:loading'?: boolean;
		'screenshot:src'?: string;

		recordings?: boolean;

		static?: boolean;
		position?: 'left-bottom' | 'right-bottom' | 'center';
		size?: ComponentSize;
		hideVideoDisplayPanel?: boolean;
		resizable?: boolean;

		actions: VideoCallAction[];
		username?: string;

		'actions:settings:pressed'?: boolean;
		'actions:settings:disabled'?: boolean;
		'actions:chat:pressed'?: boolean;
	}>(),
	{
		position: 'right-bottom',
	},
);

const emit = defineEmits<{
	(
		e: `action:${typeof VideoCallAction.Screenshot}`,
		payload?: unknown,
		options?: ResultCallbacks,
	): void;
	(
		e: `action:${typeof VideoCallAction.Recordings}`,
		payload?: unknown,
		options?: ResultCallbacks,
	): void;
	(
		e: `action:${typeof VideoCallAction.Mic}`,
		payload?: unknown,
		options?: ResultCallbacks,
	): void;
	(
		e: `action:${typeof VideoCallAction.Video}`,
		payload?: unknown,
		options?: ResultCallbacks,
	): void;
	(
		e: `action:${typeof VideoCallAction.Settings}`,
		payload?: unknown,
		options?: ResultCallbacks,
	): void;
	(
		e: `action:${typeof VideoCallAction.Chat}`,
		payload?: unknown,
		options?: ResultCallbacks,
	): void;
	(
		e: `action:${typeof VideoCallAction.Hangup}`,
		payload?: unknown,
		options?: ResultCallbacks,
	): void;
	(e: `action:${typeof VideoCallAction.ZoomScreenshot}`): void;
	(e: `action:${typeof VideoCallAction.CloseScreenshot}`): void;
	(e: `change-size`, size: ComponentSize): void;
}>();

const { t } = useI18n();

const mainStream = computed(() => {
	if (!props['receiver:video:enabled']) return props['sender:stream'];

	return props['receiver:stream'] || props['sender:stream'];
});

const receiverVideoMutedIconSizes = {
	[ComponentSize.SM]: ComponentSize.MD,
	[ComponentSize.MD]: ComponentSize.LG,
	[ComponentSize.LG]: ComponentSize.XXL,
};

const senderVideoMutedIconSizes = {
	[ComponentSize.SM]: ComponentSize.MD,
	[ComponentSize.MD]: ComponentSize['4XL'],
	[ComponentSize.LG]: ComponentSize['8XL'],
};
</script>

<style scoped>
.video-call {
  flex: 0 0 auto;
}

.video-call-position--left-bottom.wt-vidstack-player--sm {
  left: var(--spacing-sm);
  bottom: var(--spacing-sm);
  top: unset;
}

.video-call-position--left-bottom.wt-vidstack-player--md {
  top: unset;
  left: var(--spacing-sm);
  bottom: var(--spacing-sm);
}

.video-call-position--right-bottom.wt-vidstack-player--sm {
  top: unset;
  right: var(--spacing-sm);
  bottom: var(--spacing-sm);
}

.video-call-position--right-bottom.wt-vidstack-player--md {
  top: unset;
  right: var(--spacing-sm);
  bottom: var(--spacing-sm);
}

.video-call-position--center.wt-vidstack-player {
  position: absolute;
  top: 50%;
  left: 50%;
  right: unset;
  bottom: unset;
  transform: translate(-50%, -50%);
}

.video-call-overlay {
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  background: var(--p-player-wrapper-background);
}

.video-call-content {
  height: 100%;
  padding: var(--p-player-counter-position-padding-sm);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}

.video-call-content--sm {
  padding-bottom: calc(var(--p-player-control-bar-sm-height) + var(--p-player-counter-position-padding-sm));
}

.video-call-content-wrapper {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: var(--p-player-control-bar-sm-gap);
}

.video-call-content-wrapper--sm {
  left: var(--p-player-counter-position-padding-sm);
  bottom: calc(var(--p-player-counter-position-padding-sm) + var(--p-player-control-bar-sm-height));
}

.video-call-content-wrapper--md {
  left: var(--p-player-counter-position-padding-md);
  bottom: var(--p-player-counter-position-padding-md);
}

.video-call-content-wrapper--lg {
  left: var(--p-player-counter-position-padding-lg);
  bottom: var(--p-player-counter-position-padding-lg);
}

.video-call-receiver {
  color: var(--p-player-wrapper-muted-color);
}

.video-call-receiver--sm .video-call-receiver-text {
  max-width: 73px;
}

.video-call-receiver--muted {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  align-items: center;
  justify-content: center;
}

.video-call-sender {
  flex: 0 0 auto;
}

.video-call-sender--muted {
  background: var(--p-player-wrapper-background);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid;
  border-color: var(--p-player-wrapper-border-color);
}

.video-call-sender--sm :deep(video) {
  border-radius: var(--p-player-cam-preview-sm-border-radius);
}

.video-call-sender--sm.video-call-sender--muted {
  border-radius: var(--p-player-cam-preview-sm-border-radius);
}

.video-call-sender--sm.video-call-receiver--muted {
  padding-bottom: var(--p-player-control-bar-sm-height);
}

.video-call-sender--sm {
  width: var(--p-player-cam-preview-sm-width);
  height: var(--p-player-cam-preview-sm-height);
  position: relative;
  right: 0;
  bottom: 0;
}

.video-call-sender--md :deep(video) {
  border-radius: var(--p-player-cam-preview-md-border-radius);
}

.video-call-sender--md.video-call-sender--muted {
  border-radius: var(--p-player-cam-preview-md-border-radius);
}

.video-call-sender--md {
  width: var(--p-player-cam-preview-md-width);
  height: var(--p-player-cam-preview-md-height);
  position: relative;
  right: 0;
  bottom: 0;
}

.video-call-sender--lg :deep(video) {
  border-radius: var(--p-player-cam-preview-lg-border-radius);
}

.video-call-sender--lg.video-call-sender--muted {
  border-radius: var(--p-player-cam-preview-lg-border-radius);
}

.video-call-sender--lg {
  width: var(--p-player-cam-preview-lg-width);
  height: var(--p-player-cam-preview-lg-height);
  position: relative;
  right: 0;
  bottom: 0;
}

.video-call__indicator {
  position: absolute;
  display: flex;
  align-items: end;
  justify-content: flex-end;
}

.video-call__indicator--sm {
  right: var(--p-player-counter-position-padding-sm);
  bottom: calc(var(--p-player-counter-position-padding-sm) + var(--p-player-control-bar-sm-height));
}

.video-call__indicator--md {
  right: var(--p-player-counter-position-padding-md);
  bottom: var(--p-player-counter-position-padding-md);
}

.video-call__indicator--lg {
  right: var(--p-player-counter-position-padding-lg);
  bottom: var(--p-player-counter-position-padding-lg);
}
</style>
