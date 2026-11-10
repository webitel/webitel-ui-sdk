import { isSafeUrlScheme } from '@webitel/ui-sdk/scripts';

/**
 * Whether an attachment URL may be handed to a sink — an `href`, an
 * `<img src>`, a player source or a `window.open` call.
 *
 * The backend passes the sender's `Document.url` / `Image.link` through, and
 * the operator's chat runs in an authenticated origin: `javascript:` would
 * execute there, and `data:` lets the sender choose both the bytes and the
 * file name of a download.
 *
 * The allow-list lives in `@webitel/ui-sdk` (WTEL-10888); this wrapper narrows
 * the type, so a checked URL reaches its sink without a cast.
 */
export const isSafeAttachmentUrl = (url?: string | null): url is string =>
	isSafeUrlScheme(url);
