import FilesExport from '../FilesExport';

export default {
  data: () => ({
    isFilesLoading: false,
    FilesExport: null,
  }),

  computed: {
    downloadProgress() {
      return this.FilesExport ? this.FilesExport.downloadProgress.count : 0;
    },

    zippingProgress() {
      return this.FilesExport ? `${Math.floor(this.FilesExport.zippingProgress.percent)}%` : 0;
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
          next.files ? [...filesAccumulator, ...next.files] : filesAccumulator), []);
      }
      return files;
    },

    async exportFiles(files) {
      if (!this.FilesExport) throw new Error('FilesExport is not initialized');
      this.isFilesLoading = true;
      const exportFiles = files || this.getSelectedFiles();
      const reqParams = { existsFile: true };
      try {
        await this.FilesExport.exportFiles(exportFiles, { reqParams });
      } catch (err) {
        throw err;
      } finally {
        this.isFilesLoading = false;
      }
    },
  },
};
