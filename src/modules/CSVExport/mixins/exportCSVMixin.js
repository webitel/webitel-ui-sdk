import CSVExport from '../CSVExport.js';

export default {
  data: () => ({
    CSVExport: null,
  }),

  computed: {
    isCSVLoading() {
      return !!this.CSVDownloadProgress;
    },

    CSVDownloadProgress() {
      return this.CSVExport ? this.CSVExport.downloadProgress.count : 0;
    },
    selectedIds() {
      return this.dataList
        .filter((item) => item._isSelected)
        .map((item) => item.id);
    },
    isAnySelected() {
      return !!this.selectedIds.length;
    },
  },

  methods: {
    initCSVExport(fetchMethod, options) {
      this.CSVExport = new CSVExport(fetchMethod, options);
    },

    async exportCSV(exportParams) {
      const routeQuery = this.$route?.query;
      const params = {
        ...(exportParams || routeQuery),
        size: 5000,
      };
      if (this.isAnySelected) params.id = this.selectedIds;
      await this.CSVExport.export(params);
    },
  },
};
