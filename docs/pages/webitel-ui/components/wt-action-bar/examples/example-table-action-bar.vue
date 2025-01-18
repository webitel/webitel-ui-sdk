<template>
  <wt-action-bar :include="tableActionsOrder" />
</template>

<script setup>
import { tableActionsOrder } from '__lib__/components/wt-action-bar/WtActionBarActionsOrder.js';
</script>

<style lang="scss" scoped>
.example-table-action-bar {
}
</style>
