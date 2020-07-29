<template>
  <table class="wt-table">
    <thead class="wt-table__head">
    <tr class="wt-table__tr wt-table__tr__head" :style="columnsStyle">
      <th class="wt-table__th__checkbox" v-if="selectable">
        <wt-checkbox
          :selected="isAllSelected"
          @change="selectAll"
        ></wt-checkbox>
      </th>
      <th
        class="wt-table__th"
        :class="[
           {'wt-table__th--sortable': sortable},
           `wt-table__th--sort-${col.sort}`,
        ]"
        v-for="(col, key) of dataHeaders"
        :key="key"
        @click="sort(col)"
      >
        <div class="wt-table__th__text">{{col.text}}</div>
        <wt-icon
          class="wt-table__th__sort-arrow wt-table__th__sort-arrow--asc"
          v-if="sortable"
          icon="sort-arrow-up"
        ></wt-icon>
        <wt-icon
          class="wt-table__th__sort-arrow wt-table__th__sort-arrow--desc"
          v-if="sortable"
          icon="sort-arrow-down"
        ></wt-icon>
      </th>
      <th class="wt-table__th__actions">
        <slot name="actions-header"></slot>
      </th>
    </tr>
    </thead>

    <tbody class="wt-table__body">
    <tr
      class="wt-table__tr wt-table__tr__body"
      v-for="(row, dataKey) of data"
      :class="`wt-table__tr__${row.id || dataKey}`"
      :key="dataKey"
      :style="columnsStyle"
    >
      <td class="wt-table__td__checkbox" v-if="selectable">
        <wt-checkbox
          v-model="row._isSelected"
        ></wt-checkbox>
      </td>

      <td
        class="wt-table__td"
        v-for="(col, headerKey) of dataHeaders"
        :key="headerKey"
      >
        <slot :name="col.value" :item="row">
          <div>{{row[col.value]}}</div>
        </slot>
      </td>

      <td class="wt-table__td__actions" v-if="gridActions">
        <slot name="actions" :item="row" :index="dataKey"></slot>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import getNextSortOrder from './_internals/getSortOrder';

  export default {
    name: 'wt-table',
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
      gridActions: {
        type: Boolean,
        default: true,
      },
    },

    data: () => ({}),

    computed: {
      isAllSelected() {
        return this.data.every((item) => item._isSelected);
      },

      dataHeaders() {
        return this.headers
          .filter((header) => header.show === undefined || header.show);
      },

      columnsStyle() {
        let gridTemplateColumns = '';
        if (this.selectable) gridTemplateColumns += '24px'; // checkbox

        const defaultColumnWidth = ' minmax(200px, 1fr) ';
        this.dataHeaders.forEach((header) => {
          gridTemplateColumns += header.width || defaultColumnWidth;
        });

        if (this.gridActions) gridTemplateColumns += ` ${'112px'}`; // actions
        return `grid-template-columns: ${gridTemplateColumns}`;
      },
    },

    methods: {
      sort(col) {
        const nextSort = getNextSortOrder(col.sort);
        if (this.sortable) this.$emit('sort', col, nextSort);
      },

      selectAll() {
        const { isAllSelected } = this;
        // eslint-disable-next-line no-param-reassign,no-return-assign
        this.data.forEach((item) => item._isSelected = !isAllSelected);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .wt-table {
    flex: 1;
    display: block;
    border-collapse: collapse;
    overflow: auto;
    width: 100%;
  }

  .wt-table__head {
    border-bottom: var(--table-head-borer-bottom);
    border-color: var(--table-head-borer-color);
  }

  .wt-table__tr {
    display: grid;
    grid-template-columns: repeat(auto-fit, var(--table-col-min-width));
    grid-column-gap: var(--table-column-gap);
    padding: var(--table-row-padding);
    transition: var(--transition);

    &:nth-child(2n) {
      background: var(--table-secondary-color);
    }
  }

  .wt-table__th,
  .wt-table__td {
    @extend %typo-body-md;
    display: flex;
    align-items: center;
    padding: 0;
    width: 100%;
    max-width: 100%;
    overflow-wrap: break-word;

    &__actions {
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
    }
  }

  .wt-table__th {
    font-weight: normal;

    &--sortable {
      cursor: pointer;

      &:hover ::v-deep .wt-icon__icon {
        fill: var(--icon--hover-color);
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
</style>
