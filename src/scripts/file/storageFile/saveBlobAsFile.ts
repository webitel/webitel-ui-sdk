/**
 * Saves an already fetched blob to disk: the bytes come from the blob, so the
 * browser never re-requests a URL carrying a token.
 *
 * Not `downloadFile` — that one is for table exports: it takes an axios
 * response and appends an `ExportFormat` to the name.
 */
export const saveBlobAsFile = (blob: Blob, name?: string) => {
	const objectUrl = URL.createObjectURL(blob);
	const link = document.createElement('a');

	link.style.display = 'none';
	link.href = objectUrl;
	link.download = name || 'file';
	link.rel = 'noopener noreferrer';

	document.body.appendChild(link);
	link.click();
	link.remove();

	URL.revokeObjectURL(objectUrl);
};
