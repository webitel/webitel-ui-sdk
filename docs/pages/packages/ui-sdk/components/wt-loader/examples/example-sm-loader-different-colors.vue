<script setup>
const colors = ['main', 'icon', 'on-dark', 'on-light'];
</script>

<template>
  <div style="display: flex; gap: var(--spacing-xs); background-color: var(--green-darken-1);">
    <wt-loader
      v-for="color in colors"
      :key="color"
      :color="color"
      size="sm"
    />
  </div>
</template>

<style scoped lang="scss"></style>
