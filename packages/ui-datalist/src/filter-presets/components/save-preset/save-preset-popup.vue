<template>
  <wt-popup
    size="md"
    @close="emit('close')"
  >
    <template #title>
      {{
        `${t('reusable.save')} ${t('webitelUI.filters.presets.preset').toLowerCase()}`
      }}
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

      <preset-filters-preview :filters="appliedFilters" />
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
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { WtPopup } from '@webitel/ui-sdk/components';
import { computed, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { EnginePresetQuery } from 'webitel-sdk';

import type { IFiltersManager } from '../../../index';
import PresetDescriptionField from '../_shared/input-fields/preset-description-field.vue';
import PresetNameField from '../_shared/input-fields/preset-name-field.vue';
import PresetFiltersPreview from '../_shared/preset-filters-preview.vue';

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

const { t } = useI18n();

const isSaving = ref(false);

const presetForm = reactive({
  name: '',
  description: '',
});

const v$ = useVuelidate(
  computed(() => {
    return {
      name: {
        required,
      },
    };
  }),
  presetForm,
  { $autoDirty: true },
);
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
@use '@webitel/styleguide/scroll' as *;

.save-preset-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.save-preset-filters-preview-wrapper {
  @extend %wt-scrollbar;
  margin-top: var(--spacing-sm);
  max-height: 140px;
  overflow-y: auto;
}
</style>
