<template>
  <wt-action-bar
    :actions="tableActionsOrder"
    mode="table"
  >
    <template>
      default slot
    </template>
    <template #search-bar>
      searchbar slot
    </template>
    <template
      #delete
    >
      delete action slot
    </template>
  </wt-action-bar>
</template>

<script setup>
import { tableActionsOrder } from '__lib__/components/wt-action-bar/WtActionBarActionsOrder.js';
</script>

<style lang="scss" scoped>
.example-table-action-bar {

}
</style>
