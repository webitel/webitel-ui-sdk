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
import {computed, ref, type Ref} from 'vue';
import {EnginePresetQuery} from "webitel-sdk";
import { WtIconBtn } from '../../../../../../components/index';
import {addPreset, getPresetList, updatePreset} from '../../api/PresetQuery.api.ts';
import SavePresetPopup, {SubmitConfig} from "./save-preset-popup.vue";
import OverwritePresetPopup from "./overwrite-preset-popup.vue";
import {IFiltersManager} from "../../../filters/index";

const props = defineProps<{
  /**
   * presets "section" namespace
   */
  namespace: string;
  filtersManager: IFiltersManager;
}>();

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
