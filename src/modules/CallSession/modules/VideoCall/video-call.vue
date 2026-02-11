<template>
  <wt-vidstack-player
    :class="[!props.static && `video-call-position--${props.position}`]"
    :hide-video-display-panel="props.hideVideoDisplayPanel"
    :size="props.size"
    :stream="mainStream"
    :static="props.static"
    :username="props.username"
    autoplay
    class="video-call"
    hide-background
    @change-size="(payload) => emit('change-size', payload)"
  >
    <template #content="{ size: innerSize }">
      <slot :size="innerSize" name="content" />

      <slot v-if="!mainStream" :size="innerSize" name="overlay">
        <div class="video-call-overlay">
          <div
            v-if="showHoldOverlay"
            :class="[`video-call-receiver--${innerSize}`, innerSize === 'sm' ? 'typo-body-2' : 'typo-body-1']"
            class="video-call-receiver video-call-receiver--muted video-call-receiver--on-hold"
          >
            <wt-icon
              :size="receiverVideoMutedIconSizes[innerSize]"
              icon="pause--filled"
              color="warning"
            />

            <span class="video-call-receiver-text">
              {{ holdDurationTime }}
            </span>

            <span class="video-call-receiver-text">
              {{ t(`WtApplication.${WtApplication.Meet}.theCallIsOnHold`) }}
            </span>
          </div>

          <div
            v-else-if="showReceiverOverlay"
            :class="[`video-call-receiver--${innerSize}`, innerSize === 'sm' ? 'typo-body-2' : 'typo-body-1']"
            class="video-call-receiver video-call-receiver--muted"
          >
            <wt-icon
              :size="receiverVideoMutedIconSizes[innerSize]"
              icon="video-cam-off--filled"
            />

            <span class="video-call-receiver-text">{{
                t(`WtApplication.${WtApplication.Meet}.theCameraIsTurnedOff`)
              }}</span>
          </div>
        </div>
      </slot>

      <div
        :class="`video-call-content-wrapper--${innerSize}`"
        class="video-call-content-wrapper"
      >
        <screenshot-box
          :size="innerSize"
          :src="props['screenshot:src']"
          @close="emit(`action:${VideoCallAction.CloseScreenshot}`)"
          @zoom="emit(`action:${VideoCallAction.ZoomScreenshot}`)"
        />

        <template v-if="showSenderMutedScreen">
          <div
            :class="`video-call-sender--${innerSize}`"
            class="video-call-sender video-call-sender--muted"
          >
            <wt-icon
              :size="senderVideoMutedIconSizes[innerSize]"
              icon="video-cam-off--filled"
            />
          </div>
        </template>

        <template v-else-if="!isOnHold && props['sender:stream'] && props['receiver:stream']">
          <wt-vidstack-player
            :class="`video-call-sender--${innerSize}`"
            :stream="props['sender:stream']"
            autoplay
            class="video-call-sender"
            hide-controls-panel
            hide-video-display-panel
            static
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
        :actions="props.actions"
        :actions:chat:pressed="props['actions:chat:pressed']"
        :actions:settings:disabled="props['actions:settings:disabled']"
        :actions:settings:pressed="props['actions:settings:pressed']"
        :mic:accessed="props['sender:mic:accessed']"
        :mic:enabled="props['sender:mic:enabled']"
        :recordings="props.recordings"
        :screenshot:loading="props['screenshot:loading']"
        :screenshot:status="props['screenshot:status']"
        :video:accessed="props['sender:video:accessed']"
        :video:enabled="props['sender:video:enabled']"
        @[VideoCallAction.Recordings]="(payload, options) => emit(emitKeys[VideoCallAction.Recordings], payload, options)"
        @[VideoCallAction.Screenshot]="(payload, options) => emit(emitKeys[VideoCallAction.Screenshot], payload, options)"
        @[VideoCallAction.Mic]="(payload, options) => emit(emitKeys[VideoCallAction.Mic], payload, options)"
        @[VideoCallAction.Video]="(payload, options) => emit(emitKeys[VideoCallAction.Video], payload, options)"
        @[VideoCallAction.Settings]="(payload, options) => emit(emitKeys[VideoCallAction.Settings], payload, options)"
        @[VideoCallAction.Chat]="(payload, options) => emit(emitKeys[VideoCallAction.Chat], payload, options)"
        @[VideoCallAction.Hangup]="(payload, options) => emit(emitKeys[VideoCallAction.Hangup], payload, options)"
      />
    </template>
  </wt-vidstack-player>
</template>

<script
  setup
  lang="ts"
>
import { WtVidstackPlayer } from '@webitel/ui-sdk/components';
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { WtIcon } from '../../../../components';
import {
	RecordingIndicator,
	ScreenshotBox,
	VideoCallControlsPanel,
} from '../../../../components/wt-vidstack-player/components';
import { ComponentSize, WtApplication } from '../../../../enums';
import type { ResultCallbacks } from '../../../../types';
import type { ScreenshotStatus } from '../../types';
import convertDuration from '../../../../scripts/convertDuration';
import { VideoCallAction } from './enums/VideoCallAction.enum';

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

		'call:onHold'?: boolean;

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

/**
 * dont remove, coz biome reformats VideoCallAction import to "type"
 */
const emitKeys = {
	[VideoCallAction.Screenshot]: `action:${VideoCallAction.Screenshot}`,
	[VideoCallAction.Recordings]: `action:${VideoCallAction.Recordings}`,
	[VideoCallAction.Mic]: `action:${VideoCallAction.Mic}`,
	[VideoCallAction.Video]: `action:${VideoCallAction.Video}`,
	[VideoCallAction.Settings]: `action:${VideoCallAction.Settings}`,
	[VideoCallAction.Chat]: `action:${VideoCallAction.Chat}`,
	[VideoCallAction.Hangup]: `action:${VideoCallAction.Hangup}`,
};

const { t } = useI18n();

const receiverStream = computed(() => props['receiver:stream']);
const senderStream = computed(() => props['sender:stream']);

const receiverVideoEnabled = computed(() => props['receiver:video:enabled']);
const senderVideoEnabled = computed(() => props['sender:video:enabled']);
const isOnHold = computed(() => !!props['call:onHold']);

const holdSecondsElapsed = ref(0);
const holdTimerId = ref<number | null>(null);

const startHoldTimer = () => {
	holdSecondsElapsed.value = 0;
	stopHoldTimer();
	holdTimerId.value = window.setInterval(() => {
		holdSecondsElapsed.value++;
	}, 1000);
};

const stopHoldTimer = () => {
	if (holdTimerId.value !== null) {
		clearInterval(holdTimerId.value);
		holdTimerId.value = null;
	}
};

const bothStreamsAvailable = computed(
	() => !!receiverStream.value && !!senderStream.value,
);

const showReceiverOverlay = computed(
	() =>
		(!receiverStream.value &&
			senderStream.value &&
			!senderVideoEnabled.value) ||
		(receiverStream.value && !receiverVideoEnabled.value),
);

const showHoldOverlay = computed(() => isOnHold.value);

const holdDurationTime = computed(() =>
	convertDuration(holdSecondsElapsed.value),
);

const mainStream = computed(() => {
	if (isOnHold.value) {
		return null;
	}

	if (
		(bothStreamsAvailable.value && !receiverVideoEnabled.value) ||
		(!receiverStream.value && senderStream.value && !senderVideoEnabled.value)
	) {
		return null;
	}

	if (!receiverVideoEnabled.value) {
		return senderStream.value;
	}

	return receiverStream.value ?? senderStream.value;
});

const showSenderMutedScreen = computed(
	() =>
		!isOnHold.value &&
		bothStreamsAvailable.value &&
		!senderVideoEnabled.value &&
		!!receiverStream.value,
);

watch(
	isOnHold,
	(value) => {
		if (value) {
			startHoldTimer();
			return;
		}

		stopHoldTimer();
		holdSecondsElapsed.value = 0;
	},
	{
		immediate: true,
	},
);

onBeforeUnmount(() => {
	stopHoldTimer();
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
  top: unset;
  bottom: var(--spacing-sm);
  left: var(--spacing-sm);
}

.video-call-position--left-bottom.wt-vidstack-player--md {
  top: unset;
  bottom: var(--spacing-sm);
  left: var(--spacing-sm);
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
  right: unset;
  bottom: unset;
  left: 50%;
  transform: translate(-50%, -50%);
}

.video-call-overlay {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: var(--p-player-wrapper-background);
}

.video-call-content {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: var(--p-player-counter-position-padding-sm);
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
  bottom: calc(var(--p-player-counter-position-padding-sm) + var(--p-player-control-bar-sm-height));
  left: var(--p-player-counter-position-padding-sm);
}

.video-call-content-wrapper--md {
  bottom: var(--p-player-counter-position-padding-md);
  left: var(--p-player-counter-position-padding-md);
}

.video-call-content-wrapper--lg {
  bottom: var(--p-player-counter-position-padding-lg);
  left: var(--p-player-counter-position-padding-lg);
}

.video-call-receiver {
  color: var(--p-player-wrapper-muted-color);
}

.video-call-receiver--sm .video-call-receiver-text {
  max-width: 73px;
  text-align: center;
}

.video-call-receiver--muted {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: var(--spacing-xs);
}

.video-call-sender {
  flex: 0 0 auto;
}

.video-call-sender--muted {
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  border-color: var(--p-player-wrapper-border-color);
  background: var(--p-player-wrapper-background);
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

.video-call-sender.video-call-sender--sm {
  position: relative;
  right: 0;
  bottom: 0;
  width: var(--p-player-cam-preview-sm-width);
  height: var(--p-player-cam-preview-sm-height);
}

.video-call-sender--md :deep(video) {
  border-radius: var(--p-player-cam-preview-md-border-radius);
}

.video-call-sender--md.video-call-sender--muted {
  border-radius: var(--p-player-cam-preview-md-border-radius);
}

.video-call-sender.video-call-sender--md {
  position: relative;
  right: 0;
  bottom: 0;
  width: var(--p-player-cam-preview-md-width);
  height: var(--p-player-cam-preview-md-height);
}

.video-call-sender--lg :deep(video) {
  border-radius: var(--p-player-cam-preview-lg-border-radius);
}

.video-call-sender--lg.video-call-sender--muted {
  border-radius: var(--p-player-cam-preview-lg-border-radius);
}

.video-call-sender.video-call-sender--lg {
  position: relative;
  right: 0;
  bottom: 0;
  width: var(--p-player-cam-preview-lg-width);
  height: var(--p-player-cam-preview-lg-height);
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
