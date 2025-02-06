import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { sortToQueryAdapter } from "../../../../scripts";
import { SortSymbols } from "../../../../scripts/sortQueryAdapters";
import { usePersistedStorage } from "../persist/usePersistedStorage.ts";

export const createTableHeadersStore = (
	namespace: string,
	{ headers: rawHeaders },
) => {
	const id = `${namespace}/headers`;

	return defineStore(id, () => {
		const headers = ref(rawHeaders);

		const shownHeaders = computed(() => {
			return headers.value.filter((header) => header.show);
		});

		const fields = computed(() => {
			return shownHeaders.value.map((header) => header.field);
		});

		const sort = computed(() => {
			const encodeSortQuery = ({ column, order }) =>
				`${sortToQueryAdapter(order)}${column.field}`;

			const sortedCol = headers.value.find((header) => header.sort);

			return sortedCol
				? encodeSortQuery({ column: sortedCol, order: sortedCol.sort })
				: null;
		});

		const $reset = () => {
			headers.value = rawHeaders;
		};

		const setupPersistence = async () => {
			const { restore: restoreHeaders } = usePersistedStorage({
				name: "headers",
				value: headers,
			});

			const { restore: restoreShownHeaders } = usePersistedStorage({
				name: "shownHeaders",
				value: shownHeaders,
			});

			const { restore: restoreFields } = usePersistedStorage({
				name: "fields",
				value: fields,
			});

			const { restore: restoreSort } = usePersistedStorage({
				name: "sort",
				value: sort,
			});

			return Promise.allSettled([
				restoreHeaders(),
				restoreShownHeaders(),
				restoreFields(),
				restoreSort(),
			]);
		};

		const updateShownHeaders = (value) => {
			headers.value = value;
		};

		const updateSort = (column) => {
			const getNextSortOrder = (sort) => {
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

			const changeHeadersSort = ({ headers, sortedHeader, order }) => {
				return headers.map((header) => {
					if (header.sort === undefined) return header;

					// reset all headers by default
					let newSort = null;

					if (header.field === sortedHeader.field) {
						newSort = order;
					}

					return {
						...header,
						sort: newSort,
					};
				});
			};

			const order = getNextSortOrder(column.sort);

			const newHeaders = changeHeadersSort({
				headers: headers.value,
				sortedHeader: column,
				order,
			});

			headers.value = newHeaders;
		};

		return {
			headers,
			shownHeaders,
			fields,
			sort,

			updateShownHeaders,
			updateSort,

			setupPersistence,
			$reset,
		};
	});
};
