import { computed, toRef } from 'vue';
import { isAudioSrc, isVideoSrc } from 'vidstack';

export const useVidstackSrc = ({ src, type, stream }) => {
	const srcRef = toRef(src);
	const typeRef = toRef(type);
	const streamRef = toRef(stream);

	const normalizedType = computed(() => {
		if (streamRef.value) return 'video/object';

		return typeRef.value || srcRef.value?.type;
	});

	const normalizedSrcString = computed(() => {
		if (streamRef.value) return streamRef.value;

		return typeof srcRef.value === 'string' ? srcRef.value : srcRef.value?.src;
	});

	const normalizedSrcObject = computed(() => {
		return normalizeVidstackMediaSrc({
			src: normalizedSrcString.value,
			type: normalizedType.value,
		});
	});

	return {
		normalizedSrcObject,
	};
};

/**
 * https://webitel.atlassian.net/browse/WTEL-8723?focusedCommentId=733255
 * https://github.com/vidstack/player/issues/1453
 */
export function normalizeVidstackMediaSrc({
	src: srcStr,
	type,
}: {
	src: string;
	type: string;
}) {
	if (
		isAudioSrc({
			src: srcStr,
			type,
		}) ||
		!isVideoSrc({
			src: srcStr,
			type,
		})
	) {
		return {
			src: srcStr,
			type,
		};
	}
	if (type.includes('audio') && !type.includes('object')) {
		return {
			src: srcStr,
			type: 'audio/mp3',
		};
	}

	if (type.includes('video') && !type.includes('object')) {
		return {
			src: srcStr,
			type: 'video/mp4',
		};
	}
}
