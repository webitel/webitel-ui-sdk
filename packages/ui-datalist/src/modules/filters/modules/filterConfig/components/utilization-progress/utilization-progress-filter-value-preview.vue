<template>
  <ul>
    <li
      v-for="(item, index) of props.value"
      :key="index"
    >
      {{ item?.name }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
const props = defineProps<{
	value: {
		name?: string;
	}[];
}>();
</script>

<style scoped></style>
