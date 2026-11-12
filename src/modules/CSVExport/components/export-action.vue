<template>
  <div class="export-action">
    <wt-button
      :disabled="disabled"
      :loading="loading"
      :color="ButtonColor.SECONDARY"
      @click="handleExport"
    >
      {{ t('reusable.export') }}
    </wt-button>
    <wt-popup
      v-if="isPopupShown"
      overflow
      size="sm"
      @close="closePopup"
    >
      <template #title>
        {{ t('reusable.export') }}
      </template>
      <template #main>
        <div class="export-action__form">
          <wt-single-select
            :label="t('vocabulary.format')"
            :model-value="draft.format"
            :options="formatOptions"
            :show-clear="false"
            :v="formatValidation"
            required
            @update:model-value="selectFormat"
          />
          <wt-input-text
            v-if="isCSV"
            v-model:model-value="draft.separator"
            :label="t('objects.CSV.separator')"
            :v="separatorValidation"
            required
          />
        </div>
      </template>
      <template #actions>
        <wt-button
          :disabled="isSaveDisabled"
          @click="save"
        >
          {{ t('reusable.export') }}
        </wt-button>
        <wt-button
          :color="ButtonColor.SECONDARY"
          @click="closePopup"
        >
          {{ t('reusable.cancel') }}
        </wt-button>
      </template>
    </wt-popup>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, requiredIf } from '@vuelidate/validators';
import { ConfigurationsAPI } from '@webitel/api-services/api';
import { EngineSystemSettingName } from '@webitel/api-services/gen/models';
import { computed, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import {
	ButtonColor,
	ExportFormat,
	TypesExportedSettings,
} from '../../../enums';
import type {
	ExportOptions,
	ExportSettings,
} from '../composables/useExportFile';

withDefaults(
	defineProps<{
		loading?: boolean;
		disabled?: boolean;
	}>(),
	{
		loading: false,
		disabled: false,
	},
);

const emit = defineEmits<{
	export: [
		ExportOptions,
	];
}>();

const { t } = useI18n();

const exportSettings = ref<ExportSettings | null>(null);
const isPopupShown = ref(false);

const draft = reactive<ExportSettings>({
	format: '',
	separator: '',
});

const isCSV = computed(() => draft.format === ExportFormat.CSV);

const formatOptions = Object.values(TypesExportedSettings).map((format) => ({
	id: format,
	name: format,
	value: format,
}));

const v$ = useVuelidate(
	{
		draft: {
			format: {
				required,
			},
			separator: {
				requiredIf: requiredIf(() => isCSV.value),
			},
		},
	},
	{
		draft,
	},
);

type DraftValidation = {
	format?: unknown;
	separator?: unknown;
};

const draftValidation = computed(
	() => v$.value.draft as DraftValidation | undefined,
);
const formatValidation = computed(() => draftValidation.value?.format);
const separatorValidation = computed(() => draftValidation.value?.separator);
const isSaveDisabled = computed(() => v$.value.$invalid);

const emitExport = ({ format, separator }: ExportSettings) =>
	emit('export', {
		format,
		...(format === ExportFormat.CSV && {
			separator,
		}),
	});

const resetDraft = () => {
	draft.format = '';
	draft.separator = '';
};

const closePopup = () => {
	isPopupShown.value = false;
	resetDraft();
};

const handleExport = () => {
	if (exportSettings.value?.format) {
		emitExport(exportSettings.value);
		return;
	}
	isPopupShown.value = true;
	v$.value.$touch();
};

const save = () => {
	emitExport(draft);
	closePopup();
};

const selectFormat = ({ value }: { value: string }) => {
	draft.format = value;
	if (!isCSV.value) draft.separator = '';
};

const loadExportSettings = async () => {
	try {
		const { items } = await ConfigurationsAPI.getList({
			name: EngineSystemSettingName.ExportSettings,
		});
		exportSettings.value = items[0]?.value ?? null;
	} catch (error) {
		console.error(error);
	}
};

onMounted(loadExportSettings);
</script>

<style scoped>
.export-action {
  position: relative;
}

.export-action__form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}
</style>
