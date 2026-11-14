import { isSafeUrlScheme } from '@webitel/ui-sdk/scripts';

/**
 * Whether an attachment URL may reach a sink: an `href`, an `<img src>`, a
 * player source, `window.open`. The sender picks the URL, so `javascript:`
 * and `data:` must not get there. Narrows the type for the caller.
 */
export const isSafeAttachmentUrl = (url?: string | null): url is string =>
	isSafeUrlScheme(url);

/** The URL when it is safe for a sink, otherwise `undefined`. */
export const toSafeAttachmentUrl = (url?: string | null): string | undefined =>
	isSafeAttachmentUrl(url) ? url : undefined;
