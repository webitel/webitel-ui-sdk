import { mount, shallowMount } from '@vue/test-utils';

import WtTreeLine from '../wt-tree-line.vue';

const leaf = {
	label: 'Leaf',
};
const parent = {
	label: 'Parent',
	children: [
		{
			label: 'Child 1',
		},
		{
			label: 'Child 2',
		},
	],
};

describe('WtTreeLine', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtTreeLine, {
			props: {
				data: leaf,
				modelValue: null,
				itemLabel: 'label',
			},
		});
		expect(wrapper.find('.wt-tree-line').exists()).toBe(true);
	});

	it('renders the item label', () => {
		const wrapper = shallowMount(WtTreeLine, {
			props: {
				data: leaf,
				modelValue: null,
				itemLabel: 'label',
			},
		});
		expect(wrapper.find('.wt-tree-line__label').text()).toBe('Leaf');
	});

	it('does not render an expand toggle for a leaf node', () => {
		const wrapper = shallowMount(WtTreeLine, {
			props: {
				data: leaf,
				modelValue: null,
				itemLabel: 'label',
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

	it('renders an expand toggle for a node with children', () => {
		const wrapper = shallowMount(WtTreeLine, {
			props: {
				data: parent,
				modelValue: null,
				itemLabel: 'label',
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon-btn',
				})
				.exists(),
		).toBe(true);
	});

	it('renders a nested wt-tree-line per child', () => {
		const wrapper = mount(WtTreeLine, {
			props: {
				data: parent,
				modelValue: null,
				itemLabel: 'label',
			},
		});
		const labels = wrapper.findAll('.wt-tree-line__label').map((l) => l.text());
		expect(labels).toEqual([
			'Parent',
			'Child 1',
			'Child 2',
		]);
	});

	it('emits update:modelValue with the raw data for a leaf when clicked', async () => {
		const wrapper = shallowMount(WtTreeLine, {
			props: {
				data: leaf,
				modelValue: null,
				itemLabel: 'label',
			},
		});
		await wrapper.find('.wt-tree-line__label-wrapper').trigger('click');
		expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
			leaf,
		]);
	});

	it('emits update:modelValue with itemData value when itemData is provided', async () => {
		const keyedLeaf = {
			id: 'a',
			label: 'A',
		};
		const wrapper = shallowMount(WtTreeLine, {
			props: {
				data: keyedLeaf,
				modelValue: null,
				itemLabel: 'label',
				itemData: 'id',
			},
		});
		await wrapper.find('.wt-tree-line__label-wrapper').trigger('click');
		expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
			'a',
		]);
	});

	it('toggles collapsed state (and does not emit) when clicking a node with children, unless allowParent', async () => {
		const wrapper = shallowMount(WtTreeLine, {
			props: {
				data: parent,
				modelValue: null,
				itemLabel: 'label',
			},
		});
		await wrapper.find('.wt-tree-line__label-wrapper').trigger('click');
		expect(wrapper.emitted()['update:modelValue']).toBeFalsy();
	});

	// NOTE: `allowParent`'s early-return branch only applies to nodes without children,
	// and for those it emits the exact same value as the default (final) emit below it —
	// so toggling `allowParent` has no observable effect on a leaf's click behavior, and
	// none at all on a node with children (the collapse-toggle branch always wins first).
	// Asserting the current (seemingly no-op) behavior rather than an intended one.
	it('has no observable effect on click behavior for a leaf node', async () => {
		const wrapper = shallowMount(WtTreeLine, {
			props: {
				data: leaf,
				modelValue: null,
				itemLabel: 'label',
				allowParent: true,
			},
		});
		await wrapper.find('.wt-tree-line__label-wrapper').trigger('click');
		expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
			leaf,
		]);
	});

	it('marks the node active when it matches modelValue', () => {
		const wrapper = shallowMount(WtTreeLine, {
			props: {
				data: leaf,
				modelValue: leaf,
				itemLabel: 'label',
			},
		});
		expect(wrapper.find('.wt-tree-line__label-wrapper').classes()).toContain(
			'active',
		);
	});

	it('marks the node searched when data has the searched flag', () => {
		const searchedLeaf = {
			label: 'Leaf',
			searched: true,
		};
		const wrapper = shallowMount(WtTreeLine, {
			props: {
				data: searchedLeaf,
				modelValue: null,
				itemLabel: 'label',
			},
		});
		expect(wrapper.find('.wt-tree-line__label-wrapper').classes()).toContain(
			'searched',
		);
	});

	it('toggles multi-select values into an array in multiple mode', async () => {
		const wrapper = shallowMount(WtTreeLine, {
			props: {
				data: leaf,
				modelValue: [],
				itemLabel: 'label',
				itemData: 'label',
				multiple: true,
			},
		});
		await wrapper.find('.wt-tree-line__label-wrapper').trigger('click');
		expect(wrapper.emitted()['update:modelValue'][0]).toEqual([
			[
				'Leaf',
			],
		]);
	});
});
