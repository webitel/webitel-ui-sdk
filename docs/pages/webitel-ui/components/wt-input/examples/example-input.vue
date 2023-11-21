<template>
  <div>
    <wt-input
      :value="value"
      label="Input"
      name="label-input"
      @input="handler"
    ></wt-input>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');

const handler = (e) => {
  value.value = e;
};
</script>
