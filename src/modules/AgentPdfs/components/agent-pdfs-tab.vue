<template>
  <section class="table-wrapper table-page table-wrapper--tab-table">
    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.agentPdfs.pdfs', 2) }}
      </h3>
      <wt-action-bar
        :include="[IconAction.FILTERS, IconAction.REFRESH, IconAction.DELETE]"
        :disabled:delete="!selected.length"
        @click:refresh="loadDataList"
        @click:delete="
          askDeleteConfirmation({
            deleted: selected,
            callback: () => handleDelete(selected),
          })
        "
      >
        <template #filters>
          <wt-badge>
            <wt-icon-action
              action="filters"
              @click="emit('toggle-filter')"
            />
          </wt-badge>
        </template>
      </wt-action-bar>
    </header>

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
      :text="textEmpty"
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
            :disabled="item.status !== WebitelMediaExporterExportStatus.Done"
            @click="downloadPdf(item.fileId)"
          />
          <wt-icon-action
            action="delete"
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
import { WtEmpty } from '@webitel/ui-sdk/components';
import { IconAction } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup
  from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import {
  useDeleteConfirmationPopup,
} from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';
import { getStartOfDay, getEndOfDay } from '@webitel/ui-sdk/scripts';
import { WebitelMediaExporterExportStatus } from '@webitel/api-services/gen/models';
import { downloadFile } from '@webitel/api-services/api';

import { useRoute } from 'vue-router';
import PdfStatusPreview from './pdf-status-preview.vue';
import PdfStatus from './pdf-status.vue';
import { FileServicesAPI, PdfServicesAPI } from '@webitel/api-services/api';

interface Props {
  agentId?: string | number;
  store?: any;
}

const props = withDefaults(defineProps<Props>(), {
  agentId: undefined,
  store: undefined,
});

const { t } = useI18n();

const emit = defineEmits(['toggle-filter']);

const router = useRoute();
const agentId = router.params.id;

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
  addFilter({
    name: 'agentId',
    value: agentId,
  });

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
  return new Date(+timestamp).toLocaleString();
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
    // Otherwise, use the existing delete method with fileId
    return FileServicesAPI.deleteScreenRecordingsByAgent({
      id: el.fileId,
      agentId: agentId,
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

const getPdfUrl = (fileId: string): string => {
  const token = localStorage.getItem('access-token');
  const BASE_URL = import.meta.env.VITE_API_URL;
  return `${BASE_URL}/storage/file/${fileId}/stream?access_token=${token}`;
};

const openPdfInNewWindow = (fileId: string) => {
  try {
    const pdfUrl = getPdfUrl(fileId);
    window.open(pdfUrl, '_blank');
  } catch (error) {
    console.error('Error opening PDF:', error);
  }
};
</script>

<style lang="scss" scoped></style>

