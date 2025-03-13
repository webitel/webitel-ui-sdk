<template>
  <div class="save-preset-action">
    <wt-icon-btn
      :disabled="disableAction"
      icon="save"
      @click="showSaveForm = true"
    />

    <save-preset-popup
      v-if="showSaveForm /* v-if is used to re-mount component on each open/close so that each time component data re-inits*/"
      v-show="!presetToOverwriteWith /* on 'overwrite preset' popup hide this popup, but don't reset it*/"
      :shown="true /* coz visibility is controlled by v-if*/"
      :filters-manager="props.filtersManager"
      :namespace="namespace"
      @submit="handlePresetSubmit"
      @close="showSaveForm = false"
    />

    <overwrite-preset-popup
      v-if="presetToOverwriteWith"
      @confirm="handlePresetOverwriteConfirmation"
      @cancel="presetToOverwriteWith = null"
      @close="presetToOverwriteWith = null"
    />
  </div>
</template>

<script lang="ts" setup>
import {computed, inject, type Ref,ref} from 'vue';
import {useI18n} from "vue-i18n";
import {EnginePresetQuery} from "webitel-sdk";

import { WtIconBtn } from '../../../../../../components/index';
import {IFiltersManager} from "../../../filters/index";
import {addPreset, getPresetList, updatePreset} from '../../api/PresetQuery.api.ts';
import OverwritePresetPopup from "./overwrite-preset-popup.vue";
import SavePresetPopup, {SubmitConfig} from "./save-preset-popup.vue";

const props = defineProps<{
  /**
   * presets "section" namespace
   */
  namespace: string;
  filtersManager: IFiltersManager;
}>();

const eventBus = inject('$eventBus');

const { t } = useI18n();

/**
 * disable "save" btn if there's nothing to save
 * */
const disableAction = computed(() => {
  return !props.filtersManager.getAllKeys().length;
});

/**
 * visibility flag
 * */
const showSaveForm = ref(false);

/**
 * if preset with the same name already exists, this will be suggested to set to that preset
 */
const presetToOverwriteWith: Ref<EnginePresetQuery | null> = ref(null);

const handlePresetSubmit = async (preset: EnginePresetQuery, { onCompleted }: SubmitConfig) => {
  try {
    await addPreset({ preset, namespace: props.namespace });

    eventBus.$emit('notification', {
      type: 'success',  text: t('systemNotifications.success.create', {
        entity: t('webitelUI.filters.presets.preset'),
      }),
    });

    showSaveForm.value = false;
  } catch (err) {
    if (err?.status === 409) {
      presetToOverwriteWith.value = preset;
    }
    throw err;
  } finally {
    if (onCompleted) onCompleted();
  }
};

const handlePresetOverwriteConfirmation = async ({ onCompleted }: SubmitConfig) => {
  try {
    const {items} = await getPresetList({
      search: presetToOverwriteWith.value.name,
      presetNamespace: props.namespace,
    }, {
      transformers: {useStarToSearch: false},
    });
    const {id: existingPresetId} = items[0];
    await updatePreset({
      id: existingPresetId,
      item: {
        ...presetToOverwriteWith.value,
      },
      namespace: props.namespace,
    });

    eventBus.$emit('notification', {
      type: 'success',  text: t('systemNotifications.success.update', {
        entity: t('webitelUI.filters.presets.preset'),
      }),
    });

    presetToOverwriteWith.value = null;
    showSaveForm.value = false;
  } finally {
    if (onCompleted) onCompleted();
  }
};
</script>

<style lang="scss" scoped>

</style>
