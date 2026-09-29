<template>
  <wt-rich-text-editor
    v-model="value"
    :height="150"
    label="Plain text"
    output="text"
  />
  <p>{{ value }}</p>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('No formatting here');
</script>
