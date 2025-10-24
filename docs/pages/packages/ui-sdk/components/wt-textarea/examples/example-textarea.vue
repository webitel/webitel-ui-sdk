<template>
  <div>
    <wt-textarea
      v-model="value"
      label="Textarea"
      name="label-textarea"
      autoresize
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');
</script>
