<script setup>
import { ref } from 'vue';
import WtSaveFailedPopup from '../../../../../../../src/components/on-demand/wt-save-failed-popup/wt-save-failed-popup.vue';
// correct way to import popup
// import WtSaveFailedPopup from '@webitel/ui-sdk/src/components/on-demand/wt-save-failed-popup/wt-save-failed-popup.vue';

let isSaveFailedPopup = ref(false);
function close() {
  isSaveFailedPopup.value = false;
}
</script>

<template>
  <wt-button @click="isSaveFailedPopup = true">Open popup </wt-button>
  <wt-save-failed-popup
    v-if="isSaveFailedPopup"
    @close-popup="close"
  />
</template>

<style scoped lang="scss"></style>
