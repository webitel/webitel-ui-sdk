<script setup>
const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
</script>

<template>
  <div style="display: flex; gap: 10px">
    <wt-avatar
      v-for="size in sizes"
      :key="size"
      :size="size"
      username="John Doe"
    />
  </div>
</template>

<style scoped lang="scss"></style>
