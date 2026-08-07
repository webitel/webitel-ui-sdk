<script setup>
const types = [
	'solid',
	'dashed',
	'dotted',
];
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px">
    <wt-divider
      v-for="type of types"
      :key="type"
      :type="type"
    >
      {{ type }}
    </wt-divider>
  </div>
</template>

<style scoped lang="scss"></style>
