<script setup>
const sizes = ['sm', 'md'];
</script>

<template>
  <wt-indicator
    v-for="size of sizes"
    :key="size"
    :size="size"
    :text="size"
  />
</template>

<style scoped lang="scss"></style>
