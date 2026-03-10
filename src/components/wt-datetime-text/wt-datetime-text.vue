<template>
	<span>{{ formatted }}</span>
</template>

<script setup lang="ts">
import { FormatDateMode } from '../../enums';
import { formatDate } from '../../utils';
import { computed } from 'vue';

const props = defineProps<{
	datetime: string | number | Date;
	mode?: FormatDateMode;
	timezone?: string;
}>();

const formatted = computed(() =>
	formatDate(props.datetime, props.mode ?? FormatDateMode.DATETIME, {
		timezone: props.timezone,
	}),
);
</script>
