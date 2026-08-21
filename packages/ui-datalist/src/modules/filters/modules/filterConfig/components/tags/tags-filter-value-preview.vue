<template>
  <ul v-if="value?.length">
    <li
      v-for="(tag, index) of value"
      :key="index"
    >
      {{ tag }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
defineProps<{
	/** tag names — this filter stores strings, not lookup objects */
	value?: string[];
}>();
</script>

<style scoped></style>
