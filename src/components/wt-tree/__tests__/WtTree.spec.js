import { shallowMount } from '@vue/test-utils';

import { WtTreeMode } from '../types/WtTreeMode';
import WtTree from '../wt-tree.vue';

const data = [
	{
		label: 'Parent 1',
		children: [
			{
				label: 'Child 1.1',
			},
			{
				label: 'Child 1.2',
			},
		],
	},
	{
		label: 'Parent 2',
	},
];

describe('WtTree', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtTree, {
			props: {
				data: [],
			},
		});
		expect(wrapper.classes('wt-tree')).toBe(true);
	});

	it('renders a wt-tree-line per top-level item in tree mode by default', () => {
		const wrapper = shallowMount(WtTree, {
			props: {
				data,
			},
		});
		expect(
			wrapper.findAllComponents({
				name: 'wt-tree-line',
			}).length,
		).toBe(data.length);
		expect(wrapper.find('.wt-tree__list-content').exists()).toBe(false);
	});

	it('forwards update:modelValue from a tree-line up', async () => {
		const wrapper = shallowMount(WtTree, {
			props: {
				data,
			},
		});
		await wrapper
			.findComponent({
				name: 'wt-tree-line',
			})
			.vm.$emit('update:modelValue', data[0]);
		expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
			data[0],
		]);
	});

	it('renders a flattened list of all nested items in list mode', () => {
		const wrapper = shallowMount(WtTree, {
			props: {
				data,
				mode: WtTreeMode.List,
				itemLabel: 'label',
			},
		});
		const labels = wrapper.findAll('.wt-tree__label');
		expect(labels.length).toBe(4);
		expect(labels.map((l) => l.text())).toEqual([
			'Parent 1',
			'Child 1.1',
			'Child 1.2',
			'Parent 2',
		]);
	});

	it('emits update:modelValue when a list item is clicked', async () => {
		const wrapper = shallowMount(WtTree, {
			props: {
				data,
				mode: WtTreeMode.List,
				itemLabel: 'label',
			},
		});
		await wrapper.findAll('.wt-tree__label')[1].trigger('click');
		expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
			data[0].children[0],
		]);
	});

	it('marks the selected list item as active', () => {
		const wrapper = shallowMount(WtTree, {
			props: {
				data,
				mode: WtTreeMode.List,
				itemLabel: 'label',
				modelValue: data[1],
			},
		});
		const wrappers = wrapper.findAll('.wt-tree__label-wrapper');
		expect(wrappers.at(-1).classes()).toContain('active');
		expect(wrappers[0].classes()).not.toContain('active');
	});

	it('uses itemData to compare/select values when provided', async () => {
		const keyedData = [
			{
				id: 'a',
				label: 'A',
			},
			{
				id: 'b',
				label: 'B',
			},
		];
		const wrapper = shallowMount(WtTree, {
			props: {
				data: keyedData,
				mode: WtTreeMode.List,
				itemLabel: 'label',
				itemData: 'id',
				modelValue: 'b',
			},
		});
		expect(
			wrapper.findAll('.wt-tree__label-wrapper').at(-1).classes(),
		).toContain('active');

		await wrapper.findAll('.wt-tree__label')[0].trigger('click');
		expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
			'a',
		]);
	});
});
