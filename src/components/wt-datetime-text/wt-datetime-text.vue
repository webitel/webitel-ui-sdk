<template>
	<span>{{ formatted }}</span>
</template>

<script setup lang="ts">
import { FormatDateMode } from '../../enums';
import { formatDate } from '../../utils';
import { computed } from 'vue';

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
