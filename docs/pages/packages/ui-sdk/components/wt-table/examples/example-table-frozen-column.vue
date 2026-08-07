<script setup>
import { ref } from 'vue';

const headers = [
	{
		text: 'heading 1',
		value: 'h1',
		frozen: true,
	},
	{
		text: 'heading 2',
		value: 'h2',
	},
	{
		text: 'heading 3',
		value: 'h3',
	},
	{
		text: 'heading 4',
		value: 'h4',
	},
	{
		text: 'heading 5',
		value: 'h5',
	},
	{
		text: 'heading 6',
		value: 'h6',
	},
	{
		text: 'heading 7',
		value: 'h7',
	},
];

const data = ref([
	{
		id: 'id1',
		h1: 'value 1',
		h2: 'value 2',
		h3: 'value 3',
		h4: 'value 4',
		h5: 'value 5',
		h6: 'value 6',
		h7: 'value 7',
		_isSelected: false,
	},
	{
		id: 'id2',
		h1: 'value 1',
		h2: 'value 2',
		h3: 'value 3',
		h4: 'value 4',
		h5: 'value 5',
		h6: 'value 6',
		h7: 'value 7',
		_isSelected: false,
	},
]);
</script>

<template>
  <div style="max-width: 500px">
    <wt-table
      :headers="headers"
      :data="data"
    />
  </div>
</template>

<style scoped lang="scss"></style>
