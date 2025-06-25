<script setup>
const colors = ['main', 'icon', 'on-dark', 'on-light'];
</script>

<template>
  <wt-loader
    v-for="color in colors"
    :key="color"
    :color="color"
    size="sm"
  />
</template>

<style scoped lang="scss"></style>
