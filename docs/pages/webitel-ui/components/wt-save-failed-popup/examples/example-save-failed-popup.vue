<script setup>
import WtSaveFailedPopup from '../../../../../../src/components/on-demand/wt-save-failed-popup/wt-save-failed-popup.vue';

</script>

<template>
  <div class="popup-wrapper">
    <wt-save-failed-popup/>
  </div>
</template>

<style scoped lang="scss">
.popup-wrapper {
  position: relative;
  width: 600px;
  height: 500px;

  .wt-popup {
    position: absolute;
    z-index: 1;
  }
}
</style>
