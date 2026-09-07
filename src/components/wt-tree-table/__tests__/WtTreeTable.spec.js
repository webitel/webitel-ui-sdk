import { mount, shallowMount } from '@vue/test-utils';

import WtTreeTable from '../wt-tree-table.vue';

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

describe('WtTreeTable', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtTreeTable, {
			props: {
				headers,
				data,
				childrenProp: 'children',
				selected: [],
			},
		});
		expect(wrapper.classes()).toContain('wt-tree-table');
	});

	it('renders a header cell per header, an actions header, and a row per data item', () => {
		const wrapper = shallowMount(WtTreeTable, {
			props: {
				headers,
				data,
				childrenProp: 'children',
				selected: [],
			},
		});
		expect(wrapper.findAll('.wt-tree-table-th').length).toBe(headers.length);
		expect(wrapper.find('.wt-tree-table-th__actions').exists()).toBe(true);
		expect(
			wrapper.findAllComponents({
				name: 'wt-tree-table-row',
			}).length,
		).toBe(data.length);
	});

	it('does not render the actions header when gridActions is false', () => {
		const wrapper = shallowMount(WtTreeTable, {
			props: {
				headers,
				data,
				childrenProp: 'children',
				selected: [],
				gridActions: false,
			},
		});
		expect(wrapper.find('.wt-tree-table-th__actions').exists()).toBe(false);
	});

	it('renders a select-all checkbox on the first header when selectable', () => {
		const wrapper = shallowMount(WtTreeTable, {
			props: {
				headers,
				data,
				childrenProp: 'children',
				selected: [],
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-checkbox',
				})
				.exists(),
		).toBe(true);
	});

	it('emits sort with the next sort order for a sortable column', async () => {
		const sortableHeaders = [
			{
				value: 'name',
				text: 'Name',
				sort: null,
			},
		];
		const wrapper = mount(WtTreeTable, {
			props: {
				headers: sortableHeaders,
				data,
				childrenProp: 'children',
				selected: [],
				sortable: true,
			},
		});
		await wrapper.find('.wt-tree-table-th').trigger('click');
		expect(wrapper.emitted().sort).toBeTruthy();
	});

	it('emits update:selected when a row toggles selection, given an explicit selected prop', async () => {
		const wrapper = shallowMount(WtTreeTable, {
			props: {
				headers,
				data,
				childrenProp: 'children',
				selected: [],
			},
		});
		const row = wrapper.findComponent({
			name: 'wt-tree-table-row',
		});
		await row.vm.$emit('update:selected', {
			data: data[0],
			select: true,
		});

		expect(wrapper.emitted()['update:selected'][0]).toEqual([
			[
				data[0],
			],
		]);
	});

	it('emits update:selected with all nested elements when select-all is toggled on', async () => {
		const wrapper = shallowMount(WtTreeTable, {
			props: {
				headers,
				data,
				childrenProp: 'children',
				selected: [],
			},
		});
		await wrapper
			.findComponent({
				name: 'wt-checkbox',
			})
			.vm.$emit('update:selected', true);

		expect(wrapper.emitted()['update:selected'][0]).toEqual([
			data,
		]);
	});
});
