<template>
  <ul v-if="value">
    <li
      v-for="({ name, id }, index) of value"
      :key="id || index"
    >
      {{ name }}
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
