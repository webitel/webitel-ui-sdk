/** [Claude] `fallback` is the icon for a mime type none of the branches match */
export const getFileTypeIcon = (
	mimeType = '',
	{
		fallback = 'attach',
	}: {
		fallback?: string;
	} = {},
): string => {
	if (mimeType.includes('image')) return 'preview-tag-image';
	if (mimeType.includes('video')) return 'preview-tag-video';
	if (mimeType.includes('audio')) return 'preview-tag-audio';
	if (mimeType.includes('application')) return 'preview-tag-application';
	return fallback;
};
