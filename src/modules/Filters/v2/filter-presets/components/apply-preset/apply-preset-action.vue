<template>
  <div class="apply-preset-action">
    <wt-icon-btn
      icon="load-preset"
      @click="showPresetsList = true"
    />
    <wt-popup
      :shown="showPresetsList"
      size="sm"
      @close="showPresetsList = false"
    >
      <template #title>
        {{ `${t('vocabulary.apply')} ${t('webitelUI.filters.presets.preset').toLowerCase()}` }}
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
              v-for="(preset, index) of dataList"
              :key="preset.id"
              :collapsed="!!index"
              :is-selected="preset === selectedPreset"
              :preset="preset"
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
import {computed, inject, ref, watch} from "vue";
import {useI18n} from "vue-i18n";
import {type StoreDefinition, storeToRefs } from "pinia";
import {WtButton, WtIconBtn, WtPopup, WtSearchBar, WtEmpty} from "../../../../../../components/index";
import {useTableEmpty} from "../../../../../TableComponentModule/composables/useTableEmpty";
import PresetQueryAPI from '../../api/PresetQuery.api.ts';
import PresetPreview from "./preset-preview.vue";

const props = defineProps<{
  /**
   * presets "section" namespace
   */
  namespace: string;
  usePresetsStore: StoreDefinition;
}>();

const emit = defineEmits<{
  apply: [string];
}>();

const eventBus = inject('$eventBus');

const {t} = useI18n();

const showPresetsList = ref(false);

const presetsStore = props.usePresetsStore();
const {
  dataList,
  error,
  isLoading,
  filtersManager,
  page,
} = storeToRefs(presetsStore);

const {
  loadDataList,
  initialize,
  updateSize,
  deleteEls,
} = presetsStore;

updateSize(1000);

const {
  showEmpty,
  image: imageEmpty,
  text: textEmpty,
} = useTableEmpty({
  dataList,
  isLoading,
  error,
  filters: computed(() => filtersManager.value.getAllValues()),
});

filtersManager.value.addFilter({name: 'presetNamespace', value: props.namespace});

watch(showPresetsList, () => {
  initialize();

  watch(showPresetsList, (value) => {
    if (value) {
      loadDataList();
    }
  });
}, {once: true});

const search = computed({
  get: () => {
    return filtersManager.value.getFilter('search')?.value || '';
  },
  set: (value) => {
    filtersManager.value.addFilter({name: 'search', value});
  }
});

const selectedPreset = ref();

const applySelectedPreset = () => {
  const filtersSnapshot = selectedPreset.value.preset['filtersManager.toString'];
  emit('apply', filtersSnapshot);

  selectedPreset.value = null;
  showPresetsList.value = false;
};

const updatePreset = async ({preset, onSuccess, onFailure}) => {
  try {
    await PresetQueryAPI.update({
      item: { ...preset, section: props.namespace },
      id: preset.id,
    });
    eventBus.$emit('notification', {
      type: 'success',
      text: t('webitelUI.filters.presets.notifications.success.update'),
    });
    onSuccess();
    return loadDataList();
  } catch (err) {
    onFailure(err);
    throw err;
  }
};

const deletePreset = async (preset) => {
  await deleteEls([preset.id]);
  eventBus.$emit('notification', {
    type: 'success',
    text: t('webitelUI.filters.presets.notifications.success.delete'),
  });
};
</script>

<style lang="scss" scoped>
.apply-preset-action .wt-popup {
  :deep(.wt-popup__popup) {
    height: 480px;
  }
}

.apply-preset-main-content {
  display: flex;
  height: 100%;
  flex-direction: column;
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
