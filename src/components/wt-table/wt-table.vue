<template>
  <div class="wt-table">
    <table
      class="wt-table__table"
      :class="{ 'wt-table__table--fixed-actions': fixedActions }"
    >
      <thead
        v-if="!headless"
        class="wt-table__head"
      >
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
              { 'wt-table__th--sortable': isColSortable(col) },
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
            <!--    @slot Table head actions row slot -->
            <slot name="actions-header" />
          </th>
        </tr>
      </thead>

      <tbody class="wt-table__body">
        <tr
          v-for="(row, dataKey) of data"
          :key="dataKey"
          :class="`wt-table__tr__${row.id || dataKey}`"
          :style="columnsStyle"
          class="wt-table__tr wt-table__tr__body"
        >
          <td
            v-if="selectable"
            class="wt-table__td wt-table__td--checkbox"
          >
            <wt-checkbox
              :selected="_selected.includes(row)"
              @change="handleSelection(row, $event)"
            />
          </td>

          <td
            v-for="(col, headerKey) of dataHeaders"
            :key="headerKey"
            class="wt-table__td"
          >
            <!--
           @slot Customize data columns. Recommended for representing nested data structures like object or array, and adding specific elements like select or chip
           @scope [ { "name": "item", "description": "Data row object" }, { "name": "index", "description": "Data row index" } ]
           -->
            <slot
              :index="dataKey"
              :item="row"
              :name="col.value"
            >
              <div>{{ row[col.value] }}</div>
            </slot>
          </td>

          <td
            v-if="gridActions"
            class="wt-table__td__actions"
          >
            <!--
          @slot Table body actions row slot
          @scope [ { "name": "item", "description": "Data row object" }, { "name": "index", "description": "Data row index" } ]
           -->
            <slot
              :index="dataKey"
              :item="row"
              name="actions"
            />
          </td>
        </tr>
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
            <!--
           @slot Add your custom aggregations for column in table footer. Table footer is rendered conditionally depending on templates with "-footer" name
           @scope [ { "name": "header", "description": "header object" } ]
           -->
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

<script>
import { getNextSortOrder } from '../../scripts/sortQueryAdapters.js';

export default {
  name: 'WtTable',
  props: {
    /**
     * 'Accepts list of header objects. Draws text depending on "text" property, looks for data values through "value", "show" boolean controls visibility of a column (if undefined, all visible by default). ' Column width is calculated by "width" param. By default, sets minmax(150px, 1fr). '
     */
    headers: {
      type: Array,
      default: () => [],
    },
    /**
     * 'List of data, represented by table. '
     */
    data: {
      type: Array,
      default: () => [],
    },
    /**
     * 'If true, draws sorting arrows and sends sorting events at header click. Draws a sorting arrow by "sort": "asc"/"desc" header value. '
     */
    sortable: {
      type: Boolean,
      default: false,
    },
    /**
     * 'If true, draws row selection checkboxes. Checkbox toggles data object _isSelected property. It's IMPORTANT to set this property before sending data to table. '
     */
    selectable: {
      type: Boolean,
      default: true,
    },
    selected: {
      type: Array,
      // no default! because we need to know if it's passed or not
    },
    /**
     * 'If true, reserves space for 3 icon actions in the last column. Accessible by "actions" slot. '
     */
    gridActions: {
      type: Boolean,
      default: true,
    },
    /**
     * 'If true, 3 icon actions in the last column have position:sticky and fixed on the right'
     */
    fixedActions: {
      type: Boolean,
      default: false,
    },
    /**
     * 'If true, displays table without header.'
     */
    headless: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['sort', 'update:selected'],

  data: () => ({}),

  computed: {
    _selected() {
      // _isSelected for backwards compatibility
      return this.selected || this.data.filter((item) => item._isSelected);
    },

    isAllSelected() {
      return this._selected.length === this.data.length && this.data.length > 0;
    },

    dataHeaders() {
      return this.headers
        .filter((header) => header.show === undefined || header.show)
        .map((header) => {
          if (!header.text && header.locale) {
            return {
              ...header,
              text:
                typeof header.locale === 'string'
                  ? this.$t(header.locale)
                  : this.$t(...header.locale),
            };
          }
          return header;
        });
    },

    columnsStyle() {
      let gridTemplateColumns = '';
      if (this.selectable) gridTemplateColumns += '24px '; // checkbox

      const defaultColumnWidth = 'minmax(140px, 1fr)';
      this.dataHeaders.forEach((header) => {
        gridTemplateColumns += ` ${(header.width || defaultColumnWidth).trim()}`;
      });

      if (this.gridActions) gridTemplateColumns += ` ${'112px'}`; // actions
      return `grid-template-columns: ${gridTemplateColumns}`;
    },

    isTableFooter() {
      return Object.keys(this.$slots).some((slotName) =>
        slotName.includes('-footer'),
      );
    },
  },

  methods: {
    sort(col) {
      if (!this.isColSortable(col)) return;
      const nextSort = getNextSortOrder(col.sort);
      this.$emit('sort', col, nextSort);
    },
    isColSortable({ sort }) {
      /*       --sortable = sortable && col.sort === undefined cause there may be some columns we don't want to sort
            strict check for  === undefined is used because col.sort = null is sort order too (actualu, without sort)
            so we need to check if this property is present
    */
      return this.sortable && sort !== undefined;
    },
    selectAll() {
      if (this.selected) {
        if (this.isAllSelected) {
          this.$emit('update:selected', []);
        } else {
          this.$emit('update:selected', [...this.data]);
        }
      } else {
        // for backwards compatibility

        // https://webitel.atlassian.net/browse/WTEL-4634
        // Value for _isSelected must be assigned explicitly.
        // Because allSelected recomputes after each change

        if (this.isAllSelected) {
          this.data.forEach((item) => {
            item._isSelected = false;
          });
        } else {
          this.data.forEach((item) => {
            item._isSelected = true;
          });
        }
      }
    },
    handleSelection(row, select) {
      if (this.selected) {
        if (select) {
          this.$emit('update:selected', [...this._selected, row]);
        } else {
          this.$emit(
            'update:selected',
            this._selected.filter((item) => item !== row),
          );
        }
      } else {
        // for backwards compatibility
        row._isSelected = !row._isSelected;
      }
    },
  },
};
</script>

<style lang="scss">
@use './variables.scss';
</style>

<style lang="scss" scoped>
@use '../../css/main.scss';

.wt-table {
  @extend %wt-scrollbar;
  overflow: auto;
}

.wt-table__table {
  width: 100%;
  border-collapse: collapse;

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
  padding: var(--table-row-padding);
  transition: var(--transition);
  background: var(--wt-table-primary-color);
  grid-template-columns: repeat(auto-fit, var(--table-col-min-width));
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
</style>
