import { EngineCallFileType } from '@webitel/api-services/gen/models';

import FilesExport from '../FilesExport.js';

export default {
	data: () => ({
		FilesExport: null,
	}),

	computed: {
		isFilesLoading() {
			return this.FilesExport?.isLoading;
		},

		filesDownloadProgress() {
			return this.FilesExport ? this.FilesExport.downloadProgress.count : 0;
		},

		filesZippingProgress() {
			return this.FilesExport
				? Math.floor(this.FilesExport.zippingProgress.percent)
				: 0;
		},
	},

	methods: {
		initFilesExport(options) {
			this.FilesExport = new FilesExport(options);
		},

		getSelectedFiles(fileType = EngineCallFileType.FileTypeAudio) {
			let files = null;
			if (this.selectedItems?.length) {
				files = this.selectedItems.reduce(
					(filesAccumulator, next) =>
						next.files && next.files[fileType]
							? [
									...filesAccumulator,
									...next.files[fileType],
								]
							: filesAccumulator,
					[],
				);
			}
			return files;
		},

		async exportFiles(
			files,
			reqParams = {},
			fileType = EngineCallFileType.FileTypeAudio,
		) {
			if (!this.FilesExport) throw new Error('FilesExport is not initialized');
			const exportFiles = files || this.getSelectedFiles(fileType);
			try {
				await this.FilesExport.exportFiles(exportFiles, {
					reqParams,
					fileType,
				});
			} catch (err) {
				throw err;
			}
		},
	},
};
