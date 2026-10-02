<script setup>
import { ref } from 'vue';

const width = ref(320);
</script>

<template>
  <div style="display: flex; gap: 16px; height: 240px; padding: 16px; background: var(--wt-page-background-color)">
    <wt-layout :default-width="320" resizable @resize="width = $event">
      <wt-content-wrapper>Resizable: {{ width }}px</wt-content-wrapper>
    </wt-layout>
    <wt-layout>
      <wt-content-wrapper>Fluid</wt-content-wrapper>
    </wt-layout>
  </div>
</template>
