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

		// Gets selected files of a specific type from selectedItems
		// fileType: FileTypeAudio (default), FileTypeVideo, or FileTypeScreensharing
		getSelectedFiles(fileType = EngineCallFileType.FileTypeAudio) {
			let files = null;
			if (this.selectedItems?.length) {
				files = this.selectedItems.reduce(
					(filesAccumulator, next) =>
						// Check if item has files and contains files of the specified type
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

		// Exports files of a specific type to a zip archive
		// fileType: FileTypeAudio (default), FileTypeVideo, or FileTypeScreensharing
		async exportFiles(
			files,
			reqParams = {},
			fileType = EngineCallFileType.FileTypeAudio,
		) {
			if (!this.FilesExport) throw new Error('FilesExport is not initialized');
			// Use provided files or get from selectedItems filtered by fileType
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
