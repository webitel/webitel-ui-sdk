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
import getNextSortOrder from './_internals/getSortOrder';

export default {
  name: 'WtTable',
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    sortable: {
      type: Boolean,
      default: false,
    },
    selectable: {
      type: Boolean,
      default: true,
    },
    selected: {
      type: Array,
      // no default! because we need to know if it's passed or not
    },
    gridActions: {
      type: Boolean,
      default: true,
    },
  },
  emits: [
    'sort',
    'update:selected',
  ],

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
            text: typeof header.locale === 'string' ? this.$t(header.locale) : this.$t(...header.locale),
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
      return Object.keys(this.$slots).some((slotName) => slotName.includes('-footer'));
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
        this.data.forEach((item) => {
          item._isSelected = !this.isAllSelected;
        });
      }
    },
    handleSelection(row, select) {
      if (this.selected) {
        if (select) {
          this.$emit('update:selected', [...this._selected, row]);
        } else {
          this.$emit('update:selected', this._selected.filter((item) => item !== row));
        }
      } else {
        // for backwards compatibility
        row._isSelected = !row._isSelected;
      }
    }
  },

};
</script>

<style lang="scss">
@import './variables.scss';
</style>

<style lang="scss" scoped>

.wt-table {
  @extend %wt-scrollbar;
  overflow: auto;
}

.wt-table__table {
  width: 100%;
  border-collapse: collapse;
}

.wt-table__tr {
  display: grid;
  padding: var(--table-row-padding);
  transition: var(--transition);
  grid-template-columns: repeat(auto-fit, var(--table-col-min-width));
  grid-column-gap: var(--table-column-gap);
  background: var(--wt-table-primary-color);

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
