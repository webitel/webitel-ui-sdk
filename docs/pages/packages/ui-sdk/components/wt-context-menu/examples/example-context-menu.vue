<script setup>
const options = [
  { text: 'Option-1' },
  { text: 'Disabled Option-2', disabled: true },
  { text: 'Option-3' },
  { text: 'Disabled Option-4', disabled: true },
];
</script>

<template>
  <wt-context-menu :options="options">
    <template #activator="{ toggle }">
      <wt-button @click="toggle">Open</wt-button>
    </template>
  </wt-context-menu>
</template>

<style scoped lang="scss"></style>
