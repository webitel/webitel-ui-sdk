<template>
  <article class="filters-panel-wrapper" :class="{ 'filters-panel-wrapper--opened': isOpened }">
    <div class="filters-wrap">
      <slot></slot>
    </div>
    <div class="actions-wrap">
      <wt-table-actions
        :icons="['filter-reset', 'settings']"
        @input="tableActionsHandler"
      ></wt-table-actions>
    </div>
  </article>
</template>

<script>
export default {
  name: 'filters-panel-wrapper',
  data: () => ({
    isOpened: false,
    filtersCount: 0,
  }),
  methods: {
    tableActionsHandler(eventName) {
      switch (eventName) {
        case 'filterReset':
          this.resetFilters();
          break;
        case 'settings':
          this.toggleFiltersExpansion();
          break;
        default:
      }
    },
    toggleFiltersExpansion() {
      this.isOpened = !this.isOpened;
    },
    resetFilters() {
      this.$emit('reset');
    },
  },
};
</script>

<style lang="scss" scoped>
$actions-width: calc(2 * (24px + var(--table-actions-icon-gap)));

.filters-panel-wrapper {
  display: flex;

  .filters-wrap {
    flex: 1;
  }

  .actions-wrap {
    display: flex;
    margin-left: auto;
    margin-top: 24px;
    flex: 0 0 $actions-width;

    .wt-table-actions {
      height: fit-content;
    }
  }
}

// 30px*2 outer paddings, 30px*2 inner paddings, table actions var value
// -- sass doesnt work with css variables :(
$width-except-filters: 60px + 60px + 88px;
$filter-width: 230px;
$filter-gap: 10px; // var(--spacing-xs)
@function filters-width($num) {
  // 1px corrects max width
  @return ($filter-width * $num) + $filter-gap * $num + $width-except-filters - 1px;
}

.filters-wrap {
  display: grid;
  flex-wrap: wrap;
  grid-gap: var(--spacing-xs);

  .filters-panel-wrapper & > * {
  }

  & {
    grid-template-columns: repeat(6, 1fr);

    > *:nth-child(n+7) {
      display: none;
    }
  }

  @media (max-width: filters-width(6)) {
    & {
      grid-template-columns: repeat(5, 1fr);

      > *:nth-child(n+6) {
        display: none;
      }
    }
  }

  @media (max-width: filters-width(5)) {
    & {
      grid-template-columns: repeat(4, 1fr);

      > *:nth-child(n+5) {
        display: none;
      }
    }
  }

  @media (max-width: filters-width(4)) {
    & {
      grid-template-columns: repeat(3, 1fr);

      > *:nth-child(n+4) {
        display: none;
      }
    }
  }

  @media (max-width: filters-width(3)) {
    & {
      grid-template-columns: repeat(2, 1fr);

      > *:nth-child(n+3) {
        display: none;
      }
    }
  }

  @media (max-width: filters-width(2)) {
    & {
      grid-template-columns: repeat(1, 1fr);

      > *:nth-child(n+2) {
        display: none;
      }
    }
  }
}

.filters-panel-wrapper--opened .filters-wrap > * {
  display: block;
}
</style>
