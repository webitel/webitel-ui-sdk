<template>
  <div class="wt-table">
    <table class="wt-table__table">
      <thead class="wt-table__head">
      <tr
        :style="columnsStyle"
        class="wt-table__tr wt-table__tr__head"
      >
        <th
          v-if="selectable"
          class="wt-table__th wt-table__th--checkbox"
        >
          <wt-checkbox
            :selected="isAllSelected"
            @change="selectAll"
          />
        </th>
        <th
          v-for="(col, key) of dataHeaders"
          :key="key"
          :class="[
              {'wt-table__th--sortable': isColSortable(col)},
              `wt-table__th--sort-${col.sort}`,
            ]"
          class="wt-table__th"
          @click="sort(col)"
        >
          <div class="wt-table__th__text">
            {{ col.text }}
          </div>
          <wt-icon
            v-if="sortable"
            class="wt-table__th__sort-arrow wt-table__th__sort-arrow--asc"
            icon="sort-arrow-up"
            size="sm"
          />
          <wt-icon
            v-if="sortable"
            class="wt-table__th__sort-arrow wt-table__th__sort-arrow--desc"
            icon="sort-arrow-down"
            size="sm"
          />
        </th>
        <th
          v-if="gridActions"
          class="wt-table__th__actions"
        >
          <slot name="actions-header" />
        </th>
      </tr>
      </thead>

      <tbody class="wt-table__body">
      <div v-for="(row, dataKey) of data"
           :key="dataKey" class="wt-table__tr-wrapper">
        <wt-tree-table-row
          :columns-style="columnsStyle"
          :data-headers="dataHeaders" :row="row"
          :selectable="selectable"
          :children="children"
          :_selected="_selected"
          @handleSelection="handleSelection($event.row, $event.select)"
        >
          <template #actions>
            <slot name="actions" :row="row" />
          </template>
        </wt-tree-table-row>
      </div>
      </tbody>

      <tfoot
        v-if="isTableFooter"
        class="wt-table__foot"
      >
      <tr
        :style="columnsStyle"
        class="wt-table__tr wt-table__tr__foot"
      >
        <!--        empty checkbox column -->
        <th
          v-if="selectable"
          class="wt-table__th__checkbox"
        />
        <td
          v-for="(col, headerKey) of dataHeaders"
          :key="headerKey"
          class="wt-table__td"
        >
          <slot
            :header="col"
            :index="headerKey"
            :name="`${col.value}-footer`"
          />
        </td>
      </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots, withDefaults } from 'vue';
import { useI18n } from 'vue-i18n';
import getNextSortOrder from './_internals/getSortOrder.js';
import WtTreeTableRow from '../wt-tree-table-row/wt-tree-table-row.vue';
import type { TableHeader } from '../../types/table/table-header.js';

const props = withDefaults(defineProps<{
  /**
   * 'Accepts list of header objects. Draws text depending on "text" property, looks for data values through "value", "show" boolean controls visibility of a column (if undefined, all visible by default). ' Column width is calculated by "width" param. By default, sets minmax(150px, 1fr). '
   */
  headers: TableHeader[]
  /**
   * 'List of data, represented by table. '
   */
  data: any[],
  /**
   * 'If true, draws sorting arrows and sends sorting events at header click. Draws a sorting arrow by "sort": "asc"/"desc" header value. '
   */
  sortable: boolean,
  /**
   * 'If true, draws row selection checkboxes. Checkbox toggles data object _isSelected property. It's IMPORTANT to set this property before sending data to table. '
   */
  selectable: boolean,
  selected: [],
  /**
   * 'If true, reserves space for 3 icon actions in the last column. Accessible by "actions" slot. '
   */
  gridActions: boolean,
  /**
   * 'It's a key in data object, which contains children array. '
   */
  children: string
}>(), {
  sortable: false,
  selectable: true,
  gridActions: true
})

const emit = defineEmits(['sort', 'update:selected'])
const slots = useSlots()
const { t } = useI18n()

function getSelectedValue(items) {
  const selected = [];

  function traverse(item) {
    if (item._isSelected) {
      selected.push(item);
    }

    if (item[props.children] && Array.isArray(item[props.children])) {
      item[props.children].forEach(traverse);
    }
  }

  items.forEach(traverse);

  return selected;
}

const getAllNestedElements = (item) => {
  const nested = [];

  function traverse(item) {
    nested.push(item)

    if (item[props.children] && Array.isArray(item[props.children])) {
      item[props.children].forEach(traverse);
    }
  }

  item.forEach(traverse);

  return nested
}

const _selected = computed(() => {
  // _isSelected for backwards compatibility
  return props.selected || getSelectedValue(props.data);
})

const isAllSelected = computed(() => {
  return _selected.value.length === getAllNestedElements(props.data).length && getAllNestedElements(props.data).length > 0;
})

const dataHeaders = computed(() => {
  return props.headers
      .filter((header) => header.show === undefined || header.show)
      .map((header) => {
        if (!header.text && header.locale) {
          return {
            ...header,
            text:
                typeof header.locale === 'string'
                    ? t(header.locale)
                    : t(header.locale[0]),
          };
        }
        return header;
      });
})

const columnsStyle = computed(() => {
  let gridTemplateColumns = '';
  if (props.selectable) gridTemplateColumns += '24px '; // checkbox

  const defaultColumnWidth = 'minmax(140px, 1fr)';
  dataHeaders.value.forEach((header) => {
    gridTemplateColumns += ` ${(header.width || defaultColumnWidth).trim()}`;
  });

  if (props.gridActions) gridTemplateColumns += ` ${'112px'}`; // actions
  return `grid-template-columns: ${gridTemplateColumns}`;
})

const isTableFooter = computed(() => {
  console.log('slots',slots)
  console.log('Object.keys(slots)',Object.keys(slots))
  return Object.keys(slots).some((slotName) => slotName.includes('-footer'));
})

const isColSortable = ({ sort }) => {
  /*       --sortable = sortable && col.sort === undefined cause there may be some columns we don't want to sort
        strict check for  === undefined is used because col.sort = null is sort order too (actualu, without sort)
        so we need to check if this property is present
*/
  return props.sortable && sort !== undefined;
}

const sort = (col) => {
  if (!isColSortable(col)) return;
  const nextSort = getNextSortOrder(col.sort);
  emit('sort', col, nextSort);
}

const changeSelectItem = (item, selected) => {
  function traverse(item) {
    item._isSelected = selected

    if (item[props.children] && Array.isArray(item[props.children])) {
      item[props.children].forEach(traverse);
    }
  }

  item.forEach(traverse);
}

const selectAll = () => {
  if (props.selected) {
    if (isAllSelected.value) {
      emit('update:selected', []);
    } else {
      emit('update:selected', [...getAllNestedElements(props.data)]);
    }
  } else {
    // for backwards compatibility

    // https://webitel.atlassian.net/browse/WTEL-4634
    // Value for _isSelected must be assigned explicitly.
    // Because allSelected recomputes after each change

    if (isAllSelected.value) {
      changeSelectItem(props.data, false)
    } else {
      changeSelectItem(props.data, true)
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
    console.log('row', row)
    // for backwards compatibility
    row._isSelected = !row._isSelected;

    console.log('row', row)
  }
}
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>
@import '../../../src/css/main.scss';

.wt-table {
  @extend %wt-scrollbar;
  overflow: auto;
}

.wt-table__table {
  width: 100%;
  border-collapse: collapse;

  .wt-table__tr-wrapper {
    background: var(--wt-table-primary-color);

    &:nth-child(2n) {
      background: var(--wt-table-zebra-color);
    }
  }

  :deep(.wt-table__tr) {
    display: grid;
    padding: var(--table-row-padding);
    transition: var(--transition);

    grid-template-columns: repeat(auto-fit, var(--table-col-min-width));
    grid-column-gap: var(--table-column-gap);
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
  width: 100%;
  max-width: 100%;
  height: fit-content;
  min-height: var(--table-min-height);
  padding: 0;
  word-break: break-all;
  overflow-wrap: break-word;

  &__actions {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    gap: var(--spacing-xs);
  }
}

:deep(.wt-table__td:nth-child(2)),:deep(.wt-table__td:nth-child(1)) {
  padding-left: var(--child-space);
}

.wt-table__th {
  font-weight: normal;

  &--sortable {
    cursor: pointer;

    &:hover :deep .wt-icon__icon {
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
</style>
