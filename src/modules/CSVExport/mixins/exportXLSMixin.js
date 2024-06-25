import XLSExport from '../XLSExport.js';

export default {
  data: () => ({
    XLSExport: null,
  }),
  computed: {
    isXLSLoading() {
      return !!this.XLSDownloadProgress;
    },

    XLSDownloadProgress() {
      return this.XLSExport ? this.XLSExport.downloadProgress.count : 0;
    },

  },
  methods: {
    initXLSExport(fetchMethod, options) {
      this.XLSExport = new XLSExport(fetchMethod, options);
    },

    async exportXLS(exportParams) {
      const routeQuery = this.$route?.query;
      const params = {
        ...exportParams || routeQuery,
        size: 5000,
      };
      if (this.isAnySelected) params.id = this.selectedIds;

      try {
        await this.XLSExport.export(params);
      } catch (err) {
        throw err;
      }
    },

  },
};
