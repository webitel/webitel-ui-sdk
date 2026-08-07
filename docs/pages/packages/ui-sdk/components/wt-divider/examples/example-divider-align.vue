<script setup>
const aligns = [
	'left',
	'center',
	'right',
];
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <wt-divider
      v-for="align of aligns"
      :key="align"
      :align="align"
    >
      {{ align }}
    </wt-divider>
  </div>
</template>

<style scoped lang="scss"></style>
