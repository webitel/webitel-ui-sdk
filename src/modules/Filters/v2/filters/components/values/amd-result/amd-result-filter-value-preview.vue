<template>
  <ul>
    <li
      v-for="(result, index) of props.value"
      :key="index"
    >
      {{ result }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
const props = defineProps<{
  value: number[];
}>();


</script>

<style lang="scss" scoped></style>
