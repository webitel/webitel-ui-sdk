<script setup>
const options = [
  { text: 'lorem ipsum' },
  { text: 'dolor sit amet' },
  { text: 'consectetur adipiscing elit' },
];
</script>

<template>
  <div style="display: flex; gap: var(--spacing-xs)">
    <wt-button-select :options="options"> Primary </wt-button-select>
    <wt-button-select
      color="secondary"
      :options="options"
    >
      Secondary
    </wt-button-select>
    <wt-button-select
      disabled
      :options="options"
    >
      Disabled
    </wt-button-select>
  </div>
</template>

<style scoped lang="scss"></style>
