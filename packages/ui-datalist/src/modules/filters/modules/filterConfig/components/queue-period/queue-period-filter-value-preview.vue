<template>
  <ul>
    <li
      v-for="(period, index) of props.value"
      :key="index"
    >
      {{ period }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
const props = defineProps<{
  value: number[];
}>();
</script>

<style scoped></style>
