<script setup>
import { ref } from 'vue';

const password = ref('');
</script>

<template>
  <wt-password
    v-model="password"
    label="Password"
    placeholder="Enter your password"
    @keyup.enter="console.log('enter')"
  />
</template>

<style scoped lang="scss"></style>
