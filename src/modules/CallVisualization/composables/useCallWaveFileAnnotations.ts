import { EngineCallFileType } from '@webitel/api-services/gen/models';
import type { ComputedRef, Ref } from 'vue';
import { computed } from 'vue';

import type { WaveAnnotation } from '../types/callWave';

interface AudioFileOption {
	id?: string;
	[key: string]: unknown;
}

interface UseCallWaveFileAnnotationsOptions {
	file: Readonly<
		Ref<{
			id?: string;
		}>
	>;
	fileOptions: ComputedRef<Record<string, AudioFileOption[]>>;
	allAnnotations: ComputedRef<WaveAnnotation[]>;
}

export function useCallWaveFileAnnotations({
	file,
	fileOptions,
	allAnnotations,
}: UseCallWaveFileAnnotationsOptions) {
	const audioFiles = computed<AudioFileOption[]>(
		() => fileOptions.value[EngineCallFileType.FileTypeAudio] || [],
	);

	const firstAudioFileId = computed(() => audioFiles.value?.[0]?.id);
	const currentFileId = computed(
		() => file.value?.id || firstAudioFileId.value,
	);

	const annotations = computed<WaveAnnotation[]>(() => {
		const selectedFileId = currentFileId.value;
		if (!allAnnotations.value?.length || !selectedFileId) {
			return [];
		}
		return allAnnotations.value.filter((annotation) => {
			if (annotation.fileId) {
				return annotation.fileId === selectedFileId;
			}
			return selectedFileId === firstAudioFileId.value;
		});
	});

	const commentsSize = computed(() => annotations.value.length);

	return {
		audioFiles,
		currentFileId,
		annotations,
		commentsSize,
	};
}
