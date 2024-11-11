<script setup>
import { ref } from 'vue';

const isShowDialog = ref(false)
</script>

<template>
  <wt-button @click="isShowDialog = true">Show dialog</wt-button>
  <wt-confirm-dialog
    :shown="isShowDialog"
    :title="$t('webitelUI.deleteConfirmationPopup.title')"
    @close="isShowDialog = false"
    @confirm="isShowDialog = false"
  />
</template>
