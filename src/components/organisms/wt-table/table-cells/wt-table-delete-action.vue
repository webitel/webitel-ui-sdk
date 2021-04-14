<template>
  <wt-icon-btn
    icon="bucket"
    :tooltip="$t('webitelUI.table.tableCells.deleteActionHint')"
    tooltip-position="left"
    @click="$emit('click')"
  ></wt-icon-btn>
</template>

<script>
export default {
  name: 'wt-table-delete-action',
};
</script>

<style scoped>

</style>
