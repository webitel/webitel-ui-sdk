import type { WtTableSortOrder } from '@webitel/ui-sdk/components/wt-table/types/WtTable';
import { sortToQueryAdapter } from '@webitel/ui-sdk/scripts';
import { SortSymbols } from '@webitel/ui-sdk/scripts/sortQueryAdapters';
import { computed, nextTick, ref, unref } from 'vue';

import { createDatalistStore } from '../_shared/createDatalistStore';
import {
	type PersistedStorageController,
	PersistedStorageType,
} from '../persist/PersistedStorage.types';
import { usePersistedStorage } from '../persist/usePersistedStorage';
import type { Identifiable } from '../types/createDatalistStore.types';
import type {
	DatalistTableHeader,
	useTableStoreConfig,
} from '../types/tableStore.types';

interface TableHeadersStoreBodyParams {
	rawHeaders: DatalistTableHeader[];
	id: string;
}

export const tableHeadersStoreBody = ({
	rawHeaders,
	id,
}: TableHeadersStoreBodyParams) => {
	const isAllowed = (header: DatalistTableHeader) =>
		!header.access || !!unref(header.access());

	const allowedHeaders = rawHeaders.filter(isAllowed);

	/* headers may share a `field`, so it stays allowed while any of them is */
	const allowedFields = new Set(allowedHeaders.map((header) => header.field));
	const deniedFields = new Set(
		rawHeaders
			.filter((header) => !isAllowed(header))
			.map((header) => header.field)
			.filter((field) => !allowedFields.has(field)),
	);

	const headers = ref<DatalistTableHeader[]>(allowedHeaders);
	const isReorderingColumn = ref(false);

	const shownHeaders = computed(() => {
		return headers.value.filter((header) => header.show);
	});

	/* several columns may render from one api field, ask for it once */
	const fields = computed(() => {
		return [
			...new Set(shownHeaders.value.map((header) => header.field)),
		];
	});

	/*
   what gets persisted: one entry per shown column, in the order they sit in.
   `fields` deduplicates, so a table with a derived column (a duration next to
   the timestamp it is computed from) could not say how many columns a field
   feeds, nor where each of them sat
   ([WTEL-10307](https://webitel.atlassian.net/browse/WTEL-10307))
   */
	const persistedColumns = computed(() =>
		shownHeaders.value.map((header) => header.field),
	);

	/* `value` is the column's own key – its slot name; `field` is the api one */
	const columnKey = (header: DatalistTableHeader) =>
		header.value ?? header.field;

	const sort = computed(() => {
		const encodeSortQuery = ({
			column,
			order,
		}: {
			column: DatalistTableHeader;
			order: DatalistTableHeader['sort'];
		}) => `${sortToQueryAdapter(order)}${column.field}`;

		const sortedCol = headers.value.find((header) => header.sort);

		return sortedCol
			? encodeSortQuery({
					column: sortedCol,
					order: sortedCol.sort,
				})
			: null;
	});

	const columnWidths = computed(() => {
		return headers.value.reduce<Record<string, string>>((acc, header) => {
			if (header.width) {
				acc[header.field] = header.width;
			}
			return acc;
		}, {});
	});

	const $reset = () => {
		headers.value = allowedHeaders;
	};

	const updateShownHeaders = (value: DatalistTableHeader[]) => {
		headers.value = value;
	};

	const setHeaderOrder = (orderedFields: string[]) => {
		const arrayFieldOrder = new Map<string, number[]>();
		headers.value.forEach((header, idx) => {
			if (!arrayFieldOrder.has(header.field)) {
				arrayFieldOrder.set(header.field, []);
			}
			const list = arrayFieldOrder.get(header.field);
			if (list) {
				list.push(idx);
			}
		});

		const newOrder: number[] = [];
		for (const field of orderedFields) {
			const indices = arrayFieldOrder.get(field);
			const next = indices?.shift();
			if (next !== undefined) {
				newOrder.push(next);
			}
		}

		const newOrderFiltered = newOrder
			.map((idx) => headers.value[idx])
			.filter((header) => header);

		/**
		 * @author @Oleksandr Palonnyi
		 *
		 * [WTEL-8038](https://webitel.atlassian.net/browse/WTEL-8038)
		 *
		 * Additionally, we append the `show: true` property to each item
		 * to ensure that all newly processed elements are visible by default.
		 * */
		return newOrderFiltered.map((item) => {
			return {
				...item,
				show: true,
			};
		});
	};

	const updateFields = (persistedFields: string[]) => {
		/* persisted state predates the gate, and unknown fields are revived below;
		   an empty field is a leftover of a header persisted before it got a `field` */
		const fields = persistedFields.filter(
			(field) => field && !deniedFields.has(field),
		);

		const declared = headers.value;
		const declaredIndex = new Map(
			declared.map((header, index) => [
				header,
				index,
			]),
		);

		/* several columns may render from one field, and the list names that field
		   once per column – hand them out in declared order */
		const queues = new Map<string, DatalistTableHeader[]>();
		for (const header of declared) {
			const queue = queues.get(header.field) ?? [];
			queue.push(header);
			queues.set(header.field, queue);
		}

		const placed: DatalistTableHeader[] = [];
		const revived = new Set<string>();

		for (const field of fields) {
			const queue = queues.get(field);

			if (queue) {
				const next = queue.shift();
				if (next) placed.push(next);
				continue;
			}

			if (revived.has(field)) continue;
			revived.add(field);
			// TODO(types): placeholders — the consuming app fills in `value`/`text`
			placed.push({
				show: true,
				field,
				shouldBeInitialized: true,
			} as DatalistTableHeader);
		}

		/*
     a list written before a column existed – or by the format that named each
     field once – cannot place it. Slot it back between its declared
     neighbours rather than dumping it at the end, so the column order the app
     declares survives a restore it was never written into
     */
		const placedHeaders = new Set(placed);
		const unplaced = declared.filter((header) => !placedHeaders.has(header));

		const order: DatalistTableHeader[] = [];
		let nextUnplaced = 0;
		const flushUnplacedBefore = (index: number) => {
			while (
				nextUnplaced < unplaced.length &&
				(declaredIndex.get(unplaced[nextUnplaced]) as number) < index
			) {
				order.push(unplaced[nextUnplaced]);
				nextUnplaced += 1;
			}
		};

		for (const header of placed) {
			const index = declaredIndex.get(header);
			if (index !== undefined) flushUnplacedBefore(index);
			order.push(header);
		}
		order.push(...unplaced.slice(nextUnplaced));

		const shownFields = new Set(fields);

		updateShownHeaders(
			order.map((header) =>
				header.shouldBeInitialized
					? header
					: {
							...header,
							show: shownFields.has(header.field),
						},
			),
		);
	};

	const updateSort = (
		column: DatalistTableHeader,
		options:
			| {
					order?: WtTableSortOrder;
			  }
			| WtTableSortOrder = {},
	) => {
		const getNextSortOrder = (sort: DatalistTableHeader['sort']) => {
			switch (sort) {
				case SortSymbols.NONE:
					return SortSymbols.ASC;
				case SortSymbols.ASC:
					return SortSymbols.DESC;
				case SortSymbols.DESC:
					return SortSymbols.NONE;
				default:
					return SortSymbols.ASC;
			}
		};

		const changeHeadersSort = ({
			headers,
			sortedHeader,
			order,
		}: {
			headers: DatalistTableHeader[];
			sortedHeader: DatalistTableHeader;
			order: WtTableSortOrder;
		}) => {
			return headers.map((header) => {
				if (header.sort === undefined) return header;

				// reset all headers by default
				let newSort: WtTableSortOrder = null;

				/* by the column, not the field: a derived column shares the field it
				   is computed from, and only the clicked one is sorted */
				if (columnKey(header) === columnKey(sortedHeader)) {
					newSort = order;
				}

				return {
					...header,
					sort: newSort,
				};
			});
		};

		let order: WtTableSortOrder;

		if (typeof options === 'string') {
			order = options;
		} else if (options?.order !== undefined) {
			order = options.order;
		} else {
			order = getNextSortOrder(column.sort);
		}

		headers.value = changeHeadersSort({
			headers: headers.value,
			sortedHeader: column,
			order,
		});
	};

	let persistedStorageControllers: PersistedStorageController[] = [];

	const setupPersistence = async () => {
		const fieldsStorage = usePersistedStorage({
			name: 'fields',
			value: persistedColumns,
			/* order is the restore priority: a shared link wins over local columns */
			storages: [
				PersistedStorageType.Route,
				PersistedStorageType.LocalStorage,
			],
			storagePath: id,
			onStore: (save, { name }) => {
				const value = persistedColumns.value.join(',');
				return save({
					name,
					value,
				});
			},
			onRestore: async (restore, name) => {
				const value = (await restore(name)) as string;
				if (value) {
					return updateFields(value.split(','));
				}
			},
		});

		const sortStorage = usePersistedStorage({
			name: 'sort',
			value: sort,
		});

		const columnWidthsStorage = usePersistedStorage({
			name: 'columnWidths',
			value: columnWidths,
			storages: [
				PersistedStorageType.LocalStorage,
			],
			storagePath: id,
			onStore: (save, { name }) => {
				const value = JSON.stringify(columnWidths.value);
				return save({
					name,
					value,
				});
			},
			onRestore: async (restore, name) => {
				const value = (await restore(name)) as string;
				if (value) {
					const parsedWidths = JSON.parse(value);
					headers.value = headers.value.map((header) => ({
						...header,
						width: parsedWidths[header.field] || header.width,
					}));
				}
			},
		});

		persistedStorageControllers = [
			fieldsStorage,
			sortStorage,
			columnWidthsStorage,
		];

		return Promise.allSettled([
			fieldsStorage.restore(),
			sortStorage.restore(),
			columnWidthsStorage.restore(),
		]);
	};

	/* sequentially: every route write is a router.replace() on top of the current query */
	const syncPersistence = async () => {
		for (const controller of persistedStorageControllers) {
			await controller.sync();
		}
	};

	const getHeaderByField = (field: string) => {
		return headers.value.find((header) => header.field === field);
	};

	const columnResize = ({
		columnName,
		columnWidth,
	}: {
		columnName: string;
		columnWidth: string;
	}) => {
		const column = getHeaderByField(columnName);

		if (column) {
			column.width = columnWidth;
		}
	};

	const columnReorder = (orderedFields: string[]) => {
		isReorderingColumn.value = true;

		const reordered = setHeaderOrder(orderedFields);
		const uniqueHeaders = headers.value.filter(
			(merged) => !reordered.some((r) => r.field === merged.field),
		);
		updateShownHeaders([
			...reordered,
			...uniqueHeaders,
		]);

		nextTick(() => {
			isReorderingColumn.value = false;
		});
	};

	return {
		headers,
		shownHeaders,
		fields,
		sort,
		columnWidths,
		isReorderingColumn,

		updateShownHeaders,
		updateSort,
		columnResize,
		columnReorder,

		setupPersistence,
		syncPersistence,
		$reset,
	};
};

export const createTableHeadersStore = <Entity extends Identifiable>(
	namespace: string,
	config: useTableStoreConfig<Entity>,
	{
		headers: rawHeaders,
	}: {
		headers: DatalistTableHeader[];
	},
) => {
	const id = `${namespace}/headers`;
	return createDatalistStore({
		storeBody: () =>
			tableHeadersStoreBody({
				rawHeaders,
				id,
			}),
		namespace: id,
		config,
	});
};
