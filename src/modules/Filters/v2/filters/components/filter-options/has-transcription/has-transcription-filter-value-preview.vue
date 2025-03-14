<template>
  <div>{{ localeValue }}</div>
</template>

<script lang="ts" setup>
import {usePrettifyBooleanValuePreview} from "../_shared/composables/booleanFilterToolkit";

const props = defineProps<{
  value: boolean;
}>();

const {
  localeValue,
} = usePrettifyBooleanValuePreview(props.value);
</script>

<style lang="scss" scoped></style>
