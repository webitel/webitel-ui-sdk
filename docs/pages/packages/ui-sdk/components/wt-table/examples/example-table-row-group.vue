<script setup>
import { ref } from 'vue';

const headers = [
	{
		text: 'name',
		value: 'name',
		field: 'name',
	},
	{
		text: 'category',
		value: 'category',
		field: 'category',
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
		name: 'Mango',
		category: 'Fruits',
		_isSelected: false,
	},
	{
		id: 'id5',
		name: 'Carrot',
		category: 'Vegetables',
		_isSelected: false,
	},
	{
		id: 'id6',
		name: 'Potato',
		category: 'Vegetables',
		_isSelected: false,
	},
	{
		id: 'id7',
		name: 'Broccoli',
		category: 'Vegetables',
		_isSelected: false,
	},
	{
		id: 'id8',
		name: 'Onion',
		category: 'Vegetables',
		_isSelected: false,
	},
	{
		id: 'id9',
		name: 'Almond',
		category: 'Nuts',
		_isSelected: false,
	},
	{
		id: 'id10',
		name: 'Walnut',
		category: 'Nuts',
		_isSelected: false,
	},
	{
		id: 'id11',
		name: 'Cashew',
		category: 'Nuts',
		_isSelected: false,
	},
	{
		id: 'id12',
		name: 'Salmon',
		category: 'Seafood',
		_isSelected: false,
	},
	{
		id: 'id13',
		name: 'Shrimp',
		category: 'Seafood',
		_isSelected: false,
	},
	{
		id: 'id14',
		name: 'Tuna',
		category: 'Seafood',
		_isSelected: false,
	},
]);
</script>

<template>
  <div style="height: 300px">
    <wt-table
      :headers="headers"
      :data="data"
      :selectable="false"
      row-group-mode="subheader"
      group-rows-by="category"
      sortable
    >
      <template #groupheader="{ item }">
        <strong>{{ item.category }}</strong>
      </template>
    </wt-table>
  </div>
</template>

<style scoped lang="scss"></style>
