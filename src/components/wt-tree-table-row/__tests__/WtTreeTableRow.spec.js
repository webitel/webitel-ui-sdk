import { mount, shallowMount } from '@vue/test-utils';

import WtTreeTableRow from '../wt-tree-table-row.vue';

const dataHeaders = [
	{
		value: 'name',
		text: 'Name',
	},
	{
		value: 'age',
		text: 'Age',
	},
];

const leafRow = {
	id: 1,
	name: 'Alice',
	age: 30,
};
const parentRow = {
	id: 2,
	name: 'Bob',
	age: 40,
	children: [
		{
			id: 3,
			name: 'Charlie',
			age: 10,
		},
	],
};

describe('WtTreeTableRow', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtTreeTableRow, {
			props: {
				data: leafRow,
				rowPosition: 0,
				childrenProp: 'children',
				selectedElements: [],
				dataHeaders,
			},
		});
		expect(wrapper.find('.wt-tree-table-row').exists()).toBe(true);
	});

	it('renders a cell with the value for each header', () => {
		const wrapper = shallowMount(WtTreeTableRow, {
			props: {
				data: leafRow,
				rowPosition: 0,
				childrenProp: 'children',
				selectedElements: [],
				dataHeaders,
			},
		});
		const cells = wrapper.findAll('.wt-tree-table-td');
		expect(cells[0].text()).toContain('Alice');
		expect(cells[1].text()).toContain('30');
	});

	it('applies the alternate class on odd row positions', () => {
		const wrapper = shallowMount(WtTreeTableRow, {
			props: {
				data: leafRow,
				rowPosition: 1,
				childrenProp: 'children',
				selectedElements: [],
				dataHeaders,
			},
		});
		expect(wrapper.find('.wt-tree-table-row').classes()).toContain(
			'wt-tree-table-row--alternate',
		);
	});

	it('does not render an expand toggle for a row without children', () => {
		const wrapper = shallowMount(WtTreeTableRow, {
			props: {
				data: leafRow,
				rowPosition: 0,
				childrenProp: 'children',
				selectedElements: [],
				dataHeaders,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon-btn',
				})
				.exists(),
		).toBe(false);
	});

	it('renders an expand toggle and nested rows once expanded, for a row with children', async () => {
		const wrapper = mount(WtTreeTableRow, {
			props: {
				data: parentRow,
				rowPosition: 0,
				childrenProp: 'children',
				selectedElements: [],
				dataHeaders,
			},
		});
		const toggle = wrapper.findComponent({
			name: 'wt-icon-btn',
		});
		expect(toggle.exists()).toBe(true);
		expect(wrapper.findAll('tr').length).toBe(1);

		await toggle.trigger('click');

		expect(wrapper.findAll('tr').length).toBe(2);
		expect(wrapper.findAll('tr')[1].text()).toContain('Charlie');
	});

	it('does not render a selection checkbox unless selectable', () => {
		const wrapper = shallowMount(WtTreeTableRow, {
			props: {
				data: leafRow,
				rowPosition: 0,
				childrenProp: 'children',
				selectedElements: [],
				dataHeaders,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-checkbox',
				})
				.exists(),
		).toBe(false);
	});

	it('emits update:selected with the row data when the checkbox is toggled', async () => {
		const wrapper = shallowMount(WtTreeTableRow, {
			props: {
				data: leafRow,
				rowPosition: 0,
				childrenProp: 'children',
				selectedElements: [],
				dataHeaders,
				selectable: true,
			},
		});
		await wrapper
			.findComponent({
				name: 'wt-checkbox',
			})
			.vm.$emit('update:selected', true);

		expect(wrapper.emitted()['update:selected'][0]).toEqual([
			{
				data: leafRow,
				select: true,
			},
		]);
	});

	it('does not render an actions cell when gridActions is false', () => {
		const wrapper = shallowMount(WtTreeTableRow, {
			props: {
				data: leafRow,
				rowPosition: 0,
				childrenProp: 'children',
				selectedElements: [],
				dataHeaders,
				gridActions: false,
			},
		});
		expect(wrapper.find('.wt-tree-table-td__actions').exists()).toBe(false);
	});
});
