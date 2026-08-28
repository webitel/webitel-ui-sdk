import { getStorageFileUrl } from './getStorageFileUrl';

interface DownloadStorageFileParams {
	id?: string;
	name?: string;
	type?: string;
	url?: string;
}

export const downloadStorageFile = ({
	id,
	name,
	type,
	url,
}: DownloadStorageFileParams) => {
	const a = document.createElement('a');

	a.href =
		url ||
		getStorageFileUrl({
			id: id as string,
			type,
		});
	a.target = '_blank';
	a.download = name ?? '';
	a.click();
};
