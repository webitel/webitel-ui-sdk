<template>
  <p-table 
    ref="table"
    :key="tableKey"
    class="wt-table"
    :value="data"
    :show-headers="!headless"
    :row-class="rowClass"
    :row-style="rowStyle"
    lazy
    scrollable
    scroll-height="flex"
    :resizable-columns="resizableColumns"
    :reorderable-columns="reorderableColumns"
    column-resize-mode="expand"
    @sort="sort"
    @column-resize-end="columnResize"
    @column-reorder="columnReorder"
    @row-reorder="({dragIndex, dropIndex}) => emit('reorder:row', { oldIndex: dragIndex, newIndex: dropIndex })"
  >
    <p-column
      v-if="rowReorder"
      column-key="row-reorder"
      row-reorder
      :reorderable-column="false"
      header-style="width: 1%;"
      body-style="width: 1%;"
      :pt="{
        columnresizer: { 
            class: { 
                'hidden': true 
            } 
        }
      }"
    >
      <template #body="{ data: row }">
        <wt-icon
          v-if="!isRowReorderDisabled(row)"
          icon="move" 
          data-pc-section="reorderablerowhandle" 
        />
      </template>
    </p-column>
    <p-column
      v-if="selectable"
      column-key="row-select"
      :reorderable-column="false"
      header-style="width: 1%;"
      body-style="width: 1%;"
      :pt="{
        columnresizer: { 
            class: { 
                'hidden': true 
            } 
        }
      }"
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
      :column-key="col.field"
      :field="col.field"
      :sortable="isColSortable(col)"
      :hidden="isColumnHidden(col)"
      :pt="{
        root: {
          'data-column-field': col.field      // required for column-resizer to get column field
        }
      }"
    >

      <template #header>
        <div class="wt-table__th__content">
          {{ col.text }}
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
        </div>
      </template>

      <template #body="{ data: row, index }">
        <!--
        @slot Customize data columns. Recommended for representing nested data structures like object or array, and adding specific elements like select or chip
        @scope [ { "name": "item", "description": "Data row object" }, { "name": "index", "description": "Data row index" } ]
        -->
        <div 
          :style="columnStyle(col)"
          class="wt-table__td__content"
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
      column-key="row-actions"
      style="width: 112px;"
      :frozen="fixedActions"
      align-frozen="right"
    >
      <template #header>
        <!--    @slot Table head actions row slot -->
        <slot name="actions-header" />
      </template>
      <template #body="{data: actionsData, index}">
        <!--
        @slot Table body actions row slot
        @scope [ { "name": "item", "description": "Data row object" }, { "name": "index", "description": "Data row index" } ]
        -->
        <div class="wt-table__td__actions">
          <!-- check if row exists to prevent rendering errors -->
          <slot 
            v-if="actionsData"
            name="actions"
            :index="index" 
            :item="actionsData"
          />
        </div>
      </template>
    </p-column>
    <template
      v-if="isTableFooter"
      #footer
    >
      <slot name="footer" />
    </template>
  </p-table>
</template>

<script setup lang="ts">
import type { DataTableProps } from 'primevue';
import { computed, defineProps, ref, useSlots,useTemplateRef, withDefaults } from 'vue';
import { useI18n } from 'vue-i18n';

import { getNextSortOrder } from '../../scripts/sortQueryAdapters.js';
import type { WtTableHeader } from './types/WtTable';

interface Props extends DataTableProps{
  /**
   * 'Accepts list of header objects. Draws text depending on "text" property, looks for data values through "value", "show" boolean controls visibility of a column (if undefined, all visible by default). ' Column width is calculated by "width" param. By default, sets 140px. '
   */
  headers?: WtTableHeader[];
  /**
   * 'List of data, represented by table. '
   */
  data?: Array<unknown>;
  /**
   * 'If true, draws sorting arrows and sends sorting events at header click. Draws a sorting arrow by "sort": "asc"/"desc" header value. '
   */
  sortable?: boolean;
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
   * 'If true, allows to reorder rows.'
   */
  rowReorder?: boolean;
  /**
   * 'If true, restrict sprecific row reorder.'
   */
  isRowReorderDisabled?: (row) => boolean;
  rowClass?: () => string;
  rowStyle?: () => { [key: string]: string };
  resizableColumns?: boolean
  reorderableColumns?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  headers: () => [],
  data: () => [],
  sortable: false,
  selectable: true,
  gridActions: true,
  fixedActions: false,
  headless: false,
  rowReorder: false,
  isRowReorderDisabled: () => false,
  rowClass: () => '',
  rowStyle: () => ({}),
  resizableColumns: false,
  reorderableColumns: false,
});

const { t } = useI18n();

const slots = useSlots();

const emit = defineEmits(['sort', 'update:selected', 'reorder:row', 'column-resize', 'column-reorder']);

const table = useTemplateRef('table');
const tableKey = ref(0);

// table's columns that should be excluded from reorder
const excludeColumnsFromReorder = ['row-select', 'row-reorder', 'row-actions']

const _selected = computed(() => {
  // _isSelected for backwards compatibility
  return props.selectable 
         ? props.selected || props.data.filter(item => item._isSelected)
         : [];
});

const dataHeaders = computed(() => {
  return props.headers
    .map(header => {
      if (!header.text && header.locale) {
        return {
          ...header,
          text: typeof header.locale === 'string' ? t(header.locale) : t(...header.locale),
        };
      }
      return header;
    });
});

const isColumnHidden = (col) => {
  return col.show === false
}

const columnStyle = (col) => {
  const baseWidth = 140

  return {
    minWidth: col.width || `${baseWidth}px`,
  }
}

const isTableColumnFooters = computed(() => {
  return Object.keys(slots).some(slotName => slotName.includes('-footer'));
});

const isTableFooter = computed(() => {
  return Object.keys(slots).some(slotName => slotName === 'footer');
});

const isAllSelected = computed(() => {
  return _selected.value.length === props.data.length && props.data.length > 0;
})

const sort = ({sortField}) => {
  const col = dataHeaders.value.find(header => header.field === sortField)
  if (!isColSortable(col)) return;
  const nextSort = getNextSortOrder(col.sort);
  emit('sort', col, nextSort);
}

const isColSortable = ({ sort }) => {
  /*       --sortable = sortable && col.sort === undefined cause there may be some columns we don't want to sort
            strict check for  === undefined is used because col.sort = null is sort order too (actualu, without sort)
            so we need to check if this property is present
    */
  return props.sortable && sort !== undefined;
}

const selectAll = () => {
  if (props.selected) {
    if (isAllSelected.value) {
      emit('update:selected', []);
    } else {
      emit('update:selected', [...props.data]);
    }
  } else {
    // for backwards compatibility

    // https://webitel.atlassian.net/browse/WTEL-4634
    // Value for _isSelected must be assigned explicitly.
    // Because allSelected recomputes after each change

    if (isAllSelected.value) {
      props.data.forEach((item) => {
        item._isSelected = false;
      });
    } else {
      props.data.forEach((item) => {
        item._isSelected = true;
      });
    }
  }
}

const handleSelection = (row, select) => {
  if (props.selected) {
    if (select) {
      emit('update:selected', [..._selected.value, row]);
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
}

const columnResize = ({element}) => {
  // getting column name by custom attribute due Primevue does not provide it
  const field = element.getAttribute('data-column-field')

  const computedStyle = getComputedStyle(element);
  const paddingLeft = parseFloat(computedStyle.paddingLeft);
  const paddingRight = parseFloat(computedStyle.paddingRight);

  const columnWidth = element.offsetWidth - paddingLeft - paddingRight

  emit('column-resize', { columnName: field, columnWidth: `${columnWidth}px` })
}

const columnReorder = async ({dropIndex, originalEvent}) => {
  const newOrder = table.value.d_columnOrder.filter(col => !excludeColumnsFromReorder.includes(col))

  //save scroll position after table rerender
  const tableScrollTopPosition = table.value.$el.querySelector('.p-datatable-table').scrollTop
  const tableScrollLeftPosition = table.value.$el.querySelector('.p-datatable-table').scrollLeft
  tableKey.value += 1       // rerender table preventing unexpected behavior
  table.value.$el.querySelector('.p-datatable-table').scrollTop = tableScrollTopPosition
  table.value.$el.querySelector('.p-datatable-table').scrollLeft = tableScrollLeftPosition

  emit('column-reorder', newOrder)
}
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use '@webitel/styleguide/scroll' as *;
@use '@webitel/styleguide/typography' as *;
@use '@webitel/styleguide/typography' as *;

.wt-table {
  @extend %wt-scrollbar;
  overflow: auto;
}

.wt-table :deep(.p-datatable-table-container) {
  @extend %wt-scrollbar;
}

.wt-table__th__content {
  @extend %typo-body-1-bold;
  white-space: nowrap;
  width: 0;
}

.wt-table__td__content {
  @extend %typo-body-1;
  display: flex;
  align-items: center;
  position: relative;
}

.wt-table__td__actions {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: var(--spacing-xs);
}

.wt-table__th__sort-arrow {
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
}
</style>