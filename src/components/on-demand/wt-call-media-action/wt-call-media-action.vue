<template>
	<wt-context-menu
		class="wt-call-media-action"
		:options="contextOptions"
		max-width="400px"
		@click="handleOptionSelect"
	>
		<template #activator="{ toggle }">
			<wt-icon-btn
				v-if="recordingFiles.length"
				:icon="isOwnFilePlaying ? 'stop' : activatorIcon"
				@click="toggle"
			/>
		</template>
		<template #option="{ text, id, icon: optionIcon }">
			<div class="wt-call-media-action__option">
				<wt-icon :icon="id === playingFileId ? 'stop' : optionIcon" />
				{{ text }}
			</div>
		</template>
	</wt-context-menu>
</template>

<script setup lang="ts">
import {
	EngineCallFile,
	EngineCallFileType,
} from '@webitel/api-services/gen/models';
import { computed } from 'vue';

interface Props {
	files: Partial<Record<EngineCallFileType, EngineCallFile[]>>;
	playingFileId?: string;
}

const props = withDefaults(defineProps<Props>(), {
	playingFileId: '',
});

const emit = defineEmits<{
	play: [
		file: EngineCallFile,
	];
	stop: [];
}>();

const recordingFiles = computed(() => [
	...(props.files[EngineCallFileType.FileTypeAudio] || []),
	...(props.files[EngineCallFileType.FileTypeVideo] || []),
]);

const activatorIcon = computed(() =>
	props.files[EngineCallFileType.FileTypeVideo] ? 'preview-tag-video' : 'play',
);

const isOwnFilePlaying = computed(() =>
	recordingFiles.value.some((file) => file.id === props.playingFileId),
);

const contextOptions = computed(() =>
	recordingFiles.value.map(({ name, id, mimeType, type }) => ({
		text: name,
		id,
		mimeType,
		type,
		icon: mimeType === 'video/mp4' ? 'preview-tag-video' : 'preview-tag-audio',
	})),
);

const handleOptionSelect = ({ option }: { option: EngineCallFile }) => {
	if (props.playingFileId === option.id) {
		emit('stop');
	} else {
		emit('play', option);
	}
};
</script>

<style lang="scss" scoped>
.wt-call-media-action__option {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}
</style>
