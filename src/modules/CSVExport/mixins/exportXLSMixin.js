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
    selectedIds() {
      return this.dataList.filter((item) => item._isSelected).map((item) => item.id);
    },
    isAnySelected() {
      return !!this.selectedIds.length;
    },
  },
  methods: {
    initXLSExport(fetchMethod, options) {
      this.XLSExport = new XLSExport(fetchMethod, options);
    },

    async exportXLS(exportParams) {
      const routeQuery = this.$route?.query;
      const params = {
        ...(exportParams || routeQuery),
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
