import { mount } from '@vue/test-utils';

import WtTable from '../wt-table.vue';

global.ResizeObserver = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

const headers = [
	{
		value: 'name',
		text: 'Name',
	},
	{
		value: 'age',
		text: 'Age',
	},
];

const data = [
	{
		id: 1,
		name: 'Alice',
		age: 30,
	},
	{
		id: 2,
		name: 'Bob',
		age: 25,
	},
];

describe('WtTable', () => {
	it('renders a component', () => {
		const wrapper = mount(WtTable);
		expect(
			wrapper
				.findComponent({
					name: 'DataTable',
				})
				.exists(),
		).toBe(true);
	});

	it('passes data and column headers down to the underlying table', () => {
		const wrapper = mount(WtTable, {
			props: {
				headers,
				data,
			},
		});
		const table = wrapper.findComponent({
			name: 'DataTable',
		});
		expect(table.props('value')).toEqual(data);

		const columns = wrapper.findAllComponents({
			name: 'Column',
		});
		const dataColumns = columns.filter((c) =>
			headers.some((h) => h.value === c.props('columnKey')),
		);
		expect(dataColumns.length).toBe(headers.length);
	});

	it('renders row-select column by default and can be disabled', () => {
		const withSelect = mount(WtTable, {
			props: {
				headers,
				data,
			},
		});
		expect(
			withSelect
				.findAllComponents({
					name: 'Column',
				})
				.some((c) => c.props('columnKey') === 'row-select'),
		).toBe(true);

		const withoutSelect = mount(WtTable, {
			props: {
				headers,
				data,
				selectable: false,
			},
		});
		expect(
			withoutSelect
				.findAllComponents({
					name: 'Column',
				})
				.some((c) => c.props('columnKey') === 'row-select'),
		).toBe(false);
	});

	it('renders the row-actions column when gridActions is true (default)', () => {
		const wrapper = mount(WtTable, {
			props: {
				headers,
				data,
			},
		});
		expect(
			wrapper
				.findAllComponents({
					name: 'Column',
				})
				.some((c) => c.props('columnKey') === 'row-actions'),
		).toBe(true);
	});

	it('does not render the row-actions column when gridActions is false', () => {
		const wrapper = mount(WtTable, {
			props: {
				headers,
				data,
				gridActions: false,
			},
		});
		expect(
			wrapper
				.findAllComponents({
					name: 'Column',
				})
				.some((c) => c.props('columnKey') === 'row-actions'),
		).toBe(false);
	});

	it('renders the row-filler column when resizableColumns is true', () => {
		const wrapper = mount(WtTable, {
			props: {
				headers,
				data,
				resizableColumns: true,
			},
		});
		expect(
			wrapper
				.findAllComponents({
					name: 'Column',
				})
				.some((c) => c.props('columnKey') === 'row-filler'),
		).toBe(true);
	});

	it('does not render the row-filler column when resizableColumns is false (default)', () => {
		const wrapper = mount(WtTable, {
			props: {
				headers,
				data,
			},
		});
		expect(
			wrapper
				.findAllComponents({
					name: 'Column',
				})
				.some((c) => c.props('columnKey') === 'row-filler'),
		).toBe(false);
	});

	describe('column resize', () => {
		const resizableHeaders = [
			{
				value: 'name',
				field: 'name',
				text: 'Name',
			},
			{
				value: 'age',
				field: 'age',
				text: 'Age',
			},
		];

		const mountResizable = () =>
			mount(WtTable, {
				props: {
					headers: resizableHeaders,
					data,
					resizableColumns: true,
				},
			});

		const findColumn = (wrapper, columnKey) =>
			wrapper
				.findAllComponents({
					name: 'Column',
				})
				.find((c) => c.props('columnKey') === columnKey);

		const resizeColumn = async (wrapper, columnKey, delta) => {
			const th = wrapper.find(
				`thead th[data-column-key="${columnKey}"]`,
			).element;
			wrapper
				.findComponent({
					name: 'DataTable',
				})
				.vm.$emit('column-resize-end', {
					element: th,
					delta,
				});
			await wrapper.vm.$nextTick();
		};

		it('does not set fixed widths on columns before the first resize', () => {
			const wrapper = mountResizable();
			expect(findColumn(wrapper, 'name').attributes('style')).toBeUndefined();
		});

		it('applies widths from headers before any resize (e.g. after page reload)', () => {
			const wrapper = mount(WtTable, {
				props: {
					headers: [
						{
							...resizableHeaders[0],
							width: '200px',
						},
						resizableHeaders[1],
					],
					data,
					resizableColumns: true,
				},
			});

			expect(
				wrapper.find('thead th[data-column-key="name"]').element.style.width,
			).toBe('200px');
			// column without width gets the default one
			expect(
				wrapper.find('thead th[data-column-key="age"]').element.style.width,
			).toBe('140px');
		});

		it('does not apply widths from headers when resizableColumns is false', () => {
			const wrapper = mount(WtTable, {
				props: {
					headers: [
						{
							...resizableHeaders[0],
							width: '200px',
						},
						resizableHeaders[1],
					],
					data,
				},
			});

			expect(
				wrapper.find('thead th[data-column-key="name"]').element.style.width,
			).toBe('');
		});

		it('stores resized width by column and applies it to that column', async () => {
			const wrapper = mountResizable();

			// first resize takes widths as they are rendered (0 in jsdom)
			await resizeColumn(wrapper, 'name', 0);
			// next resizes add delta to the current width
			await resizeColumn(wrapper, 'age', 80);

			expect(wrapper.emitted('column-resize').at(-1)).toEqual([
				{
					columnName: 'age',
					columnWidth: '80px',
				},
			]);
			expect(
				wrapper.find('thead th[data-column-key="age"]').element.style.width,
			).toBe('80px');
		});

		it('keeps resized width on its column when previous column is hidden', async () => {
			const wrapper = mountResizable();
			await resizeColumn(wrapper, 'name', 0);
			await resizeColumn(wrapper, 'age', 80);

			await wrapper.setProps({
				headers: [
					{
						...resizableHeaders[0],
						show: false,
					},
					resizableHeaders[1],
				],
			});

			expect(wrapper.find('thead th[data-column-key="name"]').exists()).toBe(
				false,
			);
			expect(
				wrapper.find('thead th[data-column-key="age"]').element.style.width,
			).toBe('80px');
		});
	});

	it('emits sort with the next sort order for a sortable column', async () => {
		const sortableHeaders = [
			{
				value: 'name',
				text: 'Name',
				field: 'name',
				sort: null,
			},
		];
		const wrapper = mount(WtTable, {
			props: {
				headers: sortableHeaders,
				data,
				sortable: true,
			},
		});
		const table = wrapper.findComponent({
			name: 'DataTable',
		});
		await table.vm.$emit('sort', {
			sortField: 'name',
		});

		expect(wrapper.emitted().sort).toBeTruthy();
		expect(wrapper.emitted().sort[0][0]).toEqual(sortableHeaders[0]);
	});

	it('does not emit sort for a non-sortable table', async () => {
		const wrapper = mount(WtTable, {
			props: {
				headers,
				data,
				sortable: false,
			},
		});
		const table = wrapper.findComponent({
			name: 'DataTable',
		});
		await table.vm.$emit('sort', {
			sortField: 'name',
		});

		expect(wrapper.emitted().sort).toBeFalsy();
	});

	it('resolves locale-based header text', () => {
		const wrapper = mount(WtTable, {
			props: {
				headers: [
					{
						value: 'name',
						locale: 'reusable.add',
					},
				],
				data,
			},
		});
		expect(wrapper.text()).toContain('Add');
	});

	it('hides columns with show: false', () => {
		const wrapper = mount(WtTable, {
			props: {
				headers: [
					{
						value: 'name',
						text: 'Name',
						show: false,
					},
				],
				data,
			},
		});
		const col = wrapper
			.findAllComponents({
				name: 'Column',
			})
			.find((c) => c.props('columnKey') === 'name');
		expect(col.props('hidden')).toBe(true);
	});

	it('toggles all row selections via the header checkbox when no selected prop is given', async () => {
		const rows = [
			{
				id: 1,
				name: 'Alice',
			},
			{
				id: 2,
				name: 'Bob',
			},
		];
		const wrapper = mount(WtTable, {
			props: {
				headers,
				data: rows,
			},
		});
		const headerCheckbox = wrapper.findComponent({
			name: 'wt-checkbox',
		});
		await headerCheckbox.vm.$emit('update:selected', true);

		expect(rows.every((r) => r._isSelected)).toBe(true);
	});
});
