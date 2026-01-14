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

    <wt-badge 
      :hidden="!isSettingsBadge"
    >
      <wt-icon-btn
        v-if="isSettings"
        v-tooltip="$t('webitelUI.tableActions.expandFilters')"
        :class="{ active: isSettingsActive }"
        icon="filter"
        @click="$emit('input', 'settings')"
      />
    </wt-badge>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/**
 * @emits {string} input - Fires when action button is clicked. Emits button name: [import, export, filter-reset, column-select, refresh, settings]
 */
interface Props {
	/**
	 * Array of icon names to display
	 * @type {string[]}
	 * @default ['refresh']
	 * @options ['import', 'export', 'filter-reset', 'column-select', 'refresh', 'settings']
	 */
	icons?: string[];
	/**
	 * Marks settings button as active
	 * @type {boolean}
	 * @default false
	 */
	isSettingsActive?: boolean;
	/**
	 * Shows badge on settings button
	 * @type {boolean}
	 * @default false
	 */
	isSettingsBadge?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	icons: () => [
		'refresh',
	],
	isSettingsActive: false,
	isSettingsBadge: false,
});

defineEmits<{
	input: [
		value: string,
	];
}>();

const isImport = computed(() => props.icons.indexOf('import') !== -1);
const isExport = computed(() => props.icons.indexOf('export') !== -1);
const isFilterReset = computed(
	() => props.icons.indexOf('filter-reset') !== -1,
);
const isColumnSelect = computed(
	() => props.icons.indexOf('column-select') !== -1,
);
const isRefresh = computed(() => props.icons.indexOf('refresh') !== -1);
const isSettings = computed(() => props.icons.indexOf('settings') !== -1);
</script>

<style scoped>
.wt-table-actions {
  display: flex;
  align-items: center;
  gap: var(--table-actions-icon-gap);
  padding: var(--table-actions-padding);
}
</style>
