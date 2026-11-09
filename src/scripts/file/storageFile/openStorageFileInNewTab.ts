import { isSafeUrl } from '../../isSafeUrl';
import { getStorageFileUrl } from './getStorageFileUrl';
import { saveBlobAsFile } from './saveBlobAsFile';

interface OpenStorageFileInNewTabParams {
	id?: string;
	/** Any storage URL — a media stream, for one. Takes precedence over `id`. */
	url?: string;
	/** File name for the download fallback. */
	name?: string;
}

/**
 * Exact types a browser renders without running author script. `text/html`
 * and `image/svg+xml` are absent on purpose: a `blob:` document inherits the
 * origin of the page that created it.
 */
const INLINE_SAFE_MIME_TYPES = new Set([
	'application/pdf',
	'image/png',
	'image/jpeg',
	'image/gif',
	'image/webp',
	'text/plain',
]);

/** Media families with no scriptable member. */
const INLINE_SAFE_MIME_PREFIXES = [
	'audio/',
	'video/',
];

/** The new tab needs the object URL to still resolve while it loads. */
const OBJECT_URL_TTL_MS = 60_000;

const isInlineSafeMimeType = (mimeType: string): boolean => {
	// a `Content-Type` may carry parameters: `text/plain; charset=utf-8`
	const type = mimeType.split(';')[0].trim().toLowerCase();

	if (INLINE_SAFE_MIME_TYPES.has(type)) return true;

	return INLINE_SAFE_MIME_PREFIXES.some((prefix) => type.startsWith(prefix));
};

/**
 * Opens a storage file in a new tab when its type is safe to render inline,
 * saves it to disk otherwise.
 */
export const openStorageFileInNewTab = async (
	item?: OpenStorageFileInNewTabParams,
) => {
	const source =
		item?.url ||
		(item?.id
			? getStorageFileUrl({
					id: item.id,
				})
			: '');

	if (!isSafeUrl(source)) return;

	// opened before the awaits below, while the user gesture still counts
	const newTab = window.open('', '_blank');

	// the blank tab is same-origin, so the document below could reach back
	// through it. Assigned, not 'noopener': with that `window.open` returns null
	if (newTab) newTab.opener = null;

	try {
		const response = await fetch(source);
		if (!response.ok) {
			throw new Error(`Failed to fetch file: ${response.statusText}`);
		}

		const blob = await response.blob();

		if (!isInlineSafeMimeType(blob.type)) {
			newTab?.close();
			saveBlobAsFile(blob, item?.name);

			return;
		}

		const objectUrl = URL.createObjectURL(blob);

		if (newTab) {
			newTab.location.href = objectUrl;
		}

		setTimeout(() => URL.revokeObjectURL(objectUrl), OBJECT_URL_TTL_MS);
	} catch (error) {
		newTab?.close();
		console.error('Error opening file:', error);
	}
};
