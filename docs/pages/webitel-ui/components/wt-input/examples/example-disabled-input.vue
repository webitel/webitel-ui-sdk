<template>
  <wt-input
    :value="value"
    disabled
    has-show-password
    label="Disabled"
    name="disabled-input"
    type="password"
    @input="handler"
  ></wt-input>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('disabled value');

const handler = (e) => {
  value.value = e;
};
</script>
