<script setup>
import { ref } from 'vue';

const headers = [
	{
		text: 'category',
		value: 'category',
		field: 'category',
	},
	{
		text: 'name',
		value: 'name',
		field: 'name',
	},
];

const data = ref([
	{
		id: 'id1',
		name: 'Apple',
		category: 'Fruits',
		_isSelected: false,
	},
	{
		id: 'id2',
		name: 'Banana',
		category: 'Fruits',
		_isSelected: false,
	},
	{
		id: 'id3',
		name: 'Orange',
		category: 'Fruits',
		_isSelected: false,
	},
	{
		id: 'id4',
		name: 'Carrot',
		category: 'Vegetables',
		_isSelected: false,
	},
	{
		id: 'id5',
		name: 'Potato',
		category: 'Vegetables',
		_isSelected: false,
	},
	{
		id: 'id6',
		name: 'Almond',
		category: 'Nuts',
		_isSelected: false,
	},
	{
		id: 'id7',
		name: 'Walnut',
		category: 'Nuts',
		_isSelected: false,
	},
	{
		id: 'id8',
		name: 'Cashew',
		category: 'Nuts',
		_isSelected: false,
	},
]);
</script>

<template>
  <wt-table
    :headers="headers"
    :data="data"
    :selectable="false"
    row-group-mode="rowspan"
    group-rows-by="category"
  />
</template>

<style scoped lang="scss"></style>
