<script setup>
const colors = [
  'primary',
  'secondary',
  'success',
  'error',
  'transfer',
  'disabled',
  'break-out',
  'info',
];
</script>

<template>
  <wt-indicator
    v-for="color of colors"
    :key="color"
    :color="color"
    :text="color"
  />
</template>

<style scoped lang="scss">

</style>
