<template>
  <wt-action-bar
    :include="tableActionsOrder"
    mode="table"
  >
    <template> default slot </template>
    <template #search-bar> searchbar slot </template>
    <template #delete> delete action slot </template>
  </wt-action-bar>
</template>

<script setup>
import { tableActionsOrder } from '__lib__/components/wt-action-bar/WtActionBarActionsOrder';
</script>

<style lang="scss" scoped>
.example-table-action-bar {
}
</style>
