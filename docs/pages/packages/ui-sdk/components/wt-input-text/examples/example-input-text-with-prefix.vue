<script setup>
import { ref } from 'vue';

const value = ref('');
</script>

<template>
  <wt-input-text
    v-model="value"
    label="Website"
    placeholder="example.com"
  >
    <template #prefix>
      https://
    </template>
  </wt-input-text>
</template>

<style scoped lang="scss"></style>
