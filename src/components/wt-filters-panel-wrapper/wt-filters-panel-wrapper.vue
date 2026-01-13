<template>
  <article :class="{ 'filters-panel-wrapper--opened': isOpened }" class="filters-panel-wrapper">
    <div class="filters-wrap">
      <slot />
    </div>
    <div class="actions-wrap">
      <wt-table-actions :icons="tableActionIcons" @input="tableActionsHandler" />
    </div>
  </article>
</template>

<script>
export default {
	name: 'FiltersPanelWrapper',
	props: {
		tableActionIcons: {
			type: Array,
			default: () => [
				'filter-reset',
				'settings',
			],
		},
		isOpened: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			localIsOpened: this.isOpened,
			filtersCount: 0,
		};
	},
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
			this.localIsOpened = !this.localIsOpened;
		},
		resetFilters() {
			this.$emit('reset');
		},
	},
};
</script>

<style scoped>
.filters-panel-wrapper {
  --actions-width: calc(var(--icon-md-size) + var(--table-actions-icon-gap));
  display: flex;
}

.filters-panel-wrapper .filters-wrap {
  flex: 1;
}

.filters-panel-wrapper .actions-wrap {
  display: flex;
  flex: 0 0 var(--actions-width);
  margin-top: 24px;
  margin-left: auto;
}

.filters-panel-wrapper .actions-wrap .wt-table-actions {
  height: fit-content;
}

/* 30px*2 outer paddings, 30px*2 inner paddings, table actions var value */
/* Calculated breakpoints: filters-width = (230px * num) + (10px * num) + 208px - 1px */
.filters-wrap {
  display: grid;
  flex-wrap: wrap;
  grid-gap: var(--spacing-xs);
  grid-template-columns: repeat(6, 1fr);
}

.filters-wrap>*:nth-child(n + 7) {
  display: none;
}

/* filters-width(6) = 1647px */
@media (max-width: 1647px) {
  .filters-wrap {
    grid-template-columns: repeat(5, 1fr);
  }

  .filters-wrap :deep(> *:nth-child(n + 6)) {
    display: none;
  }
}

/* filters-width(5) = 1407px */
@media (max-width: 1407px) {
  .filters-wrap {
    grid-template-columns: repeat(4, 1fr);
  }

  .filters-wrap :deep(> *:nth-child(n + 5)) {
    display: none;
  }
}

/* filters-width(4) = 1167px */
@media (max-width: 1167px) {
  .filters-wrap {
    grid-template-columns: repeat(3, 1fr);
  }

  .filters-wrap :deep(> *:nth-child(n + 4)) {
    display: none;
  }
}

/* filters-width(3) = 927px */
@media (max-width: 927px) {
  .filters-wrap {
    grid-template-columns: repeat(2, 1fr);
  }

  .filters-wrap :deep(> *:nth-child(n + 3)) {
    display: none;
  }
}

/* filters-width(2) = 687px */
@media (max-width: 687px) {
  .filters-wrap {
    grid-template-columns: repeat(1, 1fr);
  }

  .filters-wrap :deep(> *:nth-child(n + 2)) {
    display: none;
  }
}

.filters-panel-wrapper--opened .filters-wrap :deep(> *) {
  display: block;
}
</style>
