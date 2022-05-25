<template>
  <wt-tooltip>
    <template v-slot:activator>
      <wt-icon-btn
        class="table-action"
        icon="edit"
        @click="$emit('click')"
      ></wt-icon-btn>
    </template>
    {{ $t('webitelUI.table.tableCells.editActionHint') }}
  </wt-tooltip>
</template>

<script>
export default {
  name: 'wt-table-edit-action',
};
</script>

<style scoped>

</style>
