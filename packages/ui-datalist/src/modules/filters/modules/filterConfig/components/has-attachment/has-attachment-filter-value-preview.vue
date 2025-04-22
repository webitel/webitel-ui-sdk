<template>
  <div>{{ localeValue }}</div>
</template>

<script lang="ts" setup>
import { usePrettifyBooleanValuePreview } from '../../composables/booleanFilterToolkit';

const props = defineProps<{
  value: boolean;
}>();

const { localeValue } = usePrettifyBooleanValuePreview(props.value);
</script>

<style scoped></style>
