<template>
  <wt-textarea
    :value="value"
    disabled
    label="Disabled"
    name="disabled-textarea"
    @input="handler"
  />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('disabled value');

const handler = (e) => {
  value.value = e;
};
</script>
