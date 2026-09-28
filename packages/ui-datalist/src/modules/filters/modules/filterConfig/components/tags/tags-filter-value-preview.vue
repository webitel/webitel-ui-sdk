<template>
  <ul v-if="tags.length">
    <li
      v-for="(tag, index) of tags"
      :key="index"
    >
      {{ tag }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import type { IFilter } from '../../../../classes/Filter';

const props = defineProps<{
	filter: IFilter;
}>();

const tags = computed(() => (props.filter.value as string[] | undefined) ?? []);
</script>

<style scoped></style>
