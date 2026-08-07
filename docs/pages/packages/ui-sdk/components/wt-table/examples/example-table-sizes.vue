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
]);

const tabs = [
	{
		text: 'Small',
		value: 'sm',
	},
	{
		text: 'Normal',
		value: null,
	},
	{
		text: 'Large',
		value: 'lg',
	},
];

const currentSize = ref(tabs[1]);
</script>

<template>
  <wt-tabs
    :current="currentSize"
    :tabs="tabs"
    wide
    @change="currentSize = $event"
  />
  <wt-table
    style="margin-top: 20px"
    :headers="headers"
    :data="data"
    :size="currentSize.value"
  />
</template>

<style scoped lang="scss"></style>
