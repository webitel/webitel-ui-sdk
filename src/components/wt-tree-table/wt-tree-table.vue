<template>
  <div class="wt-tree-table">
    <table class="wt-tree-table__table">
      <thead class="wt-tree-table__head">
      <tr
        class="wt-tree-table__tr wt-tree-table__tr__head"
      >
        <th
          v-for="(col, key) of dataHeaders"
          :key="key"
          :class="[
              {'wt-tree-table__th--sortable': isColSortable(col)},
              `wt-tree-table__th--sort-${col.sort}`,
            ]"
          :style="col.width ? `min-width:${col.width}` : ''"
          class="wt-tree-table__th"
          @click="sort(col)"
        >
          <div class="wt-tree-table__th__content">
            <div v-if="key === 0 && selectable">
              <wt-checkbox
                :selected="isAllSelected"
                @change="selectAll"
              />
            </div>
            <div class="wt-tree-table__th__text">
              {{ col.text }}
            </div>
            <wt-icon
                v-if="sortable"
                class="wt-tree-table__th__sort-arrow wt-tree-table__th__sort-arrow--asc"
                icon="sort-arrow-up"
                size="sm"
            />
            <wt-icon
                v-if="sortable"
                class="wt-tree-table__th__sort-arrow wt-tree-table__th__sort-arrow--desc"
                icon="sort-arrow-down"
                size="sm"
            />
          </div>
        </th>
        <th
          v-if="gridActions"
          class="wt-tree-table__th__actions"
        >
          <div class="wt-tree-table__th__content">
            <slot name="actions-header" />
          </div>
        </th>
      </tr>
      </thead>

      <tbody class="wt-tree-table__body">
      <wt-tree-table-row
        v-for="(row, dataKey) of data"
        :key="dataKey"
        :dataKey="dataKey "
        :data-headers="dataHeaders"
        :row="row"
        :selectable="selectable"
        :children="children"
        :_selected="_selected"
        @handleSelection="handleSelection($event.row, $event.select)"
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
            <div>{{ item[col.value] }}</div>
          </slot>
        </template>
      </wt-tree-table-row>
      </tbody>

      <tfoot
        v-if="isTableFooter"
        class="wt-tree-table__foot"
      >
      <tr
        class="wt-tree-table__tr wt-tree-table__tr__foot"
      >
        <!--        empty checkbox column -->
        <th
          v-if="selectable"
          class="wt-tree-table__th__checkbox"
        />
        <td
          v-for="(col, headerKey) of dataHeaders"
          :key="headerKey"
          class="wt-tree-table__td"
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
import type { TableHeader } from '../../types/table/table-header.js';
import WtTreeTableRow from '../wt-tree-table-row/wt-tree-table-row.vue';
import getNextSortOrder from './_internals/getSortOrder.js';

const props = withDefaults(
  defineProps<{
    /**
     * 'Accepts list of header objects. Draws text depending on "text" property, looks for data values through "value", "show" boolean controls visibility of a column (if undefined, all visible by default). ' Column width is calculated by "width" param. By default, sets minmax(150px, 1fr). '
     */
    headers: TableHeader[];
    /**
     * 'List of data, represented by table. '
     */
    data: any[];
    /**
     * 'If true, draws sorting arrows and sends sorting events at header click. Draws a sorting arrow by "sort": "asc"/"desc" header value. '
     */
    sortable: boolean;
    /**
     * 'If true, draws row selection checkboxes. Checkbox toggles data object _isSelected property. It's IMPORTANT to set this property before sending data to table. '
     */
    selectable: boolean;
    selected: [];
    /**
     * 'If true, reserves space for 3 icon actions in the last column. Accessible by "actions" slot. '
     */
    gridActions: boolean;
    /**
     * 'It's a key in data object, which contains children array. '
     */
    children: string;
  }>(),
  {
    sortable: false,
    selectable: true,
    gridActions: true,
  },
);

const emit = defineEmits(['sort', 'update:selected']);
const slots = useSlots();
const { t } = useI18n();

const checkHasChildItems = (item) => {
  return item[props.children] && Array.isArray(item[props.children]);
};

function getSelectedValue(items) {
  const selected = [];

  function traverse(item) {
    if (item._isSelected) {
      selected.push(item);
    }

    if (checkHasChildItems(item)) {
      item[props.children].forEach(traverse);
    }
  }

  items.forEach(traverse);

  return selected;
}

const getAllNestedElements = (item) => {
  const nested = [];

  function traverse(item) {
    nested.push(item);

    if (checkHasChildItems(item)) {
      item[props.children].forEach(traverse);
    }
  }

  item.forEach(traverse);

  return nested;
};

const _selected = computed(() => {
  // _isSelected for backwards compatibility
  return props.selected || getSelectedValue(props.data);
});

const isAllSelected = computed(() => {
  return (
    _selected.value.length === getAllNestedElements(props.data).length &&
    getAllNestedElements(props.data).length > 0
  );
});

const dataHeaders = computed(() => {
  return props.headers
    .filter((header) => header.show === undefined || header.show)
    .map((header) => {
      if (!header.text && header.locale) {
        return {
          ...header,
          text: typeof header.locale === 'string' ? t(header.locale) : t(header.locale[0]),
        };
      }
      return header;
    });
});

const isTableFooter = computed(() => {
  return Object.keys(slots).some((slotName) => slotName.includes('-footer'));
});

const isColSortable = ({ sort }) => {
  /*       --sortable = sortable && col.sort === undefined cause there may be some columns we don't want to sort
        strict check for  === undefined is used because col.sort = null is sort order too (actualu, without sort)
        so we need to check if this property is present
*/
  return props.sortable && sort !== undefined;
};

const sort = (col) => {
  if (!isColSortable(col)) return;
  const nextSort = getNextSortOrder(col.sort);
  emit('sort', col, nextSort);
};

const changeSelectItem = (item, selected) => {
  function traverse(item) {
    item._isSelected = selected;

    if (checkHasChildItems(item)) {
      item[props.children].forEach(traverse);
    }
  }

  item.forEach(traverse);
};

const selectAll = () => {
  if (props.selected) {
    emit('update:selected', isAllSelected.value? [] : [...getAllNestedElements(props.data)]);
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

  &__head {
    border: var(--table-head-border);
    border-color: var(--wt-table-head-border-color);
    border-radius: var(--border-radius);
    background: var(--wt-table-head-background-color);
  }
}

.wt-tree-table__table {
  width: 100%;
  border-collapse: collapse;

  .wt-tree-table__tr-wrapper {
    background: var(--wt-table-primary-color);

    &:nth-child(2n) {
      background: var(--wt-table-zebra-color);
    }
  }

}

.wt-tree-table__th,
.wt-tree-table__td {
  @extend %typo-body-1;
  height: fit-content;
  min-height: var(--table-min-height);
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

.wt-tree-table__th {
  font-weight: normal;

  &--sortable {
    cursor: pointer;

    &:hover :deep .wt-icon__icon {
      fill: var(--icon-active-color);
    }
  }

  .wt-tree-table__th__sort-arrow {
    display: none;
    margin-left: var(--table-head-sort-arrow-margin);
  }

  &--sort-asc .wt-tree-table__th__sort-arrow--asc {
    display: block;
  }

  &--sort-desc .wt-tree-table__th__sort-arrow--desc {
    display: block;
  }
}

.wt-tree-table__foot {
  border-color: var(--wt-table-head-border-color);
  border-top: var(--wt-table-head-border-color);
}
</style>
