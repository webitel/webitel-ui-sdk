<template>
	<span>{{ formatted }}</span>
</template>

<script setup lang="ts">
import { FormatDateMode } from '../../enums';
import { formatDate } from '../../utils';
import { computed } from 'vue';

interface Props {
	/**
	 * Date/time value to display. Accepts a date string, Unix timestamp (ms), or Date object.
	 * @type {string | number | Date}
	 */
	datetime: string | number | Date;
	/**
	 * Display format mode.
	 * @type {FormatDateMode}
	 * @default FormatDateMode.DATETIME (datetime)
	 * @values 'date', 'time', 'timeSec', 'datetime', 'datetimeShort'
	 */
	mode?: FormatDateMode;
	/**
	 * IANA timezone identifier (e.g. 'Europe/Kyiv'). Falls back to the user's saved timezone or the browser timezone.
	 * @type {string}
	 */
	timezone?: string;
}

const props = withDefaults(defineProps<Props>(), {
	mode: FormatDateMode.DATETIME,
});

const formatted = computed(() =>
	formatDate(props.datetime, props.mode, {
		timezone: props.timezone,
	}),
);
</script>
