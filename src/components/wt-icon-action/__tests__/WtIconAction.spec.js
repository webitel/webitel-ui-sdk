import { shallowMount } from '@vue/test-utils';

import IconAction from '../../../enums/IconAction/IconAction.enum.js';
import { SortSymbols } from '../../../scripts/sortQueryAdapters.js';
import WtIconAction from '../wt-icon-action.vue';

describe('WtIconAction', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(WtIconAction, {
			props: {
				action: 'edit',
			},
		});
		expect(wrapper.isVisible()).toBe(true);
	});

	it('maps a known action to its icon', () => {
		const wrapper = shallowMount(WtIconAction, {
			props: {
				action: IconAction.DELETE,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon-btn',
				})
				.attributes('icon'),
		).toBe('bucket');
	});

	it('uses sort-asc icon by default for the sort action', () => {
		const wrapper = shallowMount(WtIconAction, {
			props: {
				action: IconAction.SORT,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon-btn',
				})
				.attributes('icon'),
		).toBe('sort-asc');
	});

	it('uses sort-desc icon for the sort action when sort:order is desc', () => {
		const wrapper = shallowMount(WtIconAction, {
			props: {
				action: IconAction.SORT,
				'sort:order': SortSymbols.DESC,
			},
		});
		expect(
			wrapper
				.findComponent({
					name: 'wt-icon-btn',
				})
				.attributes('icon'),
		).toBe('sort-desc');
	});

	it('passes disabled and size down to wt-icon-btn', () => {
		const wrapper = shallowMount(WtIconAction, {
			props: {
				action: IconAction.EDIT,
				disabled: true,
				size: 'lg',
			},
		});
		const iconBtn = wrapper.findComponent({
			name: 'wt-icon-btn',
		});
		expect(iconBtn.props('disabled')).toBe(true);
		expect(iconBtn.attributes('size')).toBe('lg');
	});

	it('emits click and mousedown from the underlying icon button', async () => {
		const wrapper = shallowMount(WtIconAction, {
			props: {
				action: IconAction.EDIT,
			},
		});
		const iconBtn = wrapper.findComponent({
			name: 'wt-icon-btn',
		});
		await iconBtn.vm.$emit('click');
		await iconBtn.vm.$emit('mousedown');

		expect(wrapper.emitted().click).toBeTruthy();
		expect(wrapper.emitted().mousedown).toBeTruthy();
	});
});
