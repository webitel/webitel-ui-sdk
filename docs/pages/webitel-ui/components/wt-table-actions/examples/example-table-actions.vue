<script setup>
const callAlert = (arg) => alert(arg);
</script>

<template>
  <wt-table-actions
    :icons="[
      'import',
      'export',
      'filter-reset',
      'column-select',
      'refresh',
      'settings',
    ]"
    @input="callAlert"
  />
</template>

<style scoped lang="scss"></style>
