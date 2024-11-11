<script setup>
import {  ref } from 'vue';

const isShowDialog = ref(false)
</script>

<template>
  <div class="table-confirm-delete-dialog__action-wrapper">
    <wt-button @click="isShowDialog = true">Show dialog</wt-button>
  </div>
  <wt-confirm-dialog
    v-if="isShowDialog"
    :title="$t('webitelUI.deleteConfirmationPopup.title')"
    :callback="() => isShowDialog = false"
    @close="isShowDialog = false"
  />
</template>

<style scoped lang="scss">
.table-confirm-delete-dialog__action-wrapper {
  display: flex;
  gap: var(--spacing-xs);
}
</style>