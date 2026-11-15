import { isSafeUrlScheme } from '@webitel/ui-sdk/scripts';

// the sender picks the URL, so `javascript:` and `data:` must not reach an href or src
export const isSafeAttachmentUrl = (url?: string | null): url is string =>
	isSafeUrlScheme(url);

export const toSafeAttachmentUrl = (url?: string | null): string | undefined =>
	isSafeAttachmentUrl(url) ? url : undefined;

// Vidstack picks HLS / DASH by this extension whatever the MIME and loads the library from a CDN
const STREAM_MANIFEST_URL = /\.(m3u8|mpd)($|\?)/i;

export const isPlayableAttachmentUrl = (url?: string | null): url is string =>
	isSafeAttachmentUrl(url) && !STREAM_MANIFEST_URL.test(url);

export const toPlayableAttachmentUrl = (
	url?: string | null,
): string | undefined => (isPlayableAttachmentUrl(url) ? url : undefined);
