<template>
  <section class="wt-editable-list">
    <header class="table-title wt-editable-list__header">
      <slot name="title" />
      <wt-action-bar
        :include="[IconAction.ADD]"
        :disabled:add="disabled"
        class="wt-editable-list__actions"
        @click:add="addRow"
      />
    </header>

    <wt-empty
      v-show="showEmpty"
      :image="imageEmpty"
      :text="textEmpty"
    />

    <wt-table
      v-show="rows.length"
      :data="shownRows"
      :headers="tableHeaders"
      :grid-actions="!disabled"
      :selectable="false"
      :sortable="sortable"
      @sort="sort"
    >
      <template
        v-for="name in cellSlotNames"
        :key="name"
        #[name]="scope"
      >
        <slot
          :name="name"
          v-bind="{ ...scope, index: rows.indexOf(scope.item) }"
        />
      </template>
      <template #actions="{ item }">
        <wt-icon-action
          :disabled="disabled"
          action="delete"
          @click="deleteRow(rows.indexOf(item))"
        />
      </template>
    </wt-table>
  </section>
</template>

<script setup lang="ts" generic="Row">
/**
 * [Claude] An editable list of rows kept in the card's model (variables,
 * time ranges, pause causes...): an add button, an empty state while there are
 * no rows, and a table whose cells the consumer fills through slots named
 * after the headers' `value`. A cell slot edits its `item` in place; adding
 * and deleting give `v-model` a new array. Validation stays with the
 * consumer's fields.
 *
 * [Claude] `sortable` sorts the shown rows by a header click, by the header's `sortBy`;
 * the model keeps the order the rows were added in.
 */
import { orderBy } from 'lodash-es';
import { computed, ref, useSlots } from 'vue';

import { IconAction } from '../../enums';
import { useTableEmpty } from '../../modules/TableComponentModule/composables/useTableEmpty';
import type { SortOrder } from '../../scripts/sortQueryAdapters';

const rows = defineModel<Row[]>({
	default: () => [],
});

const props = defineProps<{
	headers: {
		value: string;
		text?: string;
		width?: string;
		sortBy?: (row: Row) => unknown;
	}[];
	/** [Claude] builds the row the add button appends */
	createRow: () => Row;
	disabled?: boolean;
	sortable?: boolean;
}>();

const emit = defineEmits<{
	add: [
		row: Row,
	];
	delete: [
		row: Row,
		index: number,
	];
}>();

const slots = useSlots();

/** [Claude] every slot but the title and the row actions is a cell of the table */
const cellSlotNames = computed(() =>
	Object.keys(slots).filter((name) => name !== 'title' && name !== 'actions'),
);

const sortField = ref<string>();
const sortOrder = ref<SortOrder>(null);

const tableHeaders = computed(() =>
	props.headers.map(({ sortBy, ...header }) =>
		props.sortable && sortBy
			? {
					...header,
					field: header.value,
					sort: header.value === sortField.value ? sortOrder.value : null,
				}
			: header,
	),
);

const shownRows = computed(() => {
	const sortBy = props.headers.find(
		(header) => header.value === sortField.value,
	)?.sortBy;
	if (!props.sortable || !sortBy || !sortOrder.value) return rows.value;
	return orderBy(
		rows.value,
		[
			sortBy,
		],
		[
			sortOrder.value,
		],
	);
});

const sort = (
	header: {
		field: string;
	},
	order: SortOrder,
) => {
	sortField.value = header.field;
	sortOrder.value = order;
};

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
} = useTableEmpty({
	dataList: rows,
});

// [Claude] a new array each time, so `v-model` also works on a model that has no rows yet
const addRow = () => {
	const row = props.createRow();
	rows.value = [
		...rows.value,
		row,
	];
	emit('add', row);
};

const deleteRow = (index: number) => {
	const row = rows.value[index];
	rows.value = rows.value.filter((_, rowIndex) => rowIndex !== index);
	emit('delete', row, index);
};
</script>

<style scoped>
/* [Claude] fills the card tab, so the empty state's `margin: auto` centers it in the free space */
.wt-editable-list {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 0;
}

/* [Claude] with no title the add button is the header's only child, so it is pushed to the right */
.wt-editable-list__actions {
  margin-left: auto;
}
</style>
