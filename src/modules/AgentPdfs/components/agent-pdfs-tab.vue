<template>
  <section class="table-wrapper table-page table-wrapper--tab-table">
    <slot
      name="header"
      :selected="selected"
      :load-data-list="loadDataList"
      :ask-delete-confirmation="askDeleteConfirmation"
      :handle-delete="handleDelete"
    />

    <delete-confirmation-popup
      :shown="isDeleteConfirmationPopup"
      :callback="deleteCallback"
      :delete-count="deleteCount"
      @close="closeDelete"
    />

    <wt-loader v-show="isLoading" />

    <wt-empty
      v-show="showEmpty"
      :image="imageEmpty"
      :headline="textEmpty"
    />

    <div v-show="!isLoading" class="table-loading-wrapper">
      <wt-table
        v-if="dataList?.length"
        :data="dataList"
        :headers="shownHeaders"
        :selected="selected"
        sortable
        @sort="updateSort"
        @update:selected="updateSelected"
      >
        <template #preview="{ item }">
          <pdf-status-preview
            :status="item.status"
            :clickable="item.status === WebitelMediaExporterExportStatus.Done"
            @click="openPdfInNewWindow(item.fileId)"
          />
        </template>

        <template #name="{ item }">
          {{ item.name }}
        </template>

        <template #status="{ item }">
          <pdf-status :status="item.status" />
        </template>

        <template #valid_until="{ item }">
          {{ prettifyTimestamp(item.validUntil) }}
        </template>

        <template #created_at="{ item }">
          {{ prettifyTimestamp(item.createdAt) }}
        </template>

        <template #created_by="{ item }">
          {{ item.createdBy }}
        </template>

        <template #actions="{ item }">
          <wt-icon-action
            action="download"
            :disabled="isDownloadDisabled(item)"
            @click="downloadPdf(item.fileId)"
          />
          <wt-icon-action
            action="delete"
            :disabled="isDeleteDisabled(item)"
            @click="
              askDeleteConfirmation({
                deleted: [item],
                callback: () => handleDelete([item]),
              })
            "
          />
        </template>
      </wt-table>

      <wt-pagination
        :next="next"
        :prev="page > 1"
        :size="size"
        debounce
        @change="updateSize"
        @next="updatePage(page + 1)"
        @prev="updatePage(page - 1)"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { downloadFile, getMediaUrl } from '@webitel/api-services/api';
import { FileServicesAPI, PdfServicesAPI } from '@webitel/api-services/api';
import { WebitelMediaExporterExportStatus } from '@webitel/api-services/gen/models';
import { WebitelMediaExporterExportRecord } from '@webitel/api-services/gen/models';
import { WtEmpty } from '@webitel/ui-sdk/components';
import { getEndOfDay,getStartOfDay } from '@webitel/ui-sdk/scripts';
import DeleteConfirmationPopup
  from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import {
  useDeleteConfirmationPopup,
} from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { DatetimeFormat } from 'vue-i18n';

import { FormatDateMode } from '../../../enums/FormatDateMode/FormatDateMode'
import { formatDate } from '../../../utils/formatDate'
import PdfStatus from './pdf-status.vue';
import PdfStatusPreview from './pdf-status-preview.vue';

interface Props {
  store?: any;
  entityIdKey?: string;
  entityIdValue?: string | number;
  onDeleteItem?: (item: WebitelMediaExporterExportRecord) => Promise<void>;
}

const props = withDefaults(defineProps<Props>(), {
  store: undefined,
  entityIdKey: undefined,
  entityIdValue: undefined,
  onDeleteItem: undefined,
});

const tableStore = props.store;

const {
  dataList,
  selected,
  error,
  isLoading,
  page,
  size,
  next,
  shownHeaders,
  filtersManager,
} = storeToRefs(tableStore);

const {
  initialize,
  loadDataList,
  updateSelected,
  updatePage,
  updateSize,
  updateSort,
  hasFilter,
  addFilter,
} = tableStore;

initialize();

const initializeDefaultFilters = () => {
  if (props.entityIdKey && props.entityIdValue) {
    addFilter({
      name: props.entityIdKey,
      value: props.entityIdValue,
    });
  }

  if (!hasFilter('createdAtFrom')) {
    addFilter({
      name: 'createdAtFrom',
      value: getStartOfDay(),
    });
  }

  if (!hasFilter('createdAtTo')) {
    addFilter({
      name: 'createdAtTo',
      value: getEndOfDay(),
    });
  }
};

initializeDefaultFilters();

const prettifyTimestamp = (timestamp: string | number) => {
  if (!timestamp) return '';
  return formatDate(+timestamp, FormatDateMode.DATETIME)
};

const isDownloadDisabled = (item: WebitelMediaExporterExportRecord) => {
  return item.status !== WebitelMediaExporterExportStatus.Done;
};

const isDeleteDisabled = (item: WebitelMediaExporterExportRecord) => {
  return item.status !== WebitelMediaExporterExportStatus.Done && item.status !== WebitelMediaExporterExportStatus.Failed;
};

const {
  isVisible: isDeleteConfirmationPopup,
  deleteCount,
  deleteCallback,

  askDeleteConfirmation,
  closeDelete,
} = useDeleteConfirmationPopup();

const {
  showEmpty,
  image: imageEmpty,
  text: textEmpty,
} = useTableEmpty({
  dataList,
  error,
  filters: computed(() => filtersManager.value.getAllValues()),
  isLoading,
});

const handleDelete = async (items: []) => {
  const deleteEl = (el) => {
    // If status is failed, use deletePdfExportRecord with the export id
    if (el.status === WebitelMediaExporterExportStatus.Failed) {
      return PdfServicesAPI.delete(el.id);
    }
    // Otherwise, use custom delete function if provided
    if (props.onDeleteItem) {
      return props.onDeleteItem(el);
    }
    // Fallback to default implementation
    return FileServicesAPI.deleteScreenRecordingsByAgent({
      id: el.fileId,
      agentId: props.entityIdValue,
    });
  };

  try {
    await Promise.all(items.map(deleteEl));
  } finally {
    // If we're deleting all items from the current page, and we're not on the first page,
    // we should go to the previous page
    if (items.length === dataList.value.length && page.value > 1) {
      updatePage(page.value - 1);
    }
    await loadDataList();
  }
};

const downloadPdf = async (id: string) => {
  await downloadFile(id);
};

const openPdfInNewWindow = (fileId: string) => {
  try {
    const pdfUrl = getMediaUrl(fileId);
    window.open(pdfUrl, '_blank');
  } catch (error) {
    console.error('Error opening PDF:', error);
  }
};
</script>

<style lang="scss" scoped></style>

