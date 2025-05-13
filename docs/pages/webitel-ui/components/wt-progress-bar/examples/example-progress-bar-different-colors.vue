<script setup>
const colors = ['primary', 'secondary', 'success', 'error', 'warning'];
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 10px">
    <wt-progress-bar
      v-for="color of colors"
      :key="color"
      :max="100"
      :value="75"
      :color="color"
    />
  </div>
</template>

<style scoped lang="scss"></style>
