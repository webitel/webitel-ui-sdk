<template>
  <div class="apply-preset-action">
    <wt-icon-action
      :action="IconAction.APPLY_PRESET"
      @click="showPresetsList = true"
    />
    <wt-popup
      :shown="showPresetsList"
      size="md"
      @close="showPresetsList = false"
    >
      <template #title>
        {{
          `${t('vocabulary.apply')} ${t('webitelUI.filters.presets.preset').toLowerCase()}`
        }}
      </template>

      <template #main>
        <section class="apply-preset-main-content">
          <wt-search-bar
            :value="search"
            @search="search = $event"
          />

          <wt-empty
            v-show="showEmpty"
            :image="imageEmpty"
            :text="textEmpty"
          />

          <section class="available-presets-list">
            <preset-preview
              v-for="preset of dataList"
              :key="preset.id"
              :filter-configs="props.filterConfigs"
              :is-selected="preset === selectedPreset"
              :preset="preset"
              collapsed
              @preset:select="selectedPreset = preset"
              @preset:update="updatePreset"
              @preset:delete="() => deletePreset(preset)"
            />
          </section>
          <!--            TODO: infinite scroll -->
          <!--          <wt-intersection-observer-->
          <!--            :loading="isLoading"-->
          <!--            :next="false"-->
          <!--            @next="updatePage(page + 1)"-->
          <!--          />-->
        </section>
      </template>

      <template #actions>
        <wt-button
          :disabled="!selectedPreset"
          @click="applySelectedPreset"
        >
          {{ t('vocabulary.apply') }}
        </wt-button>
        <wt-button
          color="secondary"
          @click="showPresetsList = false"
        >
          {{ t('reusable.cancel') }}
        </wt-button>
      </template>
    </wt-popup>
  </div>
</template>

<script lang="ts" setup>
import {
  WtButton,
  WtEmpty,
  WtIconAction,
  WtPopup,
  WtSearchBar,
} from '@webitel/ui-sdk/components';
import { IconAction } from '@webitel/ui-sdk/enums';
import { useTableEmpty } from '@webitel/ui-sdk/modules/TableComponentModule/composables/useTableEmpty';
import { type Store, storeToRefs } from 'pinia';
import {computed, inject, onMounted, ref, watch} from 'vue';
import { useI18n } from 'vue-i18n';
import { EnginePresetQuery } from 'webitel-sdk';

import {AnyFilterConfig} from "../../../filters/modules/filterConfig/classes/FilterConfig";
import PresetQueryAPI from '../../api/PresetQuery.ts';
import PresetPreview from './preset-preview.vue';

const props = defineProps<{
  /**
   * presets "section" namespace
   */
  namespace: string;
  presetsStore: () => Store;
  filterConfigs: AnyFilterConfig[];
}>();

const emit = defineEmits<{
  apply: [string];
}>();

const eventBus = inject('$eventBus');

const { t } = useI18n();

const showPresetsList = ref(false);

const presetsStore = props.presetsStore;
const { dataList, error, isLoading, filtersManager, presetId } =
  storeToRefs(presetsStore);

const { loadDataList, initialize, updateSize, deleteEls, setupPresetPersistence } = presetsStore;

updateSize(1000);
filtersManager.value.addFilter({
  name: 'presetNamespace',
  value: props.namespace,
});

const search = computed({
  get: () => {
    return filtersManager.value.getFilter('search')?.value || '';
  },
  set: (value) => {
    filtersManager.value.addFilter({ name: 'search', value });
  },
});

const {
  showEmpty,
  image: imageEmpty,
  text: textEmpty,
} = useTableEmpty({
  dataList,
  isLoading,
  error,
  filters: computed(() => {
    return {
      search: search.value,
    };
  }),
});

watch(
  showPresetsList,
  () => {
    initialize();

    watch(showPresetsList, (value) => {
      if (value) {
        search.value = '';
        /* search.value reset causes re-fetch as filter change, so
      loadDataList() is commented.
      TODO: implement ability to set filters "silently" and refactor this code */
        // loadDataList();
      }
    });
  },
  { once: true },
);

const selectedPreset = ref();

const applySelectedPreset = () => {
  const filtersSnapshot =
    selectedPreset.value.preset['filtersManager.toString'];
  emit('apply', filtersSnapshot);
  presetId.value = selectedPreset.value.id

  selectedPreset.value = null;
  showPresetsList.value = false;
};

const updatePreset = async ({ preset, onSuccess, onFailure }) => {
  try {
    await PresetQueryAPI.update({
      item: { ...preset },
      id: preset.id,
      namespace: preset.preset?.namespace,
    });
    eventBus.$emit('notification', {
      type: 'success',
      text: t('systemNotifications.success.update', {
        entity: t('webitelUI.filters.presets.preset'),
      }),
    });
    onSuccess();
    return loadDataList();
  } catch (err) {
    onFailure(err);
    throw err;
  }
};

const deletePreset = async (preset: EnginePresetQuery) => {
  await deleteEls([preset]);
  eventBus.$emit('notification', {
    type: 'success',
    text: t('systemNotifications.success.delete', {
      entity: t('webitelUI.filters.presets.preset'),
    }),
  });
};

const restorePresetById = async (id: number | null) => {
  if (!id) return;
  const presetData = await PresetQueryAPI.get({ id });
  const filters = presetData?.preset?.['filtersManager.toString'];

  if (filters) emit('apply', filters);
}

onMounted(async () => {
  await setupPresetPersistence();
  await restorePresetById(presetId.value)
})
</script>

<style lang="scss" scoped>
@use '@webitel/styleguide/scroll' as *;

.apply-preset-action .wt-popup {
  :deep(.wt-popup__popup) {
    height: 480px;
  }
}

.apply-preset-main-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: var(--spacing-xs);

  .wt-empty {
    flex-grow: 1;
    max-width: 100%;
  }
}

.available-presets-list {
  @extend %wt-scrollbar;

  display: flex;
  overflow-y: auto;
  flex-direction: column;
  max-height: 400px;
  gap: var(--spacing-xs);
  scrollbar-gutter: stable;
}
</style>
