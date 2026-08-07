<script setup>
import { ref } from 'vue';

const small = ref(10);
const normal = ref(10);
const large = ref(10);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <wt-input-number
      v-model="small"
      label="Small"
      size="sm"
    />
    <wt-input-number
      v-model="normal"
      label="Normal"
    />
    <wt-input-number
      v-model="large"
      label="Large"
      size="lg"
    />
  </div>
</template>

<style scoped lang="scss"></style>
