<template>
  <div class="wt-tree-table">
    <table class="wt-tree-table-wrapper">
      <thead class="wt-tree-table-head">
      <tr
        class="wt-tree-table-tr wt-tree-table-tr-head"
      >
        <th
          v-for="(col, key) of dataHeaders"
          :key="key"
          :class="[
              {
                'wt-tree-table-th--sortable': isColSortable(col)
              },
              `wt-tree-table-th--sort-${col.sort}`,
            ]"
          :style="col.width ? `min-width:${col.width}` : ''"
          class="wt-tree-table-th"
          @click="sort(col)"
        >
          <div class="wt-tree-table-th__content">
            <div v-if="key === 0 && selectable">
              <wt-checkbox
                :selected="isAllSelected"
                @change="selectAll"
              />
            </div>
            <div class="wt-tree-table-th__text">
              {{ col.text }}
            </div>
            <wt-icon
              v-if="sortable"
              class="wt-tree-table-th-sort-arrow wt-tree-table-th-sort-arrow--asc"
              icon="sort-arrow-up"
              size="sm"
            />
            <wt-icon
              v-if="sortable"
              class="wt-tree-table-th-sort-arrow wt-tree-table-th-sort-arrow--desc"
              icon="sort-arrow-down"
              size="sm"
            />
          </div>
        </th>
        <th
          v-if="gridActions"
          class="wt-tree-table-th__actions"
        >
          <div class="wt-tree-table-th__content">
            <slot name="actions-header" />
          </div>
        </th>
      </tr>
      </thead>

      <tbody class="wt-tree-table-body">
      <wt-tree-table-row
        v-for="(row, dataKey) of data"
        :key="dataKey"
        :row-position="dataKey"
        :data-headers="dataHeaders"
        :data="row"
        :selectable="selectable"
        :children-prop="childrenProp"
        :selected-elements="selectedElements"
        @update:selected="handleSelection($event.data, $event.select)"
      >
        <template #actions="{ item }">
          <slot name="actions" :item="item" />
        </template>
        <template
          v-for="(col, headerKey) of dataHeaders"
          :key="headerKey"
          #[col.value]="{ item }"
        >
          <slot
            :index="dataKey"
            :item="item"
            :name="col.value"
          >
            {{ item[col.value] }}
          </slot>
        </template>
      </wt-tree-table-row>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue';
import { useWtTable } from '../../composables/useWtTable/useWtTable.ts';
import { getNextSortOrder } from '../../scripts/sortQueryAdapters';
import type { TableHeader } from '../wt-table/types/table-header.js';
import WtTreeTableRow from '../wt-tree-table-row/wt-tree-table-row.vue';

const props = withDefaults(
  defineProps<{
    /**
     * 'Accepts list of header objects. Draws text depending on "text" property, looks for data values through "value", "show" boolean controls visibility of a column (if undefined, all visible by default). ' Column width is calculated by "width" param. By default, sets minmax(150px, 1fr). '
     */
    headers: TableHeader[];
    /**
     * 'List of data, represented by table. '
     */
    data: Record<string, any>[];
    /**
     * 'If true, draws sorting arrows and sends sorting events at header click. Draws a sorting arrow by "sort": "asc"/"desc" header value. '
     */
    sortable?: boolean;
    /**
     * 'If true, draws row selection checkboxes. Checkbox toggles data object _isSelected property. It's IMPORTANT to set this property before sending data to table. '
     */
    selectable?: boolean;
    selected: any[];
    /**
     * 'If true, reserves space for 3 icon actions in the last column. Accessible by "actions" slot. '
     */
    gridActions?: boolean;
    /**
     * 'It's a key in data object, which contains children array. '
     */
    childrenProp: string;
  }>(),
  {
    sortable: false,
    selectable: true,
    gridActions: true,
  },
);

const emit = defineEmits(['sort', 'update:selected']);

const checkHasChildItems = (item: Record<string, any>) => {
  return item[props.childrenProp] && Array.isArray(item[props.childrenProp]);
};

const getSelectedValue = (items: Record<string, any>[]) => {
  const selected = [];

  const pushSelectedElement = (item: Record<string, any>) => {
    if (item._isSelected) {
      return [item];
    }

    if (checkHasChildItems(item)) {
      item[props.childrenProp].forEach(pushSelectedElement);
    }
  };

  items.forEach(pushSelectedElement);

  return selected;
};

const getAllNestedElements = (item: Record<string, any>) => {
  const nested = [];

  const pushElement = (item: Record<string, any>) => {
    nested.push(item);

    if (checkHasChildItems(item)) {
      item[props.childrenProp].forEach(pushElement);
    }
  };

  item.forEach(pushElement);

  return nested;
};

const selectedElements = computed<Record<string, any>>(() => {
  // _isSelected for backwards compatibility
  return props.selected || getSelectedValue(props.data);
});

const isAllSelected = computed(() => {
  return (
    selectedElements.value.length === getAllNestedElements(props.data).length &&
    getAllNestedElements(props.data).length > 0
  );
});

const { tableHeaders: dataHeaders } = useWtTable({
  headers: props.headers,
});

const isColSortable = ({ sort }: TableHeader) => {
  /*       --sortable = sortable && col.sort === undefined cause there may be some columns we don't want to sort
        strict check for  === undefined is used because col.sort = null is sort order too (actualu, without sort)
        so we need to check if this property is present
*/
  return props.sortable && sort !== undefined;
};

const sort = (col: TableHeader) => {
  if (!isColSortable(col)) return;
  const nextSort = getNextSortOrder(col.sort);
  emit('sort', col, nextSort);
};

const changeSelectItem = (items: Record<string, any>[], selected: boolean) => {
  items.forEach((item) => {
    item._isSelected = selected;

    if (checkHasChildItems(item)) {
      // Change selected for all nested elements
      changeSelectItem(item[props.childrenProp], selected);
    }
  });
};

const selectAll = () => {
  if (props.selected) {
    emit('update:selected', isAllSelected.value ? [] : [...getAllNestedElements(props.data)]);
  } else {
    // for backwards compatibility

    // https://webitel.atlassian.net/browse/WTEL-4634
    // Value for _isSelected must be assigned explicitly.
    // Because allSelected recomputes after each change

    if (isAllSelected.value) {
      changeSelectItem(props.data, false);
    } else {
      changeSelectItem(props.data, true);
    }
  }
};

const handleSelection = (row, select) => {
  if (props.selected) {
    if (select) {
      emit('update:selected', [...selectedElements.value, row]);
    } else {
      emit(
        'update:selected',
        selectedElements.value.filter((item) => item !== row),
      );
    }
  } else {
    // for backwards compatibility
    row._isSelected = !row._isSelected;
  }
};
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>
@import '../../../src/css/main.scss';
.wt-tree-table {
  @extend %wt-scrollbar;
  overflow: auto;

  &-head {
    border: var(--wt-tree-table-head-border);
    border-color: var(--wt-tree-table-head-border-color);
    border-radius: var(--border-radius);
    background: var(--wt-tree-table-head-background-color);
  }
}

.wt-tree-table-wrapper {
  width: 100%;
  border-collapse: collapse;

  .wt-tree-table-tr-wrapper {
    background: var(--wt-tree-table-primary-color);

    &:nth-child(2n) {
      background: var(--wt-tree-table-zebra-color);
    }
  }

}

.wt-tree-table-th,
.wt-tree-table-td {
  @extend %typo-body-1;
  height: fit-content;
  min-height: var(--wt-tree-table-min-height);
  padding: var(--spacing-xs);
  word-break: break-all;
  overflow-wrap: break-word;

  &__actions {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    gap: var(--spacing-xs);
  }

  &__content {
    display: flex;
    align-items: center;
  }
}

.wt-tree-table-th {
  font-weight: normal;

  &--sortable {
    cursor: pointer;

    &:hover :deep .wt-icon__icon {
      fill: var(--icon-active-color);
    }
  }

  .wt-tree-table-th-sort-arrow {
    display: none;
    margin-left: var(--wt-tree-table-head-sort-arrow-margin);
  }

  &--sort-asc .wt-tree-table-th-sort-arrow--asc {
    display: block;
  }

  &--sort-desc .wt-tree-table-th-sort-arrow--desc {
    display: block;
  }
}

.wt-tree-table-foot {
  border-color: var(--wt-tree-table-head-border-color);
  border-top: var(--wt-tree-table-head-border-color);
}
</style>
