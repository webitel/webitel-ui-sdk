<script setup>
import { ref } from 'vue';

const small = ref('');
const normal = ref('');
const large = ref('');
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <wt-password
      v-model="small"
      label="Small"
      size="sm"
    />
    <wt-password
      v-model="normal"
      label="Normal"
    />
    <wt-password
      v-model="large"
      label="Large"
      size="lg"
    />
  </div>
</template>

<style scoped lang="scss"></style>
