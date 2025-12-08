<template>
  <wt-popup
    class="upload-popup"
    v-bind="$attrs"
    min-width="680"
    @close="close"
  >
    <template #title>
      {{ t('objects.importCSV') }}
    </template>

    <template #main>
      <wt-loader
        v-show="isReadingFile"
        class="upload-popup__reading-file-loader"
      />

      <section
        v-show="!isReadingFile"
        class="upload-popup-form"
      >
        <!-- PREVIEW SECTION: preview loader, preview table, parsing stack trace -->
        <section>
          <wt-loader
            v-show="isParsingPreview"
            class="upload-popup__parsing-preview-loader"
          />
          <article
            v-show="!isParsingPreview"
            class="upload-popup-form__file-preview"
          >
            <wt-table
              :data="csvPreviewTableData"
              :grid-actions="false"
              :headers="filteredCsvPreviewTableHeaders"
              :selectable="false"
            />
          </article>
        </section>
      </section>

      <article
        v-show="!isParsingPreview && parseErrorStackTrace"
        class="upload-popup-form__error-stack-trace"
      >
        {{ parseErrorStackTrace }}
      </article>
    </template>

    <template
      v-if="!isReadingFile"
      #actions
    >
      <wt-button
        :disabled="!allowSaveAction"
        :loading="isParsingCSV"
        @click="handleSave"
      >
        {{ t('reusable.save') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ t('reusable.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { toRefs,withDefaults } from 'vue';
import { useI18n } from 'vue-i18n';

import useUploadCsv from '../composables/useUploadCsv';
import HandlingCSVMode from '../enums/HandlingCSVMode.enum.js';

defineOptions({
  name: 'UploadCsvPreviewPopup',
});

// підлаштуй під свій реальний тип, якщо треба детальніше
export interface MappingField {
  name?: string;
  locale: string;
  tooltip?: string;
  required?: boolean;
  multiple?: boolean;
  csv?: string | string[];
}

interface Props {
  file: File | null; // або Blob/unknown, якщо у тебе так
  mappingFields: MappingField[];
  addBulkItems?: (items: unknown[]) => unknown | Promise<unknown>;
  handlingMode?: HandlingCSVMode | string;
  fileUploadHandler?: () => unknown | Promise<unknown>;
  skipHeaders?: boolean;
  separator?: string;
  charset?: string;
}

const props = withDefaults(defineProps<Props>(), {
  file: null,
  mappingFields: () => [],
  handlingMode: HandlingCSVMode.PROCESS,
  skipHeaders: true,
  separator: ',',
  charset: 'utf-8',
});

const emit = defineEmits<{
  (e: 'changeMappingFields', value: MappingField[]): void;
  (e: 'save'): void;
  (e: 'close'): void;
}>();

const { t } = useI18n();

// нам потрібні як refs: file, mappingFields для шаблону
// skipHeaders та separator — для composable (watch перевистроює превʼю при зміні пропів)
const { file, mappingFields, skipHeaders, separator } = toRefs(props);

const {
  isReadingFile,
  isParsingCSV,
  isParsingPreview,
  parseErrorStackTrace,
  csvPreviewTableData,
  csvPreviewTableHeaders,        // тут не використовується, але повертається composable
  filteredCsvPreviewTableHeaders, // цей якраз юзається в шаблоні
  csvColumns,                    // не потрібен в цьому компоненті, але є в composable
  allowSaveAction,
  processCSV,                    // викликається з handleSave
  handleSave,
  close,
} = useUploadCsv({
  props,
  emit,
  skipHeaders,
  separator,
});
</script>

<style lang="scss" scoped>
@use '../css/upload-popup';
</style>
