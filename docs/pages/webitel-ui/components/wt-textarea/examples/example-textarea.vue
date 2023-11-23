<template>
  <div>
    <wt-textarea
      :value="value"
      label="Textarea"
      name="label-textarea"
      @input="handler"
    ></wt-textarea>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');

const handler = (e) => {
  value.value = e;
};
</script>
