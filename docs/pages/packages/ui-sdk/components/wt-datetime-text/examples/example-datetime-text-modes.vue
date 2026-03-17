<script setup>
const now = new Date();

const modes = [
	{
		mode: 'date',
		label: 'date',
	},
	{
		mode: 'time',
		label: 'time',
	},
	{
		mode: 'timeSec',
		label: 'timeSec',
	},
	{
		mode: 'datetime',
		label: 'datetime (default)',
	},
	{
		mode: 'datetimeShort',
		label: 'datetimeShort',
	},
];
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <div
      v-for="{ mode, label } of modes"
      :key="mode"
      style="display: flex; gap: 16px; align-items: center"
    >
      <code style="min-width: 140px">{{ label }}</code>
      <wt-datetime-text :datetime="now" :mode="mode" />
    </div>
  </div>
</template>
