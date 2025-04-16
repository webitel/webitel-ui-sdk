<template>
  <ul v-if="value">
    <li
      v-for="({ label }, index) of value"
      :key="index"
    >
      {{ label }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
defineProps<{
  /**
   * would be great to use a type for this
   * */
  value: Record<string, unknown>[];
}>();
</script>

<style scoped></style>
