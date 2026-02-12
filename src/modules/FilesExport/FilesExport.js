import { getCallMediaUrl } from '@webitel/api-services/api';
import { EngineCallFileType } from '@webitel/api-services/gen/models';
import { saveAs } from 'file-saver-es';
import JSZip from 'jszip';
import jszipUtils from 'jszip-utils';
import path from 'path-browserify';

import { _wtUiLog } from '../../scripts/logger.js';

export default class FilesExport {
	filename = 'files';

	fetchMethod = null;

	isLoading = false;

	skipFilesWithError = false;

	downloadProgress = {
		count: 0,
	};

	zippingProgress = {
		percent: 0,
	};

	filesURL = getCallMediaUrl;

	constructor({ fetchMethod, filename, filesURL, skipFilesWithError = false }) {
		if (fetchMethod) this.fetchMethod = fetchMethod;
		if (filename) this.filename = filename;
		if (filesURL) this.filesURL = filesURL;
		this.skipFilesWithError = skipFilesWithError;
	}

	_fetchFileBinary(fileId) {
		const url = this.filesURL(fileId);
		return new Promise((resolve, reject) =>
			jszipUtils.getBinaryContent(url, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			}),
		);
	}

	resetProgress() {
		this.downloadProgress = {
			count: 0,
		};
		this.zippingProgress = {
			percent: 0,
		};
	}

	// Recursively adds files to zip archive, filtering by fileType
	// Supports FileTypeAudio, FileTypeVideo, FileTypeScreensharing (defaults to FileTypeAudio)
	async _addFilesToZip(
		items,
		zip,
		fileType = EngineCallFileType.FileTypeAudio,
	) {
		for (const item of items) {
			if (item.files) {
				// If item has nested files object, filter by fileType and recurse
				if (item.files?.[fileType]) {
					await this._addFilesToZip(item.files[fileType], zip, fileType);
				} else continue;
			} else {
				try {
					const binary = await this._fetchFileBinary(item.id);
					const ext = item.mimeType.split('/').pop();
					// itemName needed to remove extension from item.name https://stackoverflow.com/a/31615711
					const itemName = path.parse(item.name).name;
					zip.file(`${itemName}.${ext}`, binary);
					this.downloadProgress.count += 1;
				} catch (err) {
					_wtUiLog.warn({
						entity: 'script',
						module: 'FilesExport',
					})(`An error occurred while downloading a file id=${item.id}`, err);
					if (!this.skipFilesWithError) {
						throw err;
					}
				}
			}
		}
	}

	async _generateZip(zip) {
		try {
			return await zip.generateAsync(
				{
					type: 'blob',
				},
				(progress) => {
					this.zippingProgress = progress;
				},
			);
		} catch (err) {
			throw new Error('Failed to generate zip file');
		}
	}

	async _saveZip(file) {
		try {
			saveAs(file, `${this.filename}.zip`);
		} catch (err) {
			throw new Error('Failed to save a file');
		}
	}

	// Fetches history items and adds files of specified type to zip
	async _fetchAndZip(zip, requestParams, fileType) {
		const params = {
			from: 0,
			size: 5000,
			fields: [
				'files',
			],
			...requestParams,
		};

		let page = 1;
		let isNext = false;
		do {
			const { items, next } = await this.fetchMethod({
				...params,
				page,
			});
			// Filter and add files of the specified type
			await this._addFilesToZip(items, zip, fileType);

			isNext = next;
			page += 1;
		} while (isNext);
	}

	// Exports files to a zip archive
	// fileType: FileTypeAudio (default), FileTypeVideo, or FileTypeScreensharing
	async exportFiles(
		files,
		{ reqParams, fileType = EngineCallFileType.FileTypeAudio },
	) {
		try {
			this.isLoading = true;
			const zip = new JSZip();
			// If files provided, use them; otherwise fetch from API with fileType filter
			if (files?.length) await this._addFilesToZip(files, zip, fileType);
			else {
				await this._fetchAndZip(zip, reqParams, fileType);
			}
			const file = await this._generateZip(zip);
			await this._saveZip(file);
			this.resetProgress();
		} catch (err) {
			throw err;
		} finally {
			this.isLoading = false;
		}
	}
}
