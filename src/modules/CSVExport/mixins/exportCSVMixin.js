import CSVExport from '../CSVExport';

export default {
  data: () => ({
    isCSVLoading: false,
    CSVExport: null,
  }),

  computed: {
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
      this.isCSVLoading = true;
      const routeQuery = this.$route?.query;
      const params = {
        ...exportParams || routeQuery,
        size: 5000,
      };
      if (this.isAnySelected) params.ids = this.selectedIds;

      try {
        await this.CSVExport.export(params);
      } catch (err) {
        throw err;
      } finally {
        this.isCSVLoading = false;
      }
    },
  },
};
