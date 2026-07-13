<template>
  <ul v-if="value">
    <li
      v-for="({ name, id }, index) of items"
      :key="id || index"
    >
      {{ name }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
	value: unknown;
}>();

const items = computed<
	Array<{
		id?: PropertyKey;
		name?: unknown;
	}>
>(() => {
	return Array.isArray(props.value) ? props.value : [];
});
</script>

<style scoped></style>
