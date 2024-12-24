<template>
  <aside class="wt-table-actions">
    <slot />
    <wt-tooltip v-if="isImport">
      <template #activator>
        <wt-icon-btn
          icon="download"
          @click="$emit('input', 'import')"
        />
      </template>
      {{ $t('reusable.import') }}
    </wt-tooltip>
    <wt-tooltip v-if="isExport">
      <template #activator>
        <wt-icon-btn
          icon="upload"
          @click="$emit('input', 'export')"
        />
      </template>
      {{ $t('reusable.export') }}
    </wt-tooltip>
    <wt-tooltip v-if="isFilterReset">
      <template #activator>
        <wt-icon-btn
          icon="clear"
          @click="$emit('input', 'filterReset')"
        />
      </template>
      {{ $t('webitelUI.tableActions.filterReset') }}
    </wt-tooltip>
    <wt-tooltip v-if="isColumnSelect">
      <template #activator>
        <wt-icon-btn
          icon="column-select"
          @click="$emit('input', 'columnSelect')"
        />
      </template>
      {{ $t('webitelUI.tableActions.columnSelect') }}
    </wt-tooltip>
    <wt-tooltip v-if="isRefresh">
      <template #activator>
        <wt-icon-btn
          icon="refresh"
          @click="$emit('input', 'refresh')"
        />
      </template>
      {{ $t('webitelUI.tableActions.refreshTable') }}
    </wt-tooltip>
    <wt-tooltip v-if="isSettings">
      <template #activator>
        <wt-icon-btn
          :class="{'active': isSettingsActive}"
          icon="filter"
          @click="$emit('input', 'settings')"
        />
      </template>
      {{ $t('webitelUI.tableActions.expandFilters') }}
    </wt-tooltip>
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
@import './variables.scss';
</style>

<style lang="scss" scoped>

.wt-table-actions {
  display: flex;
  align-items: center;
  padding: var(--table-actions-padding);
  gap: var(--table-actions-icon-gap);
}
</style>
