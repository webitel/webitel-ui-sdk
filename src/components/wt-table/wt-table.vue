<template>
  <div
    class="wt-table"
  >
    <p-table 
      ref="tableRef"
      :value="data"
      :show-headers="!headless"
      striped-rows
      :table-style="`min-width: ${totalTableWidth}px;`"
      lazy
      @sort="sort"
      @row-reorder="({dragIndex, dropIndex}) => emit('reorder', { oldIndex: dragIndex, newIndex: dropIndex })"
    >
      <p-column
        v-if="movable"
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
      >
        <template #body="{ data: row, index }">
          <!--
          @slot Customize data columns. Recommended for representing nested data structures like object or array, and adding specific elements like select or chip
          @scope [ { "name": "item", "description": "Data row object" }, { "name": "index", "description": "Data row index" } ]
          -->
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
          v-if="isTableFooter" 
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
              v-if="movable"
              v-tooltip="$t('iconHints.draggable')"
              class="sortable-btn"
              icon="move"
            /> -->
            <slot 
              v-if="actionsData"
              name="actions"
              :index="index" 
              :item="actionsData"
            />
          </div>
        </template>
      </p-column>
    </p-table>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref, withDefaults, useSlots } from 'vue';
import { getNextSortOrder } from '../../scripts/sortQueryAdapters.js';
import { useI18n } from 'vue-i18n';
// import { useSortableTable, type SortableTableOptions } from '../../composables/useWtTable/useSortableTable.js';

export interface Props {
  /**
   * 'Accepts list of header objects. Draws text depending on "text" property, looks for data values through "value", "show" boolean controls visibility of a column (if undefined, all visible by default). ' Column width is calculated by "width" param. By default, sets minmax(150px, 1fr). '
   */
  headers?: Array<unknown>;
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
  movable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  headers: () => [],
  data: () => [],
  sortable: false,
  selectable: true,
  gridActions: true,
  fixedActions: false,
  headless: false,
  movable: false,
});

const { t } = useI18n();

const slots = useSlots();

const emit = defineEmits(['sort', 'update:selected', 'reorder']);

const tableRef = ref(null);

// const sortableOptions: SortableTableOptions = {
//   tableRef,
//   enabled: props.movable,
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
    .filter(header => header.show === undefined || header.show)
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

const columnStyle = (col) => {
  if (col.width) {
    return {
      width: col.width,
      minWidth: col.width,
      maxWidth: col.width,
    };
  }
}

const totalTableWidth = computed(() => {
  const baseWidth = 140

  let totalWidth = dataHeaders.value.reduce((sum, col) => {
    return sum + (parseInt(col.width) || baseWidth);
  }, 0);

  if (props.selectable) {
    totalWidth += 39
  }
  if (props.gridActions) {
    totalWidth += 112
  }

  return totalWidth
});

const isTableFooter = computed(() => {
  return Object.keys(slots).some(slotName => slotName.includes('-footer'));
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
@use '@webitel/styleguide/typography' as *;
@use '@webitel/styleguide/scroll' as *;

.wt-table {
  @extend %wt-scrollbar;
  overflow: auto;
}

.wt-table__table {
  border-collapse: collapse;
  width: 100%;

  &--fixed-actions {
    // make action icons fixed to right

    .wt-table__tr {
      .wt-table__td__actions {
        position: sticky;
        right: 0;
        background: var(--content-wrapper-color);
      }

      &:nth-child(2n) {
        .wt-table__td__actions {
          background: var(--wt-table-zebra-color);
        }
      }
    }
  }
}

.wt-table__tr {
  display: grid;
  grid-template-columns: repeat(auto-fit, var(--table-col-min-width));
  transition: var(--transition);
  background: var(--wt-table-primary-color);
  padding: var(--table-row-padding);
  grid-column-gap: var(--table-column-gap);

  &:nth-child(2n) {
    background: var(--wt-table-zebra-color);
  }
}

.wt-table__tr__head {
  border: var(--table-head-border);
  border-color: var(--wt-table-head-border-color);
  border-radius: var(--border-radius);
  background: var(--wt-table-head-background-color);
}

.wt-table__th,
.wt-table__td {
  @extend %typo-body-1;
  display: flex;
  align-items: center;
  padding: 0;
  width: 100%;
  max-width: 100%;
  height: fit-content;
  min-height: var(--table-min-height);
  word-break: break-all;
  overflow-wrap: break-word;

  &__actions {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    gap: var(--spacing-xs);
  }
}

.wt-table__th {
  font-weight: normal;

  &--sortable {
    cursor: pointer;

    &:hover :deep(.wt-icon__icon) {
      fill: var(--icon-active-color);
    }
  }

  .wt-table__th__sort-arrow {
    display: none;
    margin-left: var(--table-head-sort-arrow-margin);
  }

  &--sort-asc .wt-table__th__sort-arrow--asc {
    display: block;
  }

  &--sort-desc .wt-table__th__sort-arrow--desc {
    display: block;
  }
}

.wt-table__foot {
  border-color: var(--wt-table-head-border-color);
  border-top: var(--wt-table-head-border-color);
}

// Sortable styles
:deep(.sortable-swap-highlight) {
  background: var(--primary-color) !important;
}
</style>