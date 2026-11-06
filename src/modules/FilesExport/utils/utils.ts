import { saveAs } from 'file-saver-es';
import jszipUtils from 'jszip-utils';

import type {
	CreateFetchListParams,
	DownloadListItem,
} from '../types/downloadAction';
import type {
	ExportedFileSource,
	ExportedItem,
	FetchList,
} from '../types/filesExport';

export function saveZip(blob: Blob, filename: string) {
	saveAs(blob, `${filename}.zip`);
}

export function fetchFileBinary(url: string): Promise<string | ArrayBuffer> {
	return new Promise((resolve, reject) => {
		jszipUtils.getBinaryContent(url, (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});
}

export function handleMimeType(item: ExportedItem): string {
	const assertedExt = item.name.split('.').pop();
	const nameWithoutExt = assertedExt
		? item.name.split('.').slice(0, -1).join('.')
		: item.name;
	const mimeExt = item.mimeType?.split('/').pop();
	if (assertedExt) {
		return `${nameWithoutExt}.${assertedExt}`;
	} else if (mimeExt) {
		return `${nameWithoutExt}.${mimeExt}`;
	}
	return nameWithoutExt;
}

export async function getFile(
	item: ExportedItem,
	{ getFileURL, getFileBlob }: ExportedFileSource,
) {
	if (getFileURL) {
		return fetchFileBinary(getFileURL(item));
	}
	if (getFileBlob) {
		return getFileBlob(item);
	}
	throw new Error('getFileURL or getFileBlob is required');
}

export function createFetchList({
	selected = [],
	onFetch,
	type,
}: CreateFetchListParams): FetchList<DownloadListItem> {
	if (selected.length || !onFetch) {
		return async () => ({
			items: selected,
			next: false,
		});
	}
	return (params) =>
		onFetch({
			...params,
			type,
		});
}
