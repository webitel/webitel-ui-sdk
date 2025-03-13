<template>
  <div>{{date}}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  value: number[];
}>();

const date = ref(new Date(+props.value).toLocaleString());
</script>

<style lang="scss" scoped></style>
