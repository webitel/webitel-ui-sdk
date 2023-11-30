<script setup>

const actions = [
  'delete',
  'edit',
  'add',
  'history',
  'download',
  'refresh',
];

</script>

<template>
  <wt-icon-action
    v-for="action in actions"
    :action="action"
    :key="action"
  ></wt-icon-action>
</template>

<style scoped lang="scss">

</style>
