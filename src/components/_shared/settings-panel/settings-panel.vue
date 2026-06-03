<template>
	<wt-popover class="settings-panel">
		<template #activator="{ toggle }">
			<media-button class="settings-panel__button" @click="toggle">
				<wt-icon-btn
					icon="plyr-settings"
					:size="ComponentSize.SM"
				/>
			</media-button>
		</template>

		<speed-settings
			:model-value="modelValue.playbackRate"
			@update:model-value="handlePlaybackRateUpdate"
		/>
	</wt-popover>
</template>

<script setup lang="ts">
import { ComponentSize } from '../../../enums';
import WtPopover from '../../wt-popover/wt-popover.vue';
import SpeedSettings from './components/speed-settings/speed-settings.vue';

export interface MediaSettings {
	playbackRate: number;
}

interface Props {
	modelValue: MediaSettings;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: () => ({
		playbackRate: 1,
	}),
});

const emit = defineEmits<{
	'update:modelValue': [
		value: MediaSettings,
	];
}>();

function handlePlaybackRateUpdate(playbackRate: number) {
	emit('update:modelValue', {
		...props.modelValue,
		playbackRate,
	});
}
</script>

<style scoped>
.settings-panel {
  display: flex;
}

/*
* @author @Oleksandr Palonnyi
*
* [WTEL-9163](https://webitel.atlassian.net/browse/WTEL-9163)
*
* comment link - https://webitel.atlassian.net/browse/WTEL-9163?focusedCommentId=759364
*/
.settings-panel__button {
	display: flex;
	align-items: center;
	cursor: pointer;
  margin: 0 calc(var(--spacing-2xs) * -1);
  padding: 0 var(--spacing-2xs);
}
</style>
