<template>
  <wt-rich-text-editor
    v-model="value"
    label="Resolution"
  />
  <p>{{ value }}</p>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('<p>Customer confirmed the <strong>refund</strong>.</p>');
</script>
