<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <wt-textarea
      v-model="small"
      label="Small"
      name="small-textarea"
      size="sm"
    />
    <wt-textarea
      v-model="normal"
      label="Normal"
      name="normal-textarea"
    />
    <wt-textarea
      v-model="large"
      label="Large"
      name="large-textarea"
      size="lg"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const small = ref('Small');
const normal = ref('Normal');
const large = ref('Large');
</script>
