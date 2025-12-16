<template>
  <div>{{ date }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { formatDate } from '@webitel/ui-sdk/utils';
import { FormatDateMode } from '@webitel/ui-sdk/enums';

const props = defineProps<{
  value: number[];
}>();

const date = ref(formatDate(+props.value, FormatDateMode.DATETIME));
</script>

<style scoped></style>
