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

    getSelectedFiles() {
      let files = null;
      if (this.selectedItems?.length) {
        files = this.selectedItems.reduce((filesAccumulator, next) => (
          next.files
            ? [...filesAccumulator, ...next.files]
            : filesAccumulator), []);
      }
      return files;
    },

    async exportFiles(files, reqParams = {}) {
      if (!this.FilesExport) throw new Error('FilesExport is not initialized');
      const exportFiles = files || this.getSelectedFiles();
      try {
        await this.FilesExport.exportFiles(exportFiles, { reqParams });
      } catch (err) {
        throw err;
      }
    },
  },
};
