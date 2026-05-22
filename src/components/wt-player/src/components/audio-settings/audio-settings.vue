<template>
	<wt-popover class="audio-settings">
		<template #activator="{ toggle }">
			<media-button class="audio-settings__button" @click="toggle">
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
import { ComponentSize } from '../../../../../enums';
import WtPopover from '../../../../wt-popover/wt-popover.vue';
import SpeedSettings from './components/speed-settings/speed-settings.vue';

export interface PlayerSettings {
	playbackRate: number;
}

interface Props {
	modelValue: PlayerSettings;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: () => ({
		playbackRate: 1,
	}),
});

const emit = defineEmits<{
	'update:modelValue': [
		value: PlayerSettings,
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
.audio-settings {
	display: flex;
}

.audio-settings__button {
	display: flex;
	align-items: center;
	cursor: pointer;
}
</style>
