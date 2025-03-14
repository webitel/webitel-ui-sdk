<template>
  <wt-popup
    size="md"
    @close="emit('close')"
  >
    <template #title>
      {{ `${t('reusable.save')} ${t('webitelUI.filters.presets.preset').toLowerCase()}` }}
    </template>

    <template #main>
      <form
        class="save-preset-form"
        @submit.prevent="() => !v$.$invalid && save"
      >
        <preset-name-field
          v-model:model-value="presetForm.name"
          :v="v$.name"
        />

        <preset-description-field
          v-model:model-value="presetForm.description"
        />
      </form>

      <preset-filters-preview
        :filters="appliedFilters"
      />
    </template>

    <template #actions>
      <wt-button
        :disabled="v$.$invalid"
        :loading="isSaving"
        @click="save"
      >
        {{ t('reusable.save') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="emit('close')"
      >
        {{ t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {EnginePresetQuery} from "webitel-sdk";
import type {IFiltersManager} from "../../../index";
import { WtPopup } from '../../../../../../components/index';
import PresetDescriptionField from "../_shared/input-fields/preset-description-field.vue";
import PresetFiltersPreview from "../_shared/preset-filters-preview.vue";
import PresetNameField from "../_shared/input-fields/preset-name-field.vue";

export type SubmitConfig = {
  onSuccess?: () => void;
  onFailure?: (err: Error) => void;
  onCompleted?: () => void;
};

const props = defineProps<{
  filtersManager: IFiltersManager;
}>();

const emit = defineEmits<{
  submit: [EnginePresetQuery, SubmitConfig?];
  close: [];
}>();

const {t} = useI18n();

const isSaving = ref(false);

const presetForm = reactive({
  name: '',
  description: '',
});

const v$ = useVuelidate(computed(() => {
  return {
    name: {
      required,
    },
  };
}), presetForm, {$autoDirty: true});
v$.value.$touch();

const appliedFilters = computed(() => {
  return props.filtersManager.getFiltersList();
});

const save = () => {
  isSaving.value = true;

  const preset: EnginePresetQuery = {
    ...presetForm,
    preset: {
      'filtersManager.toString': props.filtersManager.toString(),
    },
  };

  emit('submit', preset, {
    onCompleted: () => {
      isSaving.value = false;
    },
  });
};

</script>

<style scoped lang="scss">
.save-preset-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.save-preset-filters-preview-wrapper {
  @extend %wt-scrollbar;
  overflow-y: auto;
  max-height: 140px;
  margin-top: var(--spacing-sm);
}
</style>
