import { isSafeUrl } from '../../isSafeUrl';
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
	const href =
		url ||
		getStorageFileUrl({
			id: id as string,
			type,
		});

	// `url` comes from server data: a `javascript:` href would run in this
	// origin on the click below
	if (!isSafeUrl(href)) return;

	const link = document.createElement('a');

	link.href = href;
	link.target = '_blank';
	link.rel = 'noopener noreferrer';
	link.download = name ?? '';
	link.click();
};
