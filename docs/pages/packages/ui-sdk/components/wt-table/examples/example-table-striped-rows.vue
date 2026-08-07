<script setup>
import { ref } from 'vue';

const headers = [
	{
		text: 'heading 1',
		value: 'h1',
	},
	{
		text: 'heading2',
		value: 'h2',
	},
	{
		text: 'heading 3',
		value: 'h3',
	},
];

const data = ref([
	{
		id: 'id1',
		h1: 'value 1',
		h2: 'value 2',
		h3: 'value 3',
		_isSelected: false,
	},
	{
		id: 'id2',
		h1: 'value 1',
		h2: 'value 4',
		h3: 'value 3',
		_isSelected: false,
	},
	{
		id: 'id3',
		h1: 'value 1',
		h2: 'value 2',
		h3: 'value 3',
		_isSelected: false,
	},
	{
		id: 'id4',
		h1: 'value 1',
		h2: 'value 2',
		h3: 'value 3',
		_isSelected: false,
	},
]);
</script>

<template>
  <wt-table
    :headers="headers"
    :data="data"
    striped-rows
  />
</template>

<style scoped lang="scss"></style>
