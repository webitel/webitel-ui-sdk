<template>
  <aside class="wt-table-actions">
    <slot />

    <wt-icon-btn
      v-if="isImport"
      v-tooltip="$t('reusable.import')"
      icon="download"
      @click="$emit('input', 'import')"
    />

    <wt-icon-btn
      v-if="isExport"
      v-tooltip="$t('reusable.export')"
      icon="upload"
      @click="$emit('input', 'export')"
    />

    <wt-icon-btn
      v-if="isFilterReset"
      v-tooltip="$t('webitelUI.tableActions.filterReset')"
      icon="clear"
      @click="$emit('input', 'filterReset')"
    />

    <wt-icon-btn
      v-if="isColumnSelect"
      v-tooltip="$t('webitelUI.tableActions.columnSelect')"
      icon="column-select"
      @click="$emit('input', 'columnSelect')"
    />

    <wt-icon-btn
      v-if="isRefresh"
      v-tooltip="$t('webitelUI.tableActions.refreshTable')"
      icon="refresh"
      @click="$emit('input', 'refresh')"
    />

    <wt-icon-btn
      v-if="isSettings"
      v-tooltip="$t('webitelUI.tableActions.expandFilters')"
      :class="{ active: isSettingsActive }"
      icon="filter"
      @click="$emit('input', 'settings')"
    />
  </aside>
</template>

<script>
export default {
  name: 'WtTableActions',
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

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
.wt-table-actions {
  display: flex;
  align-items: center;
  gap: var(--table-actions-icon-gap);
  padding: var(--table-actions-padding);
}
</style>
