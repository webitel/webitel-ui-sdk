<script setup>
const colors = [
	'main',
	'primary',
	'secondary',
	'success',
	'warning',
	'error',
	'transfer',
];
</script>

<template>
  <div style="display: flex; flex-wrap: nowrap; gap: 10px">
    <wt-chip
      v-for="color of colors"
      :key="color"
      :color="color"
      :label="color"
    >
      <template #icon>
        <wt-icon icon="edit" />
      </template>
    </wt-chip>
  </div>
</template>

<style scoped lang="scss"></style>
