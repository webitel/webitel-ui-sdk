<script setup>
import { ref } from 'vue';

const isPopup = ref(false);
</script>

<template>
  <wt-button
    @click="isPopup = !isPopup"
  >Toggle popup
  </wt-button>
  <wt-popup
    v-show="isPopup"
    @close="isPopup = false"
  >
    <template #header>
      <h2>
        Popup header
      </h2>
    </template>
    <template #main>
      <p style="text-align: justify;">
        Lorem ipsum dolor sit amet, consectetur adipisicing
        elit. Accusamus autem consequatur consequuntur earum, eius, exercitationem, expedita
        fugiat mollitia nam nesciunt omnis placeat provident quos sed tempore ullam
        voluptate.
        Est, molestias.
      </p>
    </template>
    <template #actions>
      <wt-button
        color="primary"
        @click="isPopup = false"
      >
        Ok
      </wt-button>
      <wt-button
        color="secondary"
        @click="isPopup = false"
      >
        Not Ok
      </wt-button>
    </template>
  </wt-popup>
</template>

<style scoped lang="scss">

</style>
