<template>
  <wt-popup
    size="md"
    @close="emit('close')"
  >
    <template #title>
      {{ `${t('reusable.save')} ${t('webitelUI.filters.presets.preset').toLowerCase()}` }}
    </template>
    <template #main>
      <p class="overwrite-preset-popup-text">
        {{ t('webitelUI.filters.presets.overwritePresetTitle') }}
      </p>
      <p class="overwrite-preset-popup-text">
        {{ t('webitelUI.filters.presets.overwritePresetText') }}
      </p>
    </template>
    <template #actions>
      <wt-button
        color="error"
        :loading="isSaving"
        @click="confirm"
      >
        {{ t('reusable.replace') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="emit('cancel')"
        >{{ t('reusable.cancel') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { WtPopup } from '../../../../../../components/index';
import type { SubmitConfig } from './save-preset-popup.vue';

const emit = defineEmits<{
  confirm: [SubmitConfig];
  cancel: [];
  close: [];
}>();

const { t } = useI18n();

const isSaving = ref(false);

const confirm = () => {
  emit('confirm', {
    onCompleted: () => (isSaving.value = false),
  });
};
</script>

<style scoped lang="scss">
.overwrite-preset-popup-text {
  text-align: center;
}
</style>
