<template>
  <aside class="wt-table-actions">
    <wt-icon-btn
      v-if="isImport"
      icon="download"
      :tooltip="$t('reusable.import')"
      @click="$emit('input', 'import')"
    ></wt-icon-btn>
    <wt-icon-btn
      v-if="isExport"
      icon="upload"
      :tooltip="$t('reusable.export')"
      @click="$emit('input', 'export')"
    ></wt-icon-btn>
    <wt-icon-btn
      v-if="isFilterReset"
      icon="reset_filters"
      :tooltip="$t('webitelUI.tableActions.filterReset')"
      @click="$emit('input', 'filterReset')"
    ></wt-icon-btn>
    <wt-icon-btn
      v-if="isColumnSelect"
      icon="column_select"
      :tooltip="$t('webitelUI.tableActions.columnSelect')"
      @click="$emit('input', 'columnSelect')"
    ></wt-icon-btn>
    <wt-icon-btn
      v-if="isRefresh"
      icon="refresh"
      :tooltip="$t('webitelUI.tableActions.refreshTable')"
      @click="$emit('input', 'refresh')"
    ></wt-icon-btn>
    <wt-icon-btn
      v-if="isSettings"
      :class="{'active': isSettingsActive}"
      icon="filter"
      :tooltip="$t('webitelUI.tableActions.expandFilters')"
      @click="$emit('input', 'settings')"
    ></wt-icon-btn>
  </aside>
</template>

<script>
export default {
  name: 'table-actions',
  props: {
    icons: {
      type: Array,
      default: () => ['refresh'],
    },
    isSettingsActive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isImport() {
      return this.icons.indexOf('import') !== -1;
    },
    isExport() {
      return this.icons.indexOf('export') !== -1;
    },
    isFilterReset() {
      return this.icons.indexOf('filter-reset') !== -1;
    },
    isColumnSelect() {
      return this.icons.indexOf('column-select') !== -1;
    },
    isRefresh() {
      return this.icons.indexOf('refresh') !== -1;
    },
    isSettings() {
      return this.icons.indexOf('settings') !== -1;
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-table-actions {
  display: flex;
  flex-wrap: wrap;

  .wt-icon-btn {
    margin-left: var(--table-actions-icon-gap);
  }
}
</style>
