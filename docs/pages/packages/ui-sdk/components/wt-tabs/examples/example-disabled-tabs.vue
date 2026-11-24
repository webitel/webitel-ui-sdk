<script setup>
import { ref } from 'vue';

const tabs = [
	{
		text: 'Tab 1',
		value: '1',
	},
	{
		text: 'Tab 2',
		value: '2',
	},
	{
		text: 'Disabled',
		value: '3',
		disabled: true,
	},
];

const current = ref(tabs[0]);
</script>

<template>
  <wt-tabs
    :current="current"
    :tabs="tabs"
    @change="current = $event"
  />
</template>

<style scoped lang="scss"></style>
