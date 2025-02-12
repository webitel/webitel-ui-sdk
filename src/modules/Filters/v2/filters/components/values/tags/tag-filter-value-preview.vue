<template>
  <ul>
    <li
      v-for="(tag, index) of value"
      :key="index"
    >
      {{ tag }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
const props = defineProps<{
  value: number[];
}>();
</script>

<style lang="scss" scoped></style>
