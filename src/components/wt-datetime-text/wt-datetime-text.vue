<template>
	<span>{{ formatted }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { FormatDateMode } from '../../enums';
import { formatDate } from '../../utils';

const props = withDefaults(
	defineProps<{
		datetime: string | number | Date;
		mode?: FormatDateMode;
		timezone?: string;
	}>(),
	{
		mode: FormatDateMode.DATETIME,
	},
);

const formatted = computed(() =>
	formatDate(props.datetime, props.mode, {
		timezone: props.timezone,
	}),
);
</script>
