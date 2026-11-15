import { isSafeUrlScheme } from '@webitel/ui-sdk/scripts';

// the sender picks the URL, so `javascript:` and `data:` must not reach an href or src
export const isSafeAttachmentUrl = (url?: string | null): url is string =>
	isSafeUrlScheme(url);

export const toSafeAttachmentUrl = (url?: string | null): string | undefined =>
	isSafeAttachmentUrl(url) ? url : undefined;
