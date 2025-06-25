<script setup>
import { ref } from 'vue';

const isShowDialog = ref(false);

const callback = async () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 500),
  );
};
</script>

<template>
  <wt-button @click="isShowDialog = true"> Show dialog </wt-button>
  <wt-confirm-dialog
    :shown="isShowDialog"
    :title="$t('webitelUI.deleteConfirmationPopup.title')"
    :callback="callback"
    @close="isShowDialog = false"
    @confirm="isShowDialog = false"
  />
</template>
