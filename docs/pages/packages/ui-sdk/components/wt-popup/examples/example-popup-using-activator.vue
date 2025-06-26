<script setup>
import { WtPopup } from '@webitel/ui-sdk/components';
</script>

<template>
  <wt-popup>
    <template #activator="{ open }">
      <wt-button @click="open"> activator </wt-button>
    </template>
    <template #header>
      <h2>Popup header</h2>
    </template>
    <template #main>
      <p style="text-align: justify">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
        autem consequatur consequuntur earum, eius, exercitationem, expedita
        fugiat mollitia nam nesciunt omnis placeat provident quos sed tempore
        ullam voluptate. Est, molestias.
      </p>
    </template>
  </wt-popup>
</template>

<style scoped lang="scss"></style>
