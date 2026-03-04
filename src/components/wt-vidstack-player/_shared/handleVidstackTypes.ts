export const vidstackSupportedTypes = [
	// @author ye.poranichna
	// https://vidstack.io/docs/wc/player/core-concepts/loading/?styling=css#source-types
	'video/mp4',
	'video/webm',
	'video/3gp',
	'video/ogg',
	'video/avi',
	'video/mpeg',
	'video/mp4',
	'audio/mpeg',
	'audio/ogg',
	'audio/3gp',
	'audio/mp4',
	'audio/webm',
	'audio/flac',
	'audio/object',
	'application/vnd.apple.mpegurl',
	'audio/mpegurl',
	'audio/x-mpegurl',
	'application/x-mpegurl',
	'video/x-mpegurl',
	'video/mpegurl',
	'application/mpegurl',
	'application/dash+xml',
];

/**
 * https://webitel.atlassian.net/browse/WTEL-8723?focusedCommentId=733255
 * https://github.com/vidstack/player/issues/1453
 */
export function handleVidstackUnsupportedTypes(mimeType: string) {
	const defaultMimeType = mimeType.includes('video')
		? 'video/mp4'
		: 'audio/mp3';

	return vidstackSupportedTypes.includes(mimeType) ? mimeType : defaultMimeType;
}
