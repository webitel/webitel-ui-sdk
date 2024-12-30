<template>
  <section class="dynamic-filter-preview-info">
    <header>{{ props.name }}</header>
    <div>{{ props.value }}</div>
    <footer>
      footer
    </footer>
  </section>
</template>

<script lang="ts" setup>
import type {FilterName, FilterValue} from "../../../types/Filter.types.ts";

interface Props {
  name: FilterName;
  value: FilterValue;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
//.dynamic-filter-preview-info {}
</style>
