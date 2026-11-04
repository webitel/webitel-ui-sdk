import {
	type ComputedRef,
	computed,
	type MaybeRefOrGetter,
	type Ref,
	ref,
	toValue,
} from 'vue';

import type { WtTableHeader } from '../../../wt-table/types/WtTable';
import type { PrimevueTableInstance } from '../../types/PrimevueInstance';

export const DEFAULT_COLUMN_WIDTH = 140;

/*
 * [Claude] keeps resized columns widths by column, not by its position.
 * PrimeVue stores resized widths by column position (th:nth-child), so they shift to other columns
 * when some column is hidden/shown. That's why widths are stored here and applied per column instead
 * (see fixedColumnStyle), and PrimeVue's own width styles are removed after each resize.
 *
 * Requires data columns to have "data-column-key" attribute (see getColumnKey)
 */
export const useTableColumnResize = ({
	table,
	visibleHeaders,
	resizableColumns,
}: {
	table: Readonly<Ref<PrimevueTableInstance | null | undefined>>;
	visibleHeaders: ComputedRef<WtTableHeader[]>;
	resizableColumns: MaybeRefOrGetter<boolean>;
}) => {
	// [Claude] resized columns content widths (px), keyed by column key. Empty until the first resize in the session
	const columnWidths = ref<Record<string, number>>({});

	const getColumnKey = (col: WtTableHeader) => col.field || col.value;

	// [Claude] also fixed when some column was resized before (e.g. resized widths restored after page reload).
	// default widths from header definitions don't count, they are min widths only
	const isFixedColumnsLayout = computed(
		() =>
			Object.keys(columnWidths.value).length > 0 ||
			(toValue(resizableColumns) &&
				visibleHeaders.value.some((col) => col.resized)),
	);

	const fixedColumnStyle = (col: WtTableHeader) => {
		if (!isFixedColumnsLayout.value) return;

		// [Claude] column shown after the first resize has no stored width yet, so it gets its default width
		const storedWidth = columnWidths.value[getColumnKey(col)];
		const width =
			storedWidth !== undefined
				? `${storedWidth}px`
				: col.width || `${DEFAULT_COLUMN_WIDTH}px`;

		return {
			boxSizing: 'content-box',
			width,
			maxWidth: width,
		};
	};

	const getContentWidth = (element: HTMLElement) => {
		const computedStyle = getComputedStyle(element);
		const paddingLeft = Number.parseFloat(computedStyle.paddingLeft) || 0;
		const paddingRight = Number.parseFloat(computedStyle.paddingRight) || 0;

		return element.offsetWidth - paddingLeft - paddingRight;
	};

	// [Claude] current content widths of all rendered data columns, keyed by column key
	const measureColumnWidths = (tableEl: HTMLElement) => {
		const headerCells = tableEl.querySelectorAll<HTMLElement>(
			'thead th[data-column-key]',
		);
		return Object.fromEntries(
			Array.from(headerCells, (th) => [
				th.getAttribute('data-column-key'),
				getContentWidth(th),
			]),
		);
	};

	// [Claude] handles PrimeVue "column-resize-end" event, returns changed columns content widths, keyed by column key
	const handleColumnResize = ({
		element,
		delta,
	}: {
		element: HTMLElement;
		delta: number;
	}) => {
		const columnKey = element.getAttribute('data-column-key') as string;
		const tableEl = element.closest('table') as HTMLElement;
		const isFirstResize = !isFixedColumnsLayout.value;

		// [Claude] undo PrimeVue's resize styles: position-based (th:nth-child) column widths and table px width.
		// layout is back to its pre-resize state then, widths are applied by fixedColumnStyle instead
		table.value?.destroyStyleElement?.();
		tableEl.style.width = '';
		tableEl.style.minWidth = '';

		// [Claude] first resize: fix all columns at their current widths
		if (isFirstResize) {
			columnWidths.value = measureColumnWidths(tableEl);
		}

		columnWidths.value = {
			...columnWidths.value,
			[columnKey]: getContentWidth(element) + delta,
		};

		// [Claude] first resize fixes all columns, so all their widths are returned to be saved:
		// otherwise untouched columns would fall back to their default widths after page reload
		const changedKeys = isFirstResize
			? Object.keys(columnWidths.value)
			: [
					columnKey,
				];

		return Object.fromEntries(
			changedKeys.map((key) => [
				key,
				`${columnWidths.value[key]}px`,
			]),
		);
	};

	return {
		getColumnKey,
		isFixedColumnsLayout,
		fixedColumnStyle,
		handleColumnResize,
	};
};
