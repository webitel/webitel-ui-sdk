<template>
  <wt-icon-btn
    class="table-action"
    icon="edit"
    :tooltip="$t('webitelUI.table.tableCells.editActionHint')"
    tooltip-position="left"
    @click="$emit('click')"
  ></wt-icon-btn>
</template>

<script>
export default {
  name: 'wt-table-edit-action',
};
</script>

<style scoped>

</style>
