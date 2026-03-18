<script setup>
import { FormatDateMode } from '__lib__/enums';

const now = new Date();

const modes = [
	{
		mode: FormatDateMode.DATE,
		label: 'FormatDateMode.DATE',
	},
	{
		mode: FormatDateMode.TIME,
		label: 'FormatDateMode.TIME',
	},
	{
		mode: FormatDateMode.TIME_SEC,
		label: 'FormatDateMode.TIME_SEC',
	},
	{
		mode: FormatDateMode.DATETIME,
		label: 'FormatDateMode.DATETIME (default)',
	},
	{
		mode: FormatDateMode.DATETIME_SHORT,
		label: 'FormatDateMode.DATETIME_SHORT',
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
