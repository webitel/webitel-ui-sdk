import { getStorageFileUrl } from './getStorageFileUrl';

interface OpenStorageFileInNewTabParams {
	id?: string;
}

export const openStorageFileInNewTab = async (
	item?: OpenStorageFileInNewTabParams,
) => {
	if (!item?.id) return;

	// opened synchronously, before the awaits below, so browsers don't
	// treat it as a blocked popup once the user-gesture context is gone
	const newTab = window.open('', '_blank');

	try {
		const url = getStorageFileUrl({
			id: item.id,
		});

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to fetch file: ${response.statusText}`);
		}

		const blob = await response.blob();
		const fileURL = URL.createObjectURL(blob);

		if (newTab) newTab.location.href = fileURL;
	} catch (error) {
		newTab?.close();
		console.error('Error opening file:', error);
	}
};
