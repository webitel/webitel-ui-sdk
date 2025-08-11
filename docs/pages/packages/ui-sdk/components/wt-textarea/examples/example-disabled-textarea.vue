<template>
  <wt-textarea
    :model-value="value"
    disabled
    label="Disabled"
    name="disabled-textarea"
  />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('disabled value');
</script>
