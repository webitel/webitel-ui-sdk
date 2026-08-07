<script setup>
import { ref } from 'vue';

const headers = [
	{
		text: 'heading 1',
		value: 'h1',
	},
	{
		text: 'heading 2',
		value: 'h2',
	},
	{
		text: 'heading 3',
		value: 'h3',
	},
];

const frozenData = ref([
	{
		id: 'pinned1',
		h1: 'Pinned row',
		h2: 'stays visible',
		h3: 'while scrolling',
		_isSelected: false,
	},
]);

const data = ref(
	Array.from(
		{
			length: 20,
		},
		(_, index) => ({
			id: `id${index}`,
			h1: `value ${index}`,
			h2: `value ${index}`,
			h3: `value ${index}`,
			_isSelected: false,
		}),
	),
);
</script>

<template>
  <div style="height: 300px">
    <wt-table
      :headers="headers"
      :data="data"
      :frozen-data="frozenData"
    />
  </div>
</template>

<style scoped lang="scss"></style>
