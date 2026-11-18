// Firefox drops the download if the URL is revoked in the same task
const OBJECT_URL_TTL_MS = 1_000;

export const saveBlobAsFile = (blob: Blob, name?: string) => {
	const objectUrl = URL.createObjectURL(blob);
	const link = document.createElement('a');

	link.style.display = 'none';
	link.href = objectUrl;
	link.download = name || 'file';

	document.body.appendChild(link);
	link.click();
	link.remove();

	setTimeout(() => URL.revokeObjectURL(objectUrl), OBJECT_URL_TTL_MS);
};
