<template>
  <ul>
    <li
      v-for="(type, index) of props.value"
      :key="index"
    >
      {{ type }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
const props = defineProps<{
  value: number[];
}>();
</script>

<style scoped></style>
