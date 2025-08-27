<template>
  <p-table 
    ref="table"
    class="wt-table"
    :value="data"
    :show-headers="!headless"
    :table-style="`min-width: ${totalTableWidth}px;`"
    :row-class="rowClass"
    :row-style="rowStyle"
    lazy
    scrollable
    @sort="sort"
    @row-reorder="({dragIndex, dropIndex}) => emit('reorder:row', { oldIndex: dragIndex, newIndex: dropIndex })"
  >
    <p-column
      v-if="rowReorder"
      style="width: 39px;"
      row-reorder
    >
      <template #rowreordericon>
        <wt-icon icon="move" data-pc-section="reorderablerowhandle" />
      </template>
    </p-column>
    <p-column
      v-if="selectable"
      style="width: 39px;"
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
      :key="idx"
      :field="col.value"
      :header="col.text"
      :sortable="isColSortable(col)"
      :style="columnStyle(col)"
      :hidden="isColumnHidden(col)"
    >
      <template #body="{ data: row, index }">
        <!--
        @slot Customize data columns. Recommended for representing nested data structures like object or array, and adding specific elements like select or chip
        @scope [ { "name": "item", "description": "Data row object" }, { "name": "index", "description": "Data row index" } ]
        -->
        <!-- check if row exists to prevent rendering errors -->
        <slot
          v-if="row"
          :index="index"
          :item="row"
          :name="col.value"
        >{{ row[col.value] }}</slot>
      </template>
      <template #sorticon>
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
          <!-- <wt-icon-btn
            v-if="rowReorder"
            v-tooltip="$t('iconHints.draggable')"
            class="sortable-btn"
            icon="move"
          /> -->
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
import { computed, defineProps, ref, withDefaults, useTemplateRef, useSlots } from 'vue';
import { getNextSortOrder } from '../../scripts/sortQueryAdapters.js';
import { useI18n } from 'vue-i18n';
import type { WtTableHeader } from './types/WtTable.js';
// import { useSortableTable, type SortableTableOptions } from '../../composables/useWtTable/useSortableTable.js';

export interface Props {
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
  rowClass?: () => string;
  rowStyle?: () => { [key: string]: string };
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
  rowClass: () => '',
  rowStyle: () => ({}),
});

const { t } = useI18n();

const slots = useSlots();

const emit = defineEmits(['sort', 'update:selected', 'reorder:row']);

const table = useTemplateRef('table');

// const sortableOptions: SortableTableOptions = {
//   table,
//   enabled: props.rowReorder,
//   sortableConfig: {
//     animation: 200,
//     ghostClass: 'custom-ghost'
//   },
//   onReorder: ({ oldIndex, newIndex }) => {
//     emit('reorder', { oldIndex, newIndex })
//     initializeSortable()
//   }
// }

// const { initializeSortable } = useSortableTable(sortableOptions)

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
  if (col.width) {
    return {
      width: col.width,
    };
  }
}

const totalTableWidth = computed(() => {
  const baseWidth = 140

  let totalWidth = dataHeaders.value.reduce((sum, col) => {
    return sum + (parseInt(col.width) || baseWidth);
  }, 0);

  if (props.rowReorder) {
    totalWidth += 39
  }
  if (props.selectable) {
    totalWidth += 39
  }
  if (props.gridActions) {
    totalWidth += 112
  }

  return totalWidth
});

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
  const col = dataHeaders.value.find(header => header.value === sortField)
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
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use '@webitel/styleguide/scroll' as *;

.wt-table {
  @extend %wt-scrollbar;
  overflow: auto;
}

.wt-table__td__actions {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: var(--spacing-xs);
}
</style>