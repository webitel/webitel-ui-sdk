<template>
  <wt-empty
    :image="image"
    :text="text"
  />
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import { computed, inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import CallRecordingWasDeleted from '../_internals/assets/call-recording-was-deleted.svg';
import CallRecordingWasDeletedDark from '../_internals/assets/call-recording-was-deleted-dark.svg';
import NoCallRecording from '../_internals/assets/no-call-recording.svg';
import NoCallRecordingDark from '../_internals/assets/no-call-recording-dark.svg';

const props = withDefaults(
	defineProps<{
		isDeleted?: boolean;
	}>(),
	{
		isDeleted: false,
	},
);

const { t } = useI18n();
const darkMode = inject<Ref<boolean>>('darkMode', ref(false));

const image = computed(() => {
	if (props.isDeleted) {
		return darkMode.value
			? CallRecordingWasDeletedDark
			: CallRecordingWasDeleted;
	}
	return darkMode.value ? NoCallRecordingDark : NoCallRecording;
});

const text = computed(() =>
	props.isDeleted
		? t('webitelUI.callVisualization.recordingDeleted')
		: t('webitelUI.callVisualization.noAudio'),
);
</script>
