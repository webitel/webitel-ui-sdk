import type { WtTableSortOrder } from '@webitel/ui-sdk/components/wt-table/types/WtTable';
import { sortToQueryAdapter } from '@webitel/ui-sdk/scripts';
import { SortSymbols } from '@webitel/ui-sdk/scripts/sortQueryAdapters';
import { computed, nextTick, ref } from 'vue';

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
	const headers = ref<DatalistTableHeader[]>(rawHeaders);
	const isReorderingColumn = ref(false);

	const shownHeaders = computed(() => {
		return headers.value.filter((header) => header.show);
	});

	const fields = computed(() => {
		return shownHeaders.value.map((header) => header.field);
	});

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
		headers.value = rawHeaders;
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

	const updateFields = (fields: string[]) => {
		const fieldsSet = new Set(fields);
		const mainFieldNames = new Set(headers.value.map((header) => header.field));

		const mainHeaders = headers.value.map((header: DatalistTableHeader) => ({
			...header,
			show: fieldsSet.has(header.field),
		}));

		// TODO(types): placeholders — the consuming app fills in `value`/`text`
		const customHeaders = fields
			.filter((field) => !mainFieldNames.has(field))
			.map(
				(field) =>
					({
						show: true,
						field,
						shouldBeInitialized: true,
					}) as DatalistTableHeader,
			);

		const headersByField = new Map(
			[
				...mainHeaders,
				...customHeaders,
			].map((header) => [
				header.field,
				header,
			]),
		);

		const headersInPersistedOrder = fields.flatMap((field) => {
			const header = headersByField.get(field);
			if (!header) return [];
			headersByField.delete(field);
			return [
				header,
			];
		});

		const hiddenHeaders = [
			...headersByField.values(),
		];

		updateShownHeaders([
			...headersInPersistedOrder,
			...hiddenHeaders,
		]);
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

				if (header.field === sortedHeader.field) {
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

	/*
   kept to republish state into the route query on registry re-mount,
    see syncPersistence()
   */
	let persistedStorageControllers: PersistedStorageController[] = [];

	const setupPersistence = async () => {
		const fieldsStorage = usePersistedStorage({
			name: 'fields',
			value: fields,
			storages: [
				PersistedStorageType.LocalStorage,
				PersistedStorageType.Route,
			],
			storagePath: id,
			onStore: (save, { name }) => {
				const value = fields.value.join(',');
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
			/* empty widths serialize to "{}" – not worth publishing */
			isEmptyValue: (value) => !value || value === '{}',
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

	/*
   sequentially, because every route storage write is a router.replace()
    built on top of the current route query
   */
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
