<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const isShowDialog = ref(false);
const deleteCount = ref(1);

const deleteMessage = computed(() => {
  if (deleteCount.value === 0) {
    return t('webitelUI.deleteConfirmationPopup.tableAskingAlert', 2, null, {
      count: t('webitelUI.deleteConfirmationPopup.deleteAll'),
    });
  }
  return t(
    'webitelUI.deleteConfirmationPopup.tableAskingAlert',
    { count: deleteCount.value },
    null,
  );
});

const callback = async () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 500),
  );
};
</script>

<template>
  <div style="display: flex; gap: var(--spacing-xs)">
    <wt-button @click="isShowDialog = true">Show dialog</wt-button>
    <wt-input
      :value="deleteCount"
      @input="deleteCount = $event"
    />
  </div>
  <wt-confirm-dialog
    :shown="isShowDialog"
    :title="$t('webitelUI.deleteConfirmationPopup.title')"
    :deleteMessage="deleteMessage"
    :callback="callback"
    @close="isShowDialog = false"
  >
    <template #actions="{ isDeleting, close, confirm }">
      <wt-button
        :loading="isDeleting"
        @click="confirm"
      >
        {{ $t('vocabulary.yes') }}
      </wt-button>
      <wt-button
        :disabled="isDeleting"
        color="secondary"
        @click="close"
      >
        {{ $t('vocabulary.no') }}
      </wt-button>
    </template>
  </wt-confirm-dialog>
</template>
