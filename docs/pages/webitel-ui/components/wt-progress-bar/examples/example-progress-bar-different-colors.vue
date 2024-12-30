<script setup>
const colors = ['primary', 'secondary', 'success', 'error', 'warning'];
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 10px">
    <wt-progress-bar
      v-for="color of colors"
      :max="100"
      :value="75"
      :color="color"
      :key="color"
    />
  </div>
</template>

<style scoped lang="scss"></style>
