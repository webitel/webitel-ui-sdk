<template>
  <div class="wt-table">
    <div
      v-if="isEmptyOverlayActive"
      class="wt-table__empty"
    >
      <slot name="empty" />
    </div>
    <p-table
    :key="tableKey"
    ref="table"
    :expanded-rows="expandedRows"
    :reorderable-columns="reorderableColumns"
    :resizable-columns="resizableColumns"
    :row-class="rowClass"
    :row-style="rowStyle"
    :show-headers="!headless"
    :striped-rows="stripedRows"
    :value="data"
    :sort-field="sortField"
    :data-key="props.dataKey"
    :class="{ 'wt-table__wrapper--overlay': isEmptyOverlayActive }"
    class="wt-table__wrapper"
    column-resize-mode="expand"
    lazy
    scroll-height="flex"
    scrollable
    :virtual-scroller-options="virtualScroll"
    :pt="{
      tableContainer: 'wt-scrollbar'
    }"
    @sort="sort"
    @update:expanded-rows="expandedRows = $event"
    @column-resize-end="columnResize"
    @column-reorder="columnReorder"
    @row-reorder="onRowReorder"
  >
    <p-column
      v-if="rowExpansion"
      :pt="{
        columnresizer: {
          class: {
            'hidden': true
          }
        }
      }"
      :reorderable-column="false"
      body-style="width: 1%;"
      column-key="row-expander"
      header-style="width: 1%;"
    >
      <template #body="{ data: row }">
        <wt-icon-btn
          :disabled="props.rowExpansionDisabled(row)"
          :icon="isRowExpanded(row) ? 'arrow-down' : 'arrow-right'"
          @click.stop="toggleRow(row)"
        />
      </template>
    </p-column>
    <p-column
      v-if="rowReorder"
      :pt="{
        columnresizer: {
          class: {
            'hidden': true
          }
        }
      }"
      :reorderable-column="false"
      body-style="width: 1%;"
      column-key="row-reorder"
      header-style="width: 1%;"
      row-reorder
    >
      <template #body="{ data: row }">
        <wt-icon
          v-if="!isRowReorderDisabled(row)"
          data-pc-section="reorderablerowhandle"
          icon="move"
        />
      </template>
    </p-column>
    <p-column
      v-if="selectable"
      :pt="{
        columnresizer: {
          class: {
            'hidden': true
          }
        }
      }"
      :reorderable-column="false"
      body-style="width: 1%;"
      column-key="row-select"
      header-style="width: 1%;"
    >
      <template #header>
        <wt-checkbox
          :selected="isAllSelected"
          @update:selected="selectAll"
        />
      </template>
      <template #body="{ data: row }">
        <!-- check if row exists to prevent rendering errors -->
        <wt-checkbox
          v-if="row"
          :selected="_selected.includes(row)"
          @update:selected="handleSelection(row, $event)"
        />
      </template>
    </p-column>
    <p-column
      v-for="(col, idx) of dataHeaders"
      :key="col.value"
      :column-key="col.field || col.value"
      :field="col.field"
      :reorderable-column="col.reorderable !== false"
      :hidden="isColumnHidden(col)"
      :pt="{
        root: {
          'data-column-field': col.field      // required for column-resizer to get column field
        }
      }"
      :sortable="isColSortable(col)"
    >
      <template #header>
        <slot
          :index="idx"
          :header="col"
          :name="`header-${col.value}`"
        >
          <div
            :style="columnStyle(col)"
            class="wt-table__th__content typo-body-1-bold"
          >
            <span
              v-tooltip="col.text"
              class="wt-table__th__title"
            >
              {{ col.text }}
            </span>
            <wt-icon
              v-if="col.sort === 'asc'"
              class="wt-table__th__sort-arrow wt-table__th__sort-arrow--asc"
              icon="sort-arrow-up"
              size="sm"
            />
            <wt-icon
              v-else-if="col.sort === 'desc'"
              class="wt-table__th__sort-arrow wt-table__th__sort-arrow--desc"
              icon="sort-arrow-down"
              size="sm"
            />
            <wt-table-column-filter
              v-if="col.filter && $slots['column-filter']"
              :active="activeFilters.includes(col.filter)"
            >
              <template #default="{ hide }">
                <!--
                @slot Column filter content, rendered for every header that has a `filter` name. One slot for all columns: `formView` is true inside the filter popover and false inside the hover card shown while the filter name is in `activeFilters`.
                @scope [ { "name": "header", "description": "Header object of the column" }, { "name": "index", "description": "Column index" }, { "name": "formView", "description": "true for the filter form, false for the hover preview" }, { "name": "hide", "description": "Closes the popover (form view only)" } ]
                -->
                <slot
                  :header="col"
                  :hide="hide"
                  :index="idx"
                  :form-view="true"
                  name="column-filter"
                />
              </template>
              <template #preview>
                <slot
                  :header="col"
                  :index="idx"
                  :form-view="false"
                  name="column-filter"
                />
              </template>
            </wt-table-column-filter>
          </div>
        </slot>
      </template>
      <template #body="{ data: row, index }">
        <!--
        @slot Customize data columns. Recommended for representing nested data structures like object or array, and adding specific elements like select or chip
        @scope [ { "name": "item", "description": "Data row object" }, { "name": "index", "description": "Data row index" } ]
        -->
        <div
          :style="columnStyle(col)"
          class="wt-table__td__content typo-body-1"
        >
          <!-- check if row exists (under certain conditions row can be missing, e.g., during async data loading)
               this guard prevents rendering errors and keeps the table stable -->
          <slot
            v-if="row"
            :index="index"
            :item="row"
            :name="col.value"
          >{{ row[col.value] }}</slot>
        </div>
      </template>
      <!-- empty sorticon slot for hiding default sort icon, custom icon is rendered in header -->
      <template #sorticon>
      </template>
      <template
        v-if="isTableColumnFooters"
        #footer
      >
        <!--
        @slot Add your custom aggregations for column in table footer. Table footer is rendered conditionally depending on templates with "-footer" name
        @scope [ { "name": "header", "description": "header object" } ]
        -->
        <slot :name="`${col.value}-footer`" />
      </template>
    </p-column>
    <p-column
      v-if="gridActions"
      :frozen="fixedActions"
      :reorderable-column="false"
      align-frozen="right"
      column-key="row-actions"
      style="width: 112px;"
    >
      <template #header>
        <!--    @slot Table head actions row slot -->
        <slot name="actions-header" />
      </template>
      <template #body="{ data: actionsData, index }">
        <!--
        @slot Table body actions row slot
        @scope [ { "name": "item", "description": "Data row object" }, { "name": "index", "description": "Data row index" } ]
        -->
        <div class="wt-table__td__actions">
          <!-- check if row exists to prevent rendering errors -->
          <slot
            v-if="actionsData"
            :index="index"
            :item="actionsData"
            name="actions"
          />
        </div>
      </template>
    </p-column>
    <template #expansion="{ data: row }">
      <div>
        <slot
          :item="row"
          name="expansion"
        ></slot>
      </div>
    </template>
    <template
      v-if="isTableFooter"
      #footer
    >
      <slot name="footer" />
    </template>
    <template
      v-if="$slots['empty']"
      #empty
    >
      <slot
        v-if="!isEmptyOverlayActive"
        name="empty"
      />
    </template>
    </p-table>
  </div>
</template>

<script lang="ts" setup>
import { SortSymbols } from '@webitel/ui-sdk/scripts/sortQueryAdapters';
import type { DataTableProps } from 'primevue';
import type { VirtualScrollerLazyEvent } from 'primevue/virtualscroller';
import {
	computed,
	nextTick,
	onMounted,
	onUnmounted,
	ref,
	useSlots,
	useTemplateRef,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { getNextSortOrder } from '../../scripts/sortQueryAdapters.js';
import { useTableColumnDrag } from '../_internals/composables';
import WtTableColumnFilter from './_internals/wt-table-column-filter.vue';
import type { WtTableHeader, WtTableRow } from './types/WtTable';

const DEFAULT_ITEM_SIZE = 40;

interface Props extends DataTableProps {
	/**
	 * 'Accepts list of header objects. Draws text depending on "text" property, looks for data values through "value", "show" boolean controls visibility of a column (if undefined, all visible by default). ' Column width is calculated by "width" param. By default, sets 140px. '
	 */
	headers?: WtTableHeader[];
	/**
	 * 'List of data, represented by table. '
	 */
	data?: WtTableRow[];
	/**
	 * 'If true, draws sorting arrows and sends sorting events at header click. Draws a sorting arrow by "sort": "asc"/"desc" header value. '
	 */
	sortable?: boolean;
	/**
	 * Names of currently applied filters. A header whose `filter` name is listed here gets a badge on the filter icon.
	 * Popover content and hover card both come from the `column-filter` slot (`formView` scope).
	 *
	 * [WTEL-7727](https://webitel.atlassian.net/browse/WTEL-7727)
	 */
	activeFilters?: string[];
	/**
	 * 'If true, draws row selection checkboxes. Checkbox toggles data object _isSelected property. It's IMPORTANT to set this property before sending data to table. '
	 */
	selectable?: boolean;
	selected?: Array<unknown>;
	/**
	 * 'If true, reserves space for 3 icon actions in the last column. Accessible by "actions" slot. '
	 */
	gridActions?: boolean;
	/**
	 * 'If true, 3 icon actions in the last column have position:sticky and fixed on the right'
	 */
	fixedActions?: boolean;
	/**
	 * 'If true, displays table without header.'
	 */
	headless?: boolean;
	/**
	 * 'If true, applies alternating row background colors.'
	 */
	stripedRows?: boolean;
	/**
	 * 'If true, allows to reorder rows.'
	 */
	rowReorder?: boolean;
	/**
	 * @author @Oleksandr Palonnyi
	 *
	 * [WTEL-8629](https://webitel.atlassian.net/browse/WTEL-8629)
	 *
	 * Unique field name used to identify a row.
	 * Required for selection, expansion, and virtual scrolling to work correctly.
	 * The value must be stable and unique across all rows.
	 */
	dataKey?: string;
	/**
	 * 'If true, restrict sprecific row reorder.'
	 */
	isRowReorderDisabled?: (row: WtTableRow) => boolean;
	rowExpansion?: boolean;
	rowClass?: (data: WtTableRow) => string;
	rowStyle?: () => {
		[key: string]: string;
	};
	resizableColumns?: boolean;
	reorderableColumns?: boolean;
	rowExpansionDisabled?: (row: object) => boolean;

	//lazy loading
	lazy?: boolean;
	onLoading?: (event: VirtualScrollerLazyEvent) => Promise<unknown>;
	loading?: boolean;
	itemSize?: number | undefined;
}

const props = withDefaults(defineProps<Props>(), {
	headers: () => [],
	data: () => [],
	sortable: false,
	activeFilters: () => [],
	selectable: true,
	gridActions: true,
	fixedActions: false,
	headless: false,
	rowReorder: false,
	rowExpansion: false,
	stripedRows: false,
	isRowReorderDisabled: () => false,
	rowClass: () => '',
	rowStyle: () => ({}),
	resizableColumns: false,
	reorderableColumns: false,
	rowExpansionDisabled: () => false,
	lazy: false,
	itemSize: DEFAULT_ITEM_SIZE,
	dataKey: '',
});

const { t } = useI18n();

const slots = useSlots();

const emit = defineEmits([
	'sort',
	'update:selected',
	'reorder:row',
	'column-resize',
	'column-reorder',
]);

const onRowReorder = ({
	dragIndex,
	dropIndex,
}: {
	dragIndex: number;
	dropIndex: number;
}) =>
	emit('reorder:row', {
		oldIndex: dragIndex,
		newIndex: dropIndex,
	});

const table = useTemplateRef('table');
const tableKey = ref(0);
const expandedRows = ref<WtTableRow[]>([]);

const { addTableDragListener, removeTableDragListener } = useTableColumnDrag(
	table,
	props.reorderableColumns,
);

const _selected = computed(() => {
	// _isSelected for backwards compatibility
	return props.selectable
		? props.selected ||
				props.data.filter((item: WtTableRow) => item._isSelected)
		: [];
});

const dataHeaders = computed(() => {
	const headers = props.headers.map((header) => {
		if (!header.text && header.locale)
			return {
				...header,
				text:
					typeof header.locale === 'string'
						? t(header.locale)
						: t(
								...(header.locale as [
									string,
								]),
							),
			};
		return header;
	});

	// non-reorderable columns are kept at the start, so they stay in place
	// while the rest of the columns can be freely reordered
	const nonReorderable = headers.filter(
		(header) => header.reorderable === false,
	);
	const reorderable = headers.filter((header) => header.reorderable !== false);
	return [
		...nonReorderable,
		...reorderable,
	];
});

// table's columns that should be excluded from reorder
const excludeStaticColumnsFromReorder = [
	'row-select',
	'row-reorder',
	'row-actions',
	'row-expander',
];

const excludeColumnsFromReorder = computed(() => [
	...dataHeaders.value
		.filter((col) => col.reorderable === false)
		.map((col) => col.field || col.value),
	...excludeStaticColumnsFromReorder,
]);

const isColumnHidden = (col: WtTableHeader) => {
	return col.show === false;
};

const columnStyle = (col: WtTableHeader) => {
	const baseWidth = 140;

	return {
		minWidth: col.width || `${baseWidth}px`,
	};
};

const isTableColumnFooters = computed(() => {
	return Object.keys(slots).some((slotName) => slotName.includes('-footer'));
});

const isTableFooter = computed(() => {
	return Object.keys(slots).some((slotName) => slotName === 'footer');
});

const isEmptyOverlayActive = computed(() => {
	return (
		!!slots['empty'] &&
		!!slots['column-filter'] &&
		!props.loading &&
		!props.data.length
	);
});

const isAllSelected = computed(() => {
	return _selected.value.length === props.data.length && props.data.length > 0;
});

/*
 * @author @Lera24
 * [WTEL-9194] https://webitel.atlassian.net/browse/WTEL-9192
 * save sorted the value field to apply it after reload
 * */
const sortField = computed(() => {
	const sortedCol = props.headers.find(
		(h) => h.sort === SortSymbols.ASC || h.sort === SortSymbols.DESC,
	);
	return sortedCol?.field ?? null;
});

const sort = ({ sortField }: { sortField: string }) => {
	const col = dataHeaders.value.find((header) => header.field === sortField);
	if (!col || !isColSortable(col)) return;
	const nextSort = getNextSortOrder(col.sort);
	emit('sort', col, nextSort);
};

const isColSortable = ({ sort }: Pick<WtTableHeader, 'sort'>) => {
	/*       --sortable = sortable && col.sort === undefined cause there may be some columns we don't want to sort
            strict check for  === undefined is used because col.sort = null is sort order too (actualu, without sort)
            so we need to check if this property is present
    */
	return props.sortable && sort !== undefined;
};

const selectAll = () => {
	if (props.selected) {
		if (isAllSelected.value) {
			emit('update:selected', []);
		} else {
			emit('update:selected', [
				...props.data,
			]);
		}
	} else {
		// for backwards compatibility

		// https://webitel.atlassian.net/browse/WTEL-4634
		// Value for _isSelected must be assigned explicitly.
		// Because allSelected recomputes after each change

		if (isAllSelected.value) {
			props.data.forEach((item: WtTableRow) => {
				item._isSelected = false;
			});
		} else {
			props.data.forEach((item: WtTableRow) => {
				item._isSelected = true;
			});
		}
	}
};

const handleSelection = (row: WtTableRow, select: boolean) => {
	if (props.selected) {
		if (select) {
			emit('update:selected', [
				..._selected.value,
				row,
			]);
		} else {
			emit(
				'update:selected',
				_selected.value.filter((item) => item !== row),
			);
		}
	} else {
		// for backwards compatibility
		row._isSelected = !row._isSelected;
	}
};

const columnResize = ({ element }: { element: HTMLElement }) => {
	// getting column name by custom attribute due Primevue does not provide it
	const field = element.getAttribute('data-column-field');

	const computedStyle = getComputedStyle(element);
	const paddingLeft = Number.parseFloat(computedStyle.paddingLeft);
	const paddingRight = Number.parseFloat(computedStyle.paddingRight);

	const columnWidth = element.offsetWidth - paddingLeft - paddingRight;

	emit('column-resize', {
		columnName: field,
		columnWidth: `${columnWidth}px`,
	});
};

const columnReorder = () => {
	const containerEl = table.value?.$el?.querySelector(
		'.p-datatable-table-container',
	);
	const containerElScrollLeft = containerEl?.scrollLeft;
	const newOrder = table.value?.d_columnOrder.filter(
		(col: string) => !excludeColumnsFromReorder.value.includes(col),
	);
	tableKey.value += 1;
	emit('column-reorder', newOrder);
	nextTick(() => {
		addTableDragListener();
		const container = table.value?.$el?.querySelector(
			'.p-datatable-table-container',
		);
		if (container) container.scrollLeft = containerElScrollLeft;
	});
};

const isRowExpanded = (row: WtTableRow) => {
	return expandedRows.value.some((r) => r?.id === row?.id);
};

const toggleRow = (row: WtTableRow) => {
	const index = expandedRows.value.findIndex((r) => r.id === row.id);
	if (index !== -1) {
		expandedRows.value.splice(index, 1);
	} else {
		expandedRows.value.push(row);
	}
};

const virtualScroll = computed(() => {
	if (!props.lazy) return;

	return {
		lazy: props.lazy,
		onLazyLoad: props.onLoading,
		itemSize: props.itemSize, // The height/width of item according to orientation
		numToleratedItems: props.data.length, // Number of items to pre-render outside visible area
		totalRecords: props.data.length,
		autoSize: true, // Enable auto height recalculation
	};
});

onMounted(() => {
	addTableDragListener();
});

onUnmounted(() => {
	removeTableDragListener();
});
</script>

<style scoped>
.wt-table {
  position: relative;
  overflow: auto;
  height: 100%;
}

.wt-table__wrapper {
  height: 100%;
}

/* style for virtual scroller */
.wt-table :deep(.wt-table__th__content) {
  display: flex;
  flex-grow: 1;
  align-items: center;
  gap: var(--spacing-2xs);
  width: 0;
  white-space: nowrap;
}

.wt-table :deep(.wt-table__th__title) {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.wt-table :deep(.wt-table-column-filter) {
  margin-left: auto;
  flex-shrink: 0;
}

.wt-table :deep(.wt-table__td__content) {
  position: relative;
  display: flex;
  align-items: center;
}

.wt-table :deep(.wt-table__td__actions) {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: var(--spacing-xs);
}

.wt-table :deep(.wt-table__th__sort-arrow) {
  flex-shrink: 0;
}

/* header content (text, sort arrow, column filter icon) renders after the resizer in DOM
   and would cover it at the column edge; keep the resize handle on top */
.wt-table :deep(.p-datatable-column-resizer) {
  z-index: 1;
}

.wt-table__empty {
  position: absolute;
  inset: 0;
  display: flex;
}

.wt-table :deep(.wt-table__wrapper--overlay tr.p-datatable-empty-message) {
  display: none;
}
</style>
