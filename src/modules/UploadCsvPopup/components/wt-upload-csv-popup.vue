<template>
  <wt-popup
    v-bind="$attrs"
    :shown="file"
    class="wt-upload-csv-popup"
    @close="close"
  >
    <template #title>
      {{ t('objects.importCSV') }}
    </template>

    <template #main>
      <wt-loader
        v-show="isReadingFile"
        class="wt-upload-csv-popup__reading-file-loader"
      />

      <section
        v-show="!isReadingFile"
        class="wt-upload-csv-popup-form"
      >
        <wt-checkbox
          v-model:selected="skipHeaders"
          :label="t('objects.CSV.skipHeaders')"
          disabled
        />

        <form class="wt-upload-csv-popup-form__form">
          <wt-select
            v-model="charset"
            :clearable="false"
            :label="t('objects.CSV.charSet')"
            :options="charsetOptions"
            disabled
          />

          <wt-input
            v-model="separator"
            :label="t('objects.CSV.separator')"
          />
        </form>

        <!-- PREVIEW SECTION: preview loader, preview table, parsing stack trace -->
        <section>
          <wt-loader
            v-if="isParsingPreview"
            class="wt-upload-csv-popup__parsing-preview-loader"
          />
          <article
            v-else
            class="wt-upload-csv-popup-form__file-preview"
          >
            <wt-table
              :data="csvPreviewTableData"
              :grid-actions="false"
              :headers="csvPreviewTableHeaders"
              :selectable="false"
            />
          </article>
        </section>

        <!-- FIELDS MAPPING -->
        <div class="wt-upload-csv-popup-mapping">
          <div class="wt-upload-csv-popup-mapping-item">
            <p
              class="wt-upload-csv-popup-mapping-item__field typo-subtitle-1"
            >
              {{ t('objects.CSV.fieldName') }}
            </p>
            <p
              class="wt-upload-csv-popup-mapping-item__field typo-subtitle-1"
            >
              {{ t('objects.CSV.CSVColumn') }}
            </p>
          </div>

          <div
            v-for="(field, key) in mappingFields"
            :key="key"
            class="wt-upload-csv-popup-mapping-item"
          >
            <p class="wt-upload-csv-popup-mapping-item__field">
              {{ t(field.locale) }}<span v-if="field.required">*</span>
            </p>

            <wt-select
              v-if="!field.multiple"
              v-model="field.csv"
              :clearable="!field.required"
              :options="csvColumns"
              :placeholder="t(field.locale)"
              :track-by="null"
              class="wt-upload-csv-popup-mapping-item__select"
            />
            <wt-tags-input
              v-else
              v-model="field.csv"
              :options="csvColumns"
              :placeholder="t(field.locale)"
              class="wt-upload-csv-popup-mapping-item__select"
            />

            <div
              v-if="field.tooltip"
              class="upload-tooltip"
            >
              {{ field.tooltip }}
            </div>
          </div>
        </div>
      </section>

      <div
        v-show="!isParsingPreview && parseErrorStackTrace"
        class="wt-upload-csv-popup-form__error-stack-trace"
      >
        {{ parseErrorStackTrace }}
      </div>
    </template>

    <template
      v-if="!isReadingFile"
      #actions
    >
      <wt-button
        :disabled="!allowSaveAction"
        :loading="isParsingCSV"
        @click="processCSV"
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
import { defineEmits, defineProps, ref, toRefs, withDefaults } from 'vue';
import { useI18n } from 'vue-i18n';

import useUploadCsv from '../composable/useUploadCsv';
import HandlingCSVMode from '../types/WtUploadCSVHandlingMode.enum';

interface CharsetOption {
	name: string;
	value: string;
}

interface Props {
	file: File | null;
	mappingFields: unknown[];
	addBulkItems?: (items: unknown[]) => unknown | Promise<unknown>;
	handlingMode?: string;
	fileUploadHandler?: () => unknown | Promise<unknown>;
}

const props = withDefaults(defineProps<Props>(), {
	file: null,
	mappingFields: () => [],
	handlingMode: HandlingCSVMode.PROCESS,
});

const emit = defineEmits<{
	(e: 'changeMappingFields', value: unknown[]): void;
	(e: 'save'): void;
	(e: 'close'): void;
}>();

const { t } = useI18n();

const skipHeaders = ref(true);
const separator = ref(',');
const charsetOptions = ref<CharsetOption[]>([]);
const charset = ref<CharsetOption>({
	name: 'UTF-8',
	value: 'utf-8',
});

const { file, mappingFields } = toRefs(props);

const {
	isReadingFile,
	isParsingCSV,
	isParsingPreview,
	parseErrorStackTrace,
	csvPreviewTableData,
	csvPreviewTableHeaders,
	csvColumns,
	allowSaveAction,
	processCSV,
	close,
} = useUploadCsv({
	props,
	emit,
	skipHeaders,
	separator,
});
</script>

<style lang="scss">
.wt-upload-csv-popup {
  :deep(.wt-popup__popup) {
    min-height: 40vh;
  }

  .wt-upload-csv-popup__reading-file-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .wt-upload-csv-popup-form__form {
    display: grid;
    align-items: flex-start;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: minmax(40px, auto);
    grid-column-gap: 20px;
    grid-row-gap: 10px;
    margin: var(--spacing-sm) 0;
  }

  .wt-upload-csv-popup__parsing-preview-loader {
    margin: auto;
  }

  .wt-upload-csv-popup-form__file-preview .wt-table {
    overflow: auto;
    max-width: 60vw;
  }

  .wt-upload-csv-popup-mapping {
    .wt-upload-csv-popup-mapping-item {
      display: grid;
      align-items: flex-start;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: minmax(40px, auto);
      grid-column-gap: 20px;
      grid-row-gap: 10px;
      margin-bottom: var(--spacing-sm);

      &__field {
        align-self: center;
      }

      &__select :deep(.wt-label),
      &__select :deep(.wt-input-info) {
        display: none;
      }
    }
  }

  .wt-upload-csv-popup-form__error-stack-trace {
    margin-top: var(--spacing-sm);
    padding: var(--spacing-sm);
    color: var(--error-color);
    border-radius: var(--border-radius);
    background: var(--secondary-color);
  }
}
</style>