<template>
  <wt-input
    v-model="value"
    has-show-password
    label="Password"
    name="password-input"
    type="password"
  />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('password');

const handler = (e) => {
  value.value = e;
};
</script>
