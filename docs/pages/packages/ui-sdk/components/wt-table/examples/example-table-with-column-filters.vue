<script setup>
import { computed, reactive } from 'vue';

import ExampleColumnFilter from './example-column-filter.vue';

const priorityOptions = [
	{
		id: 'high',
		label: 'High',
	},
	{
		id: 'normal',
		label: 'Normal',
	},
	{
		id: 'low',
		label: 'Low',
	},
];

const filters = reactive({});

const headers = computed(() => [
	{
		text: 'Subject',
		value: 'subject',
		width: '280px',
	},
	{
		text: 'Priority',
		value: 'priority',
		filter: 'priority',
		filtered: !!filters.priority,
		options: priorityOptions,
	},
	{
		text: 'Author',
		value: 'author',
		filter: 'author',
		filtered: !!filters.author,
	},
]);

const data = [
	{
		id: 1,
		subject: 'Payment is not going through',
		priority: 'high',
		author: 'Anna Shevchenko',
	},
	{
		id: 2,
		subject: 'Cannot log in to the portal',
		priority: 'high',
		author: 'Ihor Melnyk',
	},
	{
		id: 3,
		subject: 'Change the billing address',
		priority: 'normal',
		author: 'Anna Shevchenko',
	},
	{
		id: 4,
		subject: 'Request a new SIP account',
		priority: 'normal',
		author: 'Olena Kravets',
	},
	{
		id: 5,
		subject: 'Typo on the invoice template',
		priority: 'low',
		author: 'Ihor Melnyk',
	},
];

const shownData = computed(() =>
	data.filter((row) =>
		Object.entries(filters).every(([name, value]) =>
			String(row[name]).toLowerCase().includes(String(value).toLowerCase()),
		),
	),
);

const addFilter = ({ name, value }) => {
	filters[name] = value;
};

const deleteFilter = ({ name }) => {
	delete filters[name];
};
</script>

<template>
  <wt-table
    :headers="headers"
    :data="shownData"
  >
    <template #column-filter="{ header, formView, hide }">
      <example-column-filter
        :header="header"
        :form-view="formView"
        :hide="hide"
        :value="filters[header.value] || ''"
        @apply="addFilter"
        @clear="deleteFilter"
      />
    </template>
  </wt-table>
</template>

<style scoped lang="scss"></style>
