<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <wt-textarea
      v-model="value"
      label="Textarea"
      name="label-textarea"
      autoresize
    />
    <wt-textarea
      v-model="filledValue"
      label="Filled textarea"
      name="filled-textarea"
      variant="filled"
      autoresize
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');
const filledValue = ref('');
</script>
