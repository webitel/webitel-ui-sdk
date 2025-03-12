<template>
  <wt-popup
    size="sm"
    @close="emit('close')"
  >
    <template #title>
      {{ t('validations.alreadyExists', { field: t('reusable.name') }) }}
    </template>
    <template #main> some nice text goes here {{ t('') }} </template>
    <template #actions>
      <wt-button
        color="error"
        :loading="isSaving"
        @click="confirm"
      >
        {{ t('reusable.overwrite') }}
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
import { SubmitConfig } from './save-preset-popup.vue';

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
.overwrite-preset-popup {
}
</style>
