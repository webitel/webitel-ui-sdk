import getStorageFileUrl from './getStorageFileUrl';

interface OpenStorageFileInNewTabParams {
	id?: string;
}

const openStorageFileInNewTab = async (
	item?: OpenStorageFileInNewTabParams,
) => {
	if (!item?.id) return;

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

		window.open(fileURL, '_blank');
	} catch (error) {
		console.error('Error opening file:', error);
	}
};

export default openStorageFileInNewTab;
