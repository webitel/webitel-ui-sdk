import applyTransform, { notify } from '@webitel/ui-sdk/api/transformers/index';
import { computed, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';

import CSVExport from '../CSVExport.js';

export function useCSVExport({ selected }: { selected: Ref<number[]> }) {
  const CSVExportInstance = ref<null | InstanceType<typeof CSVExport>>(null);
  const route = useRoute();

  const CSVDownloadProgress = computed(() =>
    CSVExportInstance.value
      ? CSVExportInstance.value.downloadProgress.count
      : 0,
  );

  const isCSVLoading = computed(() => !!CSVDownloadProgress.value);

  const isAnySelected = computed(() => !!selected.value.length);

  function initCSVExport(fetchMethod, options) {
    CSVExportInstance.value = new CSVExport(fetchMethod, options);
  }

  async function exportCSV(exportParams?) {
    const routeQuery = route.query;
    const params = {
      ...(exportParams || routeQuery),
      size: 5000,
    };

    if (isAnySelected.value) {
      params.id = selected.value;
    }

    try {
      await CSVExportInstance.value?.export(params);
    } catch (err) {
      throw applyTransform(err, [notify]);
    }
  }

  return {
    CSVExportInstance,

    CSVDownloadProgress,
    isCSVLoading,
    isAnySelected,

    initCSVExport,
    exportCSV,
  };
}
