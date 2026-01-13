<template>
  <controls-group class="video-call-controls-panel">
    <wt-button
      v-if="shownActionsMap[VideoCallAction.Screenshot]"
      :loading="isScreenshotLoading"
      :size="buttonSizeMap[size]"
      :icon="screenShotIcon"
      variant="outlined"
      color="secondary"
      rounded
      contains-icon
      @click="onScreenshotClick"
    />

    <wt-button
      v-if="shownActionsMap[VideoCallAction.Recordings]"
      :size="buttonSizeMap[size]"
      :icon="recordIcon"
      variant="outlined"
      color="secondary"
      rounded
      contains-icon
      @click="emit(VideoCallAction.Recordings)"
    />

    <wt-button
      v-if="shownActionsMap[VideoCallAction.Mic]"
      :disabled="!props['mic:accessed']"
      :size="buttonSizeMap[size]"
      :icon="microphoneIcon"
      :badge="micBadge"
      badge-severity="error"
      variant="outlined"
      color="secondary"
      badge-absolute-position
      rounded
      contains-icon
      @click="emit(VideoCallAction.Mic)"
    />

    <wt-button
      v-if="shownActionsMap[VideoCallAction.Video]"
      :disabled="!props['video:accessed']"
      :size="buttonSizeMap[size]"
      :icon="videoCamIcon"
      :badge="videoBadge"
      badge-severity="error"
      variant="outlined"
      color="secondary"
      badge-absolute-position
      rounded
      contains-icon
      @click="emit(VideoCallAction.Video)"
    />

    <wt-button
      v-if="shownActionsMap[VideoCallAction.Settings]"
      :size="buttonSizeMap[size]"
      :variant="props['actions:settings:pressed'] ? 'active' : 'outlined'"
      :disabled="props['actions:settings:disabled']"
      icon="settings"
      color="secondary"
      rounded
      contains-icon
      @click="emit(VideoCallAction.Settings)"
    />

    <wt-button
      v-if="shownActionsMap[VideoCallAction.Chat]"
      :size="buttonSizeMap[size]"
      :variant="props['actions:chat:pressed'] ? 'active' : 'outlined'"
      icon="chat"
      color="secondary"
      rounded
      contains-icon
      @click="emit(VideoCallAction.Chat)"
    />

    <wt-button
      v-if="shownActionsMap[VideoCallAction.Hangup]"
      :size="buttonSizeMap[size]"
      icon="call-end--filled"
      color="error"
      rounded
      contains-icon
      @click="emit(VideoCallAction.Hangup)"
    />
  </controls-group>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue';

import { ControlsGroup } from '../../../../../components/wt-vidstack-player/components';
import { ComponentSize } from '../../../../../enums';
import { VideoCallAction } from '../../../../../modules/CallSession/modules/VideoCall/enums/VideoCallAction.enum';
import type { ScreenshotStatus } from '../../../../../modules/CallSession/types';
import type { ResultCallbacks } from '../../../../../types';

const props = defineProps<{
	actions: VideoCallAction[];

	'mic:enabled': boolean;
	'mic:accessed': boolean;
	'video:enabled': boolean;
	'video:accessed': boolean;
	'screenshot:status': ScreenshotStatus | null;
	'screenshot:loading': boolean;
	recordings: boolean;

	'actions:settings:pressed': boolean;
	'actions:settings:disabled': boolean;
	'actions:chat:pressed': boolean;
}>();

const emit = defineEmits<{
	(
		e: typeof VideoCallAction.Screenshot,
		payload?: unknown,
		options?: ResultCallbacks,
	): void;
	(
		e: typeof VideoCallAction.Recordings,
		payload?: unknown,
		options?: ResultCallbacks,
	): void;
	(
		e: typeof VideoCallAction.Mic,
		payload?: unknown,
		options?: ResultCallbacks,
	): void;
	(
		e: typeof VideoCallAction.Video,
		payload?: unknown,
		options?: ResultCallbacks,
	): void;
	(
		e: typeof VideoCallAction.Settings,
		payload?: unknown,
		options?: ResultCallbacks,
	): void;
	(
		e: typeof VideoCallAction.Chat,
		payload?: unknown,
		options?: ResultCallbacks,
	): void;
	(
		e: typeof VideoCallAction.Hangup,
		payload?: unknown,
		options?: ResultCallbacks,
	): void;
}>();

const { size } = inject('size') as { size: ComponentSize };

const shownActionsMap = computed(() => {
	return props.actions.reduce<Record<VideoCallAction, boolean>>(
		(acc, action) => {
			acc[action] = true;
			return acc;
		},
		{} as Record<VideoCallAction, boolean>,
	);
});

const microphoneIcon = computed(() => {
	if (!props['mic:accessed']) {
		return 'mic'; // todo
	}

	if (!props['mic:enabled']) {
		return 'mic-muted';
	}

	return 'mic';
});

const micBadge = computed(() => (!props['mic:accessed'] ? '!' : null));

const videoCamIcon = computed(() => {
	if (!props['video:accessed']) {
		return 'video-cam'; // todo
	}

	if (!props['video:enabled']) {
		return 'video-cam-off';
	}

	return 'video-cam';
});

const videoBadge = computed(() => (!props['video:accessed'] ? '!' : null));

const recordIcon = computed(() =>
	props.recordings ? 'record-stop' : 'record-start',
);

const screenShotIcon = computed(() => {
	switch (props['screenshot:status']) {
		case 'done':
			return 'screenshot-done';
		case 'error':
			return 'screenshot-false';
		default:
			return 'screenshot';
	}
});

const isScreenshotLoading = ref(false);

const onScreenshotClick = () => {
	isScreenshotLoading.value = true;
	emit(
		VideoCallAction.Screenshot,
		{},
		{
			onComplete: () => {
				isScreenshotLoading.value = false;
			},
		},
	);
};

const buttonSizeMap = {
	[ComponentSize.SM]: ComponentSize.SM,
	[ComponentSize.MD]: ComponentSize.MD,
	[ComponentSize.LG]: ComponentSize.MD,
};
</script>

<style scoped >.video-call-controls-panel {
position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
}</style>

