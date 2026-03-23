<script setup>
import { ref } from 'vue';

import {
	allApiOptions,
	frameworkOptions as options,
} from './_internals/select-example-options.js';

const PAGE_SIZE = 10;

const searchMethod = async ({ search, page }) => {
	// simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 2000));

	const filtered = allApiOptions.filter(({ name }) =>
		name.toLowerCase().includes(search.toLowerCase()),
	);

	const offset = (page - 1) * PAGE_SIZE;
	const items = filtered.slice(offset, offset + PAGE_SIZE);
	const next = offset + PAGE_SIZE < filtered.length;

	return {
		items,
		next,
	};
};

const value = ref(options[0]);
const empty = ref('');
const apiValue = ref(allApiOptions[11]);
</script>

<template>
  <wt-select
    :value="value"
    :options="options"
    label="Select"
    track-by="name"
    @input="value = $event"
  />
  <wt-select
    :value="empty"
    :options="options"
    label="Select"
    track-by="name"
  />
</template>

<style scoped lang="scss"></style>
