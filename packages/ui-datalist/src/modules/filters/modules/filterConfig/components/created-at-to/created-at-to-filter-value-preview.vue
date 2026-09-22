<template>
  <div>{{ date }}</div>
</template>

<script lang="ts" setup>
import { FormatDateMode } from '@webitel/ui-sdk/enums';
import { formatDate } from '@webitel/ui-sdk/utils';
import { computed } from 'vue';

const props = defineProps<{
	value: number;
}>();

const date = computed(() => formatDate(+props.value, FormatDateMode.DATETIME));
</script>

<style scoped></style>
