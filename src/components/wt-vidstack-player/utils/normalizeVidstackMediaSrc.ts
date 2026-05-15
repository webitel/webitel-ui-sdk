import {
	isAudioSrc as vidstackNativeIsAudioCheck,
	isVideoSrc as vidstackNativeIsVideoCheck,
} from 'vidstack';

export type SrcInput = {
	src: string | unknown; // "string" for url, "unknown" for JS objects like MediaStream or Blob
	type: string;
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
export function normalizeVidstackMediaSrc({ src, type }: SrcInput) {
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
 * Assume that the src and type are supported by vidstack
 * by normalizing its type and then re-checking it using vidstack's native check function
 */
export function assumeVidstackSupportedAudioType({ src, type }: SrcInput) {
	const normalizedSrc = normalizeVidstackMediaSrc({
		src,
		type,
	});

	return vidstackNativeIsAudioCheck(normalizedSrc);
}

/**
 * Assume that the src and type are supported by vidstack
 * by normalizing its type and then re-checking it using vidstack's native check function
 */
export function assumeVidstackSupportedVideoType({ src, type }: SrcInput) {
	const normalizedSrc = normalizeVidstackMediaSrc({
		src,
		type,
	});

	return vidstackNativeIsVideoCheck(normalizedSrc);
}

/**
 * "video/object" or "audio/object" types represent JS objects like MediaStream or file Blob
 */
function isObjectSrcType({ type }: SrcInput) {
	return type?.includes('/object');
}
