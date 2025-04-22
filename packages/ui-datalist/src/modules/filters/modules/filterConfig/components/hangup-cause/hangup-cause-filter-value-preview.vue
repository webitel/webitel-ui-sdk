<template>
  <ul>
    <li
      v-for="(hangupCause, index) of props.value"
      :key="index"
    >
      {{ hangupCause }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
const props = defineProps<{
  value: number[];
}>();
</script>

<style scoped></style>
