import {
	isAudioSrc as vidstackNativeIsAudioCheck,
	isVideoSrc as vidstackNativeIsVideoCheck,
} from 'vidstack';
import { computed, toRef } from 'vue';

export const useVidstackSrc = ({ src, type, stream }) => {
	const srcRef = toRef(src);
	const typeRef = toRef(type);
	const streamRef = toRef(stream);

	const normalizedType = computed(() => {
		if (streamRef.value) return 'video/object';

		return typeRef.value || srcRef.value?.type;
	});

	const normalizedSrcValue = computed(() => {
		if (streamRef.value) return streamRef.value;

		const srcStr =
			typeof srcRef.value === 'string' ? srcRef.value : srcRef.value?.src;

		return srcStr?.replace('/download', '/stream'); // fixme https://webitel.atlassian.net/browse/WTEL-8723?focusedCommentId=733348
	});

	const normalizedSrcObject = computed(() => {
		return normalizeVidstackMediaSrc({
			src: normalizedSrcValue.value,
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
 *
 * vidstack doesn't recognize some audio/video types as audio/video,
 * so we need to normalize them to default audio/video formats
 *
 * for instance, type: "audio/wav" won't be recognized as audio by vidstack,
 * so we need to fallback it to "audio/mp3"
 */
export function normalizeVidstackMediaSrc({
	src,
	type,
}: {
	src: string | unknown; // "string" for url, "unknown" for JS objects like MediaStream or Blob
	type: string;
}) {
	// if vidstack parses src and type correctly, no need to normalize
	if (
		vidstackNativeIsAudioCheck({
			src,
			type,
		}) ||
		vidstackNativeIsVideoCheck({
			src,
			type,
		})
	) {
		return {
			src,
			type,
		};
	}

	// handle "video/object" or "audio/object" types
	if (
		isObjectSrcType({
			src,
			type,
		})
	) {
		return {
			src,
			type,
		};
	}

	// normalize to default audio format, if vidstack doesn't recognize this type as audio
	if (type?.includes('audio')) {
		return {
			src,
			type: 'audio/mp3',
		};
	}

	// normalize to default video format, if vidstack doesn't recognize this type as video
	if (type?.includes('video')) {
		return {
			src,
			type: 'video/mp4',
		};
	}

	// unknown. hz, ebites' sami
	return {
		src,
		type,
	};
}

/**
 * "video/object" or "audio/object" types represent JS objects like MediaStream or file Blob
 */
function isObjectSrcType({ type }: { src: unknown; type: string }) {
	return type?.includes('/object');
}
