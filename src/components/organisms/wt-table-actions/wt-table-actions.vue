<template>
  <aside class="wt-table-actions">
    <slot></slot>
    <wt-tooltip>
      <template v-slot:activator>
        <wt-icon-btn
          v-if="isImport"
          icon="download"
          @click="$emit('input', 'import')"
        ></wt-icon-btn>
      </template>
      {{ $t('reusable.import') }}
    </wt-tooltip>
    <wt-tooltip>
      <template v-slot:activator>
        <wt-icon-btn
          v-if="isExport"
          icon="upload"
          @click="$emit('input', 'export')"
        ></wt-icon-btn>
      </template>
      {{ $t('reusable.export') }}
    </wt-tooltip>
    <wt-tooltip>
      <template v-slot:activator>
        <wt-icon-btn
          v-if="isFilterReset"
          icon="clear"
          @click="$emit('input', 'filterReset')"
        ></wt-icon-btn>
      </template>
      {{ $t('webitelUI.tableActions.filterReset') }}
    </wt-tooltip>
    <wt-tooltip>
      <template v-slot:activator>
        <wt-icon-btn
          v-if="isColumnSelect"
          icon="column-select"
          @click="$emit('input', 'columnSelect')"
        ></wt-icon-btn>
      </template>
      {{ $t('webitelUI.tableActions.columnSelect') }}
    </wt-tooltip>
    <wt-tooltip>
      <template v-slot:activator>
        <wt-icon-btn
          v-if="isRefresh"
          icon="refresh"
          @click="$emit('input', 'refresh')"
        ></wt-icon-btn>
      </template>
      {{ $t('webitelUI.tableActions.refreshTable') }}
    </wt-tooltip>
    <wt-tooltip>
      <template v-slot:activator>
        <wt-icon-btn
          v-if="isSettings"
          :class="{'active': isSettingsActive}"
          icon="filter"
          @click="$emit('input', 'settings')"
        ></wt-icon-btn>
      </template>
      {{ $t('webitelUI.tableActions.expandFilters') }}
    </wt-tooltip>
  </aside>
</template>

<script>
export default {
  name: 'wt-table-actions',
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
  align-items: center;
  padding: var(--table-actions-padding);
  gap: var(--table-actions-icon-gap);
}
</style>
