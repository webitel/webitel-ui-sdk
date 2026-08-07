<script setup>
import { ref } from 'vue';

const value = ref('');
const disabledValue = ref('');
const invalidValue = ref('');
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <wt-input-text
      v-model="value"
      label="Username"
      placeholder="Enter username"
      variant="filled"
    />
    <wt-input-text
      v-model="disabledValue"
      label="Disabled"
      placeholder="Enter username"
      variant="filled"
      disabled
    />
    <wt-input-text
      v-model="invalidValue"
      label="Invalid"
      placeholder="Enter username"
      variant="filled"
      invalid
    />
  </div>
</template>

<style scoped lang="scss"></style>
