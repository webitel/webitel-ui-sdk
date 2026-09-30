<script setup>
import { ref } from 'vue';

const isSidePanelShown = ref(true);
</script>

<template>
  <div style="height: 480px">
    <wt-page>
      <template #header>
        <div style="height: 40px; background: lightblue" />
      </template>
      <wt-layout :default-width="320" resizable>
        <wt-content-wrapper align="stretch">
          <wt-button @click="isSidePanelShown = !isSidePanelShown">
            Toggle side layout
          </wt-button>
        </wt-content-wrapper>
      </wt-layout>
      <wt-layout>
        <wt-content-wrapper>Fluid</wt-content-wrapper>
      </wt-layout>
      <wt-layout v-if="isSidePanelShown" :default-width="320">
        <wt-content-wrapper>Fixed 320px</wt-content-wrapper>
      </wt-layout>
    </wt-page>
  </div>
</template>
